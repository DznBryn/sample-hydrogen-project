import {
  getCMSContent,
  getCartData,
  getCustomerData,
  getMainNavFooterCMSData,
} from './utils/functions/eventFunctions';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import {
  GET_LISTRAK_REC,
  GET_PRODUCTS,
  GET_REDIRECTS,
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
import styles from './styles/app.css';
import {useEffect} from 'react';

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

export const meta = () => [
  {charset: 'utf-8'},
  {name: 'robots', content: 'noindex'},
  {name: 'viewport', content: 'width=device-width,initial-scale=1'},
  {title: 'TULA Skincare: Probiotic Skin Care Products'},
  {
    description:
      'Clean + effective probiotic skincare products made with superfoods.',
  },
];

export async function loader({context, request}) {
  const referer = request.headers.get('referer');
  if (!referer) {
    const {destination, statusCode} = await checkRedirect(context, request);
    if (destination && statusCode) return redirect(destination, statusCode);
  }

  const {cart, customer, listrakRec, mainNavFooter, products} =
    await fetchContentData(context);

  return defer({
    cart,
    customer,
    listrakRec,
    mainNavFooterCMSData: mainNavFooter,
    productsCMSData: products,
    showSliderCart: checkShowSliderCart(request),
  });
}

export default function App() {
  const {cart, showSliderCart} = useLoaderData();
  const {
    setData: setCartData = () => {},
    data = null,
    toggleCart,
  } = useStore((store) => store?.cart ?? null);

  useEffect(() => {
    if (cart?.id && cart?.id !== data?.id) {
      setCartData(cart);
    }

    if (showSliderCart) toggleCart(true);
  }, []);

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
        <Meta />
        <Links />
        <PageMeta />
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

async function fetchContentData(context) {
  const listrakRec = getCMSContent(context, GET_LISTRAK_REC);

  const [cart, customer, mainNavFooter, products] = await Promise.all([
    getCartData(context),
    getCustomerData(context),
    getMainNavFooterCMSData(context),
    getCMSContent(context, GET_PRODUCTS),
  ]);

  return {
    cart,
    customer,
    listrakRec,
    mainNavFooter,
    products,
  };
}

function checkShowSliderCart(request) {
  const url = new URL(request.url);
  const cart = url.searchParams.get('cart');

  return cart === 'show';
}
