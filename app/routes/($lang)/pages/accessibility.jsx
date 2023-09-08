import Layouts from '~/layouts';

import AccessibilityPage, { links as accessibilityPageStyles } from '~/modules/accessibilityPage';

export const links = () => accessibilityPageStyles();

export default function AccessibilityPageComponent() {
  return (
    <Layouts.MainNavFooter>
       <AccessibilityPage />
    </Layouts.MainNavFooter>
  );
}
