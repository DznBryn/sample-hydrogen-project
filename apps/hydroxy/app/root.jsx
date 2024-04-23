import {
  getCMSContent,
  getCustomerData,
  getMainNavFooterCMSData,
  pushQueryParam,
} from './utils/functions/eventFunctions';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from '@remix-run/react';
import {
  GET_ANNOUNCEMENT_TOP_BANNER,
  GET_CART_PAGE_CONFIG,
  GET_EMAIL_SMS_SIGNUP_CONTENT,
  GET_FOOTERS,
  GET_LISTRAK_REC,
  GET_MOBILE_NAV_FOOTER_MAIN_BUTTON,
  GET_PRODUCTS,
  GET_REDIRECTS,
  GET_SEARCH_CONFIG,
} from './utils/graphql/sanity/queries';
import ErrorContent, {
  links as errorBoundaryStyles,
} from './boundaries/errorContent';
import CatchContent, {
  links as catchBoundaryStyles,
} from './boundaries/catchContent';
import {useRouteError, isRouteErrorResponse} from '@remix-run/react';
import getApiKeys from './utils/functions/getApiKeys';
import {defer, redirect} from '@remix-run/server-runtime';
import {links as layoutsStyles} from '~/layouts';
import favicon from '../public/favicon.ico';
import {useStore} from './hooks/useStore';
import PageMeta from './modules/pageMeta';
import {useEffect, useRef} from 'react';
import {usePageAnalytics} from './hooks/usePageAnalytics';
import {getCart} from './utils/graphql/shopify/queries/cart';

import styles from './styles/app.css';
import {
  parseGid,
  AnalyticsEventName,
  getClientBrowserParameters,
  sendShopifyAnalytics,
  useShopifyCookies,
} from '@shopify/hydrogen';
import {
  getCustomerAddresses,
  getCustomerOrders,
  getCustomerSubscription,
  getItems,
  getSubscriptionPayments,
} from './utils/services/subscription';

export const links = () => {
  return [
    {
      rel: 'stylesheet',
      href: `https://staticw2.yotpo.com/${
        getApiKeys().YOTPO_KEY
      }/widget.css?widget_version=2022-10-06_07-58-33`,
      media: 'screen',
    },
    {rel: 'stylesheet', href: styles},
    {rel: 'preconnect', href: 'https://shop.app'},
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
    {rel: 'preconnect', href: 'https://cdn.shopify.com'},
    ...layoutsStyles().mainNavFooterStyles,
    ...errorBoundaryStyles(),
    ...catchBoundaryStyles(),
  ];
};

const CMSDataCache = {};
const customerCache = {accessToken: undefined, data: undefined};

export async function loader({context, request}) {
  const referer = request.headers.get('referer');
  const headers = new Headers();
  const url = new URL(request.url);

  togglePreviewMode(context, url, referer);

  /**
   * REDIRECT
   */

  if (!referer) {
    const {destination, statusCode} = await checkRedirect(context, request);
    if (destination && statusCode) return redirect(destination, statusCode);
  }

  /**
   * CMS DATA
   */
  await requestCMSData(context, CMSDataCache);

  /**
   * SHOPIFY DATA
   */

  const [cartId, curCustomerAccessToken] = await Promise.all([
    context.session.get('cartId'),
    context.session.get('customerAccessToken'),
  ]);

  const cart = cartId ? await getCart(context, cartId) : {};

  if (
    customerCache.accessToken !== curCustomerAccessToken ||
    customerCache.data === undefined
  ) {
    customerCache.data = await getCustomerData(
      context,
      curCustomerAccessToken,
      request,
    );
    customerCache.accessToken = curCustomerAccessToken;
  }

  headers.set('Set-Cookie', await context.session.commit());

  return defer(
    {
      request,
      cart,
      customer: customerCache.data,
      showSliderCart: checkShowSliderCart(request),
      previewMode: context.session.get('previewMode') === 'true',
      footers: CMSDataCache.footers,
      listrakRec: CMSDataCache.listrakRec,
      searchConfig: CMSDataCache.searchConfig,
      productsCMSData: CMSDataCache.productsCMS,
      cartPageConfig: CMSDataCache.cartPageConfig,
      mainNavFooterCMSData: CMSDataCache.mainNavFooterCMSData,
      announcementTopBanner: CMSDataCache.announcementTopBanner,
      emailSmsSignupContent: CMSDataCache.emailSmsSignupContent,
      mobileNavFooterMainButton: CMSDataCache.mobileNavFooterMainButton,
      analytics: {shopId: 'gid://shopify/Shop/17369637'},
    },
    {
      status: 200,
      headers,
    },
  );
}

