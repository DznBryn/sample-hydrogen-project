import { useLoaderData } from '@remix-run/react';
import { CacheShort, flattenConnection, generateCacheControlHeader } from '@shopify/hydrogen';
import { defer, redirect } from '@shopify/remix-oxygen';
import { getCustomer } from '~/utils/graphql/shopify/queries/customer';
import Layouts from '~/layouts';
import Account, {links as accountStyles} from '~/modules/accounts';
import { useStore } from '~/hooks/useStore';
import { useEffect } from 'react';

export function links(){
  return [
    ...accountStyles(),
  ];
}

export async function loader({ request, context, params }) {
  const { pathname } = new URL(request.url);
  const isAccountPage = /^\/account\/?$/.test(pathname);
  const lang = params.lang;
  const customerAccessToken = await context.session.get('customerAccessToken');

  if (typeof customerAccessToken !== 'string' && isAccountPage ) {
    await context.session.unset('customerAccessToken');
    return redirect(lang ? `/${lang}/account/login` : '/account/login', {
      headers: {
        'Set-Cookie': await context.session.commit()
      }
    });
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
  const { customer } = useLoaderData();
  const {data, setCustomerData} = useStore((store) => store?.account);
  useEffect(() => {
    if(data.id === ''){
      setCustomerData(customer);
    }
  }, []);
  
  return (
    <Layouts.MainNavFooter>
      <Account />
    </Layouts.MainNavFooter>
    
  );
}
