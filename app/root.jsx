import styles from './styles/app.css';
import favicon from '../public/favicon.ico';
import PageMeta from './modules/pageMeta';
import { defer } from '@shopify/remix-oxygen';
import { getMainNavFooterCMSData } from './layouts/MainNavFooter';
import { CacheShort, generateCacheControlHeader } from '@shopify/hydrogen';
import { getCMSContent, getCartData, getCustomerData } from './utils/functions/eventFunctions';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import getApiKeys from './utils/functions/getApiKeys';
import { links as layoutsStyles } from '~/layouts';
import { GET_PRODUCTS } from './utils/graphql/sanity/queries';


export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: `https://staticw2.yotpo.com/${getApiKeys().YOTPO_KEY}/widget.css?widget_version=2022-10-06_07-58-33` },
    { rel: 'preconnect', href: 'https://cdn.shopify.com' },
    { rel: 'preconnect', href: 'https://shop.app' },
    { rel: 'icon', type: 'image/svg+xml', href: favicon },
    ...layoutsStyles().mainNavFooterStyles,
  ];
};

export const meta = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
  title: 'TULA Skincare: Probiotic Skin Care Products',
  description: 'Clean + effective probiotic skincare products made with superfoods.',
});

export async function loader({ context }) {

  const cart = await getCartData(context);
  const customer = await getCustomerData(context);
  const globalCMSData = {
    mainNavFooter: await getMainNavFooterCMSData(context),
    products: await getCMSContent(context, GET_PRODUCTS),
  };

  return defer(
    {
      customer,
      cart,
      globalCMSData,
    },
    {
      headers: {
        'Cache-Control': generateCacheControlHeader(CacheShort())
      }
    }
  );

}

export default function App() {

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <PageMeta/>
      </head>
      <body style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        
      }}>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

