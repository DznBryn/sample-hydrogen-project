import Layouts from '~/layouts';

import CrmPreferenceCenter, SkeletonLoader, { links as crmPreferenceCenterStyles } from '~/modules/crmPreferenceCenter';

export const links = () => crmPreferenceCenterStyles();

export default function CrmPreferenceCenterComponent() {
  return (
    <Layouts.MainNavFooter>
        <SkeletonLoader />
       <CrmPreferenceCenter />
    </Layouts.MainNavFooter>
  );
}

