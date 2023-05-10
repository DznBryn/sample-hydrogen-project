import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import styles from './styles/app.css';
import favicon from '../public/favicon.ico';
import { defer } from '@shopify/remix-oxygen';
// import { getCart } from './utils/graphql/shopify/queries/cart';
import { CacheShort, flattenConnection, generateCacheControlHeader } from '@shopify/hydrogen';
import { getCustomer } from '~/utils/graphql/shopify/queries/customer';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    { rel: 'icon', type: 'image/svg+xml', href: favicon },
  ];
};

export const meta = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
  title: 'TULA Skincare: Probiotic Skin Care Products',
  description: 'Clean + effective probiotic skincare products made with superfoods.',
});

// const LAYOUT_QUERY = `#graphql
//   query layout {
//     shop {
//       name
//       description
//     }
//   }
// `;

// export async function loader({ context }) {
//   const [customerAccessToken] = await Promise.all([
//     context.session.get('customerAccessToken'),
//   ]);

//   console.log('SESSION:', context.session.session.data);

//   const layout = await context.storefront.query(LAYOUT_QUERY);

//   return defer({
//     isLoggedIn: Boolean(customerAccessToken),
//     selectedLocate: context?.storefront?.i18n,
//     cart: getCart(context),
//     layout
//   });
// }

export async function loader({ context }) {

  const customerAccessToken = await context.session.get('customerAccessToken');

  if (customerAccessToken) {

    const customer = await getCustomer(context, customerAccessToken);
    customer.addresses = flattenConnection(customer.addresses);
    customer.orders = flattenConnection(customer.orders);

    return defer(
      {
        customer
      },
      {
        headers: {
          'Cache-Control': generateCacheControlHeader(CacheShort())
        }
      }
    );

  } else {

    return ({
      customer: {
        id: '',
        firstName: '',
        email: '',
      }
    });

  }

}

export default function App() {

  const { customer } = useLoaderData();

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
        {
          links.map(item => <p key={item.link}><Link to={item.link}>{item.name}</Link></p>)
        }
        <br />
        <Outlet context={{ customer }} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
