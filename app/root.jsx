import {useEffect} from 'react';
import {useStore} from './hooks/useStore';
import PageMeta from './modules/pageMeta';
import {useCatch} from '@remix-run/react';
import favicon from '../public/favicon.ico';
import {defer} from '@shopify/remix-oxygen';
import {links as layoutsStyles} from '~/layouts';
import {redirect} from '@remix-run/server-runtime';
import getApiKeys from './utils/functions/getApiKeys';
import {getMainNavFooterCMSData} from './layouts/MainNavFooter';
import {CacheShort, generateCacheControlHeader} from '@shopify/hydrogen';
import {
  getCMSContent,
  getCartData,
  getCustomerData,
  getRedirectObj,
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
import styles from './styles/app.css';

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

export const meta = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
  title: 'TULA Skincare: Probiotic Skin Care Products',
  description:
    'Clean + effective probiotic skincare products made with superfoods.',
});

export async function loader({context, request}) {
  //redirects handle
  const {pathname} = new URL(request.url);
  const redirects = await getCMSContent(context, GET_REDIRECTS);
  const redirectObj = getRedirectObj(pathname, redirects);

  if (redirectObj?.destination) {
    const statusCode = parseInt(redirectObj?.statusCode) || 301;
    return redirect(redirectObj?.destination, statusCode);
  }
  //

  const cart = await getCartData(context);
  const customer = await getCustomerData(context);
  const listrakRec = await getCMSContent(context, GET_LISTRAK_REC);
  const globalCMSData = {
    mainNavFooter: await getMainNavFooterCMSData(context),
    products: await getCMSContent(context, GET_PRODUCTS),
  };

  return defer(
    {
      customer,
      cart,
      globalCMSData,
      listrakRec,
    },
    {
      headers: {
        'Cache-Control': generateCacheControlHeader(CacheShort()),
      },
    },
  );
}

export default function App() {
  return (
    <RootStructure>
      <Outlet />
    </RootStructure>
  );
}

/**
 *
 * This will handle all thrown responses that weren't
 * handled in a nested route (more on that in a sec).
 *
 * ref: https://remix.run/docs/en/1.19.3/guides/not-found
 */

export function CatchBoundary() {
  const {status} = useCatch();

  return (
    <RootStructure>
      <CatchContent status={status} />
    </RootStructure>
  );
}

/**
 * An ErrorBoundary is a React component that renders
 * whenever there is an error anywhere on the route,
 * either during rendering or during data loading.
 * We use the word "error" to mean an uncaught exception;
 * something you didn't anticipate happening. You can
 * intentionally throw a Response to render the CatchBoundary,
 * but everything else that is thrown is handled by the ErrorBoundary.
 *
 * ref: https://remix.run/docs/en/1.19.3/route/error-boundary
 */

export function ErrorBoundary({error}) {
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
  const loaderData = useLoaderData();
  const {setData: setCartData = () => {}, data = null} = useStore(
    (store) => store?.cart ?? null,
  );
  useEffect(() => {
    if (loaderData?.cart?.id && loaderData?.cart?.id !== data?.id) {
      setCartData(loaderData.cart);
    }
    console.log('Root Renders');
  }, []);
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
