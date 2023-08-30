import Layouts from '~/layouts';

import StoreLocator, { links as storeLocatorStyles } from '~/modules/storeLocator';

export const links = () => storeLocatorStyles();

export default function OurStoryAndFounderComponent() {

  return (
    <Layouts.MainNavFooter>
       <StoreLocator />
    </Layouts.MainNavFooter>
  );
}
