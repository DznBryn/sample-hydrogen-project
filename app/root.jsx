import styles from './styles/app.css';
import favicon from '../public/favicon.ico';
import { defer } from '@shopify/remix-oxygen';
import { getMainNavFooterCMSData } from './layouts/MainNavFooter';
import { CacheShort, generateCacheControlHeader } from '@shopify/hydrogen';
import { getCMSContent, getCartData, getCustomerData } from './utils/functions/eventFunctions';
import { Link, Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import { links as layoutsStyles } from '~/layouts';
import { GET_PRODUCTS } from './utils/graphql/sanity/queries';


export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
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
  // console.log('customer:', customer);
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

  const links = [
    {
      name: 'Account Page',
      link: '/account',
    },
    {
      name: 'Login Page',
      link: '/account/login'
    },
    {
      name: 'Collections All page',
      link: '/products'
    },
    {
      name: 'Cart page',
      link: '/cart'
    },
  ];

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet/>
        <ScrollRestoration />
        <Scripts />
        {
          links.map(item => <p key={item.link}><Link to={item.link}>{item.name}</Link></p>)
        }
      </body>
    </html>
  );
}
