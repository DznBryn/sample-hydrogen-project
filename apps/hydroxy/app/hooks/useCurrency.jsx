import {useRouteLoaderData} from '@remix-run/react';

//

function useCurrency() {
  const rootData = useRouteLoaderData('root');
  const siteName = rootData?.ENVS?.SITE_NAME;

  //

  function getCurrency() {
    const isUk = siteName.includes('UK');
    const currencySymbol = isUk ? '£' : '$';

    return currencySymbol;
  }

  //

  return {
    getCurrency,
  };
}

export default useCurrency;
