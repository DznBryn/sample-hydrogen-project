import styles from './styles/app.css';
import favicon from '../public/favicon.ico';
import { defer } from '@shopify/remix-oxygen';
import { CacheShort, generateCacheControlHeader } from '@shopify/hydrogen';
import { getCartData, getCustomerData } from './utils/functions/eventFunctions';
import { Link, Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { getGroupOfCMSContent } from '~/utils/functions/eventFunctions';
import { getCollectionProducts } from '~/utils/graphql/shopify/queries/collections';
import { GET_FOOTERS, GET_EMAIL_SMS_SIGNUP_CONTENT, GET_CART_PAGE_CONFIG, GET_ANNOUNCEMENT_HEADER, GET_ANNOUNCEMENT_MESSAGES, GET_MOBILE_NAV_BAR, GET_HEADER_CONFIG, GET_MOBILE_NAV_FOOTER_MAIN_BUTTON, GET_ANNOUNCEMENT_TOP_BANNER, GET_SITE_WIDE_SETTINGS, GET_SEARCH_CONFIG } from '~/utils/graphql/sanity/queries';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'preconnect', href: 'https://cdn.shopify.com' },
    { rel: 'preconnect', href: 'https://shop.app' },
    { rel: 'icon', type: 'image/svg+xml', href: favicon },
  ];
};

export const meta = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
  title: 'TULA Skincare: Probiotic Skin Care Products',
  description: 'Clean + effective probiotic skincare products made with superfoods.',
});

async function getMainNavFooterCMSData(context){

  const queries = [
    GET_FOOTERS, 
    GET_EMAIL_SMS_SIGNUP_CONTENT, 
    GET_CART_PAGE_CONFIG, 
    GET_ANNOUNCEMENT_HEADER, 
    GET_ANNOUNCEMENT_MESSAGES, 
    GET_MOBILE_NAV_BAR, 
    GET_HEADER_CONFIG, 
    GET_MOBILE_NAV_FOOTER_MAIN_BUTTON, 
    GET_ANNOUNCEMENT_TOP_BANNER, 
    GET_SITE_WIDE_SETTINGS, 
    GET_SEARCH_CONFIG
  ];

  const contents = await getGroupOfCMSContent(context, queries);
  const collection = await getCollectionProducts(context, 'all');
  
  return {
    ...contents,
    collection
  };

}

export async function loader({ context }) {

  const globalCMSData = {};
  const cart = await getCartData(context);
  const customer = await getCustomerData(context);

  globalCMSData.mainNavFooter = await getMainNavFooterCMSData(context);


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
