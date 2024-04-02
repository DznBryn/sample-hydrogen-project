import Layouts from '~/layouts';

import CustomerHealth, {links as styles} from '~/modules/customerHealthCare';

export const links = () => styles();

export default function CustomerHealthComponent() {
  return (
    <Layouts.MainNavFooter>
      <CustomerHealth />
    </Layouts.MainNavFooter>
  );
}
