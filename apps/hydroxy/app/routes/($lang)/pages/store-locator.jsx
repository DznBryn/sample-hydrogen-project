import Layouts from '~/layouts';

import StoreLocator, {
  links as storeLocatorStyles,
} from '~/modules/storeLocator';

export const links = () => storeLocatorStyles();

export const meta = () => [{title: 'Store Locator - TULA Skincare'}];

export default function StoreLocatorComponent() {
  return (
    <Layouts.MainNavFooter>
      <StoreLocator />
    </Layouts.MainNavFooter>
  );
}
