import Layouts from '~/layouts';

import Referrals, {links as referralsStyles} from '~/modules/referrals';

export const links = () => referralsStyles();

export const meta = () => [
  {title: 'Share | TULA Skincare'},
  {
    name: 'description',
    content:
      'Beauty and Style Experts share their opinions about Tula Priobiotic Skincare Products.',
  },
];

export default function ReferralsComponent() {
  return (
    <Layouts.MainNavFooter>
      <Referrals />
    </Layouts.MainNavFooter>
  );
}
