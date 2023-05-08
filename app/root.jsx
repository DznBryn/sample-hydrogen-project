import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import styles from './styles/app.css';
import favicon from '../public/favicon.ico';
import { links as homePageStyles } from './modules/homepage';
import { defer } from '@shopify/remix-oxygen';
import { getCart } from './utils/graphql/shopify/queries/cart';

export const links = () => {
  return [
    ...homePageStyles(),
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
});

export async function loader({ context }) {
  const [customerAccessToken] = await Promise.all([
    context.session.get('customerAccessToken'),
  ]);

  console.log('SESSION:', context.session.session.data);

  const layout = await context.storefront.query(LAYOUT_QUERY);

  return defer({
    isLoggedIn: Boolean(customerAccessToken),
    selectedLocate: context?.storefront?.i18n,
    cart: getCart(context),
    layout
  });
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
        {
          links.map(item => <p key={item.link}><Link to={item.link}>{item.name}</Link></p>)
        }
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const LAYOUT_QUERY = `#graphql
  query layout {
    shop {
      name
      description
    }
  }
`;