export default function App() {
  // IMPORTANT: It’s up to you to ensure you have tracking consent
  // before updating this value to true.
  const hasUserConsent = false;
  useShopifyCookies({hasUserConsent});
  // The user's current location
  const location = useLocation();
  // The user's last location. Blank to start.
  const lastLocationKey = useRef('');
  // Analytics data returned by the custom hook
  const pageAnalytics = usePageAnalytics({hasUserConsent});

  // console.log('devdrew hasUserConsent:', hasUserConsent);
  // console.log('devdrew location:', location);
  // console.log('devdrew lastLocationKey:', lastLocationKey);
  // console.log('devdrew pageAnalytics:', pageAnalytics);

  useEffect(() => {
    // Only continue if the user's location changed.
    if (lastLocationKey.current === location.key) return;
    lastLocationKey.current = location.key;

    // Analytics data, including browser information
    const payload = {
      ...getClientBrowserParameters(),
      ...pageAnalytics,
    };

    // Send analytics payload to Shopify
    sendShopifyAnalytics({
      eventName: AnalyticsEventName.PAGE_VIEW,
      payload,
    });
  }, [location]);

  const {cart, showSliderCart, previewMode, customer} = useLoaderData();
  const {setData: setCartData = () => {}, toggleCart} = useStore(
    (store) => store?.cart ?? null,
  );

  const {data: customerData, setCustomerData} = useStore(
    (store) => store?.account ?? {},
  );

  useEffect(() => {
    setCartData(cart);

    if (customerData && customer?.id !== customerData.id) {
      getCustomerSubscriptionData(customer);
    }

    if (showSliderCart) toggleCart(true);
  }, []);

  useEffect(() => {
    if (previewMode) updatePreviewModeURL();
  }, [location]);

  async function getCustomerSubscriptionData(customer) {
    if (customer?.id) {
      customer.subscription = {};
      const customerId = parseGid(customer.id).id;

      const [
        activeSubscription,
        inactiveSubscription,
        subscriptionOrders,
        items,
        payments,
        subscriptionAddresses,
      ] = await Promise.all([
        getCustomerSubscription(customerId, true),
        getCustomerSubscription(customerId),
        getCustomerOrders(customerId),
        getItems(customerId),
        getSubscriptionPayments(customerId),
        getCustomerAddresses(customerId),
      ]);

      subscriptionAddresses &&
        (customer.subscription.addresses = subscriptionAddresses);

      inactiveSubscription &&
        (customer.subscription.inactive = inactiveSubscription);

      const activeItems = {
        ...items,
        results: items?.results?.map((item) => {
          if (activeSubscription?.results) {
            const subscription = activeSubscription.results.find(
              (sub) => sub.public_id === item.subscription,
            );
            const payment = payments?.results?.find(
              (pay) => pay.public_id === subscription.payment,
            );

            subscription.payment = payment;
            item.subscription = subscription;
          }

          return item;
        }),
      };

      subscriptionOrders?.results &&
        (subscriptionOrders.results = subscriptionOrders.results.map(
          (order) => {
            const items = [];

            activeItems.results.forEach((item) => {
              if (order.public_id === item.order) {
                items.push(item);
              }
            });

            const payment = payments?.results?.find(
              (pay) => pay.public_id === order.payment,
            );

            order.payment = payment;
            order.items = items;
            return order;
          },
        ));

      subscriptionOrders && (customer.subscription.orders = subscriptionOrders);

      setCustomerData(customer);
    }
  }

  return (
    <RootStructure>
      <Outlet />
    </RootStructure>
  );
}

/**
 * ...In v2 there is no CatchBoundary and all
 * unhandled exceptions will render the
 * ErrorBoundary, response or otherwise.
 *
 * ref: https://remix.run/docs/en/1.15.0/pages/v2#catchboundary-and-errorboundary
 */

export function ErrorBoundary() {
  const error = useRouteError();

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <RootStructure>
        <CatchContent status={error.status} />
      </RootStructure>
    );
  }

  return (
    <RootStructure>
      <ErrorContent error={error} />
    </RootStructure>
  );
}

/**
 * default structure for all the pages
 */

function RootStructure({children}) {
  return (
    <html lang="en">
      <head>
        <PageMeta />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

//
//
//
//
//

/**
 * UTILS
 */

async function checkRedirect(context, request) {
  const {pathname} = new URL(request.url);
  let redirect = {};

  if (pathname.length > 1) {
    const redirectObj = await getCMSContent(context, GET_REDIRECTS, {
      source: pathname,
    });

    if (redirectObj[0]?.destination) {
      const statusCode = parseInt(redirectObj[0]?.statusCode) || 301;
      redirect = {destination: redirectObj[0]?.destination, statusCode};
    }
  }
  return redirect;
}

function checkShowSliderCart(request) {
  const url = new URL(request.url);
  const cart = url.searchParams.get('cart');

  return cart === 'show';
}

function togglePreviewMode(context, url, referer) {
  const {session} = context;
  const queryParam = url.searchParams.get('previewMode');
  const isSiteFirstRender = !referer;

  if (queryParam === 'true') {
    session.set('previewMode', 'true');
  } else if (isSiteFirstRender) {
    session.unset('previewMode');
  }
}

function updatePreviewModeURL() {
  pushQueryParam('previewMode', 'true');
}

async function requestCMSData(context, cacheObj) {
  cacheObj.cartPageConfig = getCMSContent(context, GET_CART_PAGE_CONFIG);
  cacheObj.searchConfig = getCMSContent(context, GET_SEARCH_CONFIG);
  cacheObj.listrakRec = getCMSContent(context, GET_LISTRAK_REC);
  cacheObj.footers = getCMSContent(context, GET_FOOTERS);

  cacheObj.announcementTopBanner = getCMSContent(
    context,
    GET_ANNOUNCEMENT_TOP_BANNER,
  );
  cacheObj.mobileNavFooterMainButton = getCMSContent(
    context,
    GET_MOBILE_NAV_FOOTER_MAIN_BUTTON,
  );
  cacheObj.emailSmsSignupContent = getCMSContent(
    context,
    GET_EMAIL_SMS_SIGNUP_CONTENT,
  );

  const data = await Promise.all([
    getMainNavFooterCMSData(context),
    getCMSContent(context, GET_PRODUCTS),
  ]);

  cacheObj.mainNavFooterCMSData = data[0];
  cacheObj.productsCMS = data[1];
}
