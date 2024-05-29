import {Multipass} from '~/utils/services/multipass';
import {useCustomer} from './useCustomer';
import {useRouteLoaderData} from '@remix-run/react';

//

export function useMultipass() {
  const {ENVS} = useRouteLoaderData('root');
  const customerData = useCustomer();

  //

  function navigateToShopify(shopifyPage) {
    if (typeof window !== 'object') return;

    let urlToGo = shopifyPage;

    if (customerData?.email?.length) {
      const obj = {return_to: shopifyPage, email: customerData?.email};

      urlToGo = new Multipass(ENVS?.MULTIPASS_SECRET).getURL(
        ENVS?.PUBLIC_STORE_DOMAIN,
        obj,
      );
    }

    window.location.href = urlToGo;
  }

  //

  return {
    navigateToShopify,
  };
}
