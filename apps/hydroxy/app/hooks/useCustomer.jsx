import {useRouteLoaderData} from '@remix-run/react';

export function useCustomer() {
  const {customer} = useRouteLoaderData('root');

  return {
    ...customer,
    isLoggedIn: !!customer?.id,
  };
}
