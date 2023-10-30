import Layouts from '~/layouts';

import Referrals, { links as referralsStyles } from '~/modules/referrals';

export const links = () => referralsStyles();

export default function ReferralsComponent() {
  return (
    <Layouts.MainNavFooter>
       <Referrals />
    </Layouts.MainNavFooter>
  );
}
