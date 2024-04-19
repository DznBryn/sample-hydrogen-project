import {useRouteLoaderData} from '@remix-run/react';

//

function useFeatureFlags() {
  const rootData = useRouteLoaderData('root');
  const siteName = rootData?.ENVS?.SITE_NAME;
  const isUS = siteName.includes('US');

  //

  return {
    SHOW_LOYALTY: (() => isUS)(),
    SHOW_FIREWORK: (() => isUS)(),
  };
}

export default useFeatureFlags;
