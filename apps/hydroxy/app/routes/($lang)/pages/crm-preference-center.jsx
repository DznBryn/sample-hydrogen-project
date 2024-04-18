import Layouts from '~/layouts';

import CrmPreferenceCenter, { links as crmPreferenceCenterStyles } from '~/modules/crmPreferenceCenter';

export const links = () => crmPreferenceCenterStyles();

export default function CrmPreferenceCenterComponent() {
  return (
    <Layouts.MainNavFooter>
       <CrmPreferenceCenter />
    </Layouts.MainNavFooter>
  );
}

