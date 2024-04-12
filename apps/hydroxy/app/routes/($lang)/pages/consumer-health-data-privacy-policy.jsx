import Layouts from '~/layouts';

import ConsumerHealth, {links as styles} from '~/modules/consumerHealthPage';

export const links = () => styles();

export default function ConsumerHealthComponent() {
  return (
    <Layouts.MainNavFooter>
      <ConsumerHealth />
    </Layouts.MainNavFooter>
  );
}
