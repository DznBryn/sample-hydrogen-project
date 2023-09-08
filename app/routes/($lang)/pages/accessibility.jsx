import Layouts from '~/layouts';

import AccessibilityPage, { links as accessibilityPageStyles } from '~/modules/AccessibilityPage';

export const links = () => accessibilityPageStyles();

export default function SmsSignUpComponent() {
  return (
    <Layouts.MainNavFooter>
       <AccessibilityPage />
    </Layouts.MainNavFooter>
  );
}
