import { Form, useLoaderData } from '@remix-run/react';
import { CacheShort, flattenConnection, generateCacheControlHeader } from '@shopify/hydrogen';
import { defer, redirect } from '@shopify/remix-oxygen';
import { getCustomer } from '~/utils/graphql/shopify/queries/customer';

export async function loader({ request, context, params }) {
  const { pathname } = new URL(request.url);
  const isAccountPage = /^\/account\/?$/.test(pathname);
  const lang = params.lang;
  const customerAccessToken = await context.session.get('customerAccessToken');

  if (!customerAccessToken && isAccountPage) {
    return redirect(lang ? `/${lang}/account/login` : '/account/login');
  }

  const customer = await getCustomer(context, customerAccessToken);
  customer.addresses = flattenConnection(customer.addresses);
  customer.orders = flattenConnection(customer.orders);

  const header = customer ? customer?.firstName ? `Welcome, ${customer.firstName}`: 'Welcome to your account' : 'Account Page';

  return defer(
    {
      header,
      customer
    },
    {
      headers: {
        'Cache-Control': generateCacheControlHeader(CacheShort())
      }
    }
  );
}
export default function AccountPage() {
  const { header, customer } = useLoaderData();
  console.log('Customer:', customer);
  return (
    <div>
      <h1>{header}</h1>
      <Form method='post' action='/account/logout'>
        <button type='submit'>logout</button>
      </Form>
      <pre>{JSON.stringify(customer, null, 2)}</pre>
    </div>
  );
}
