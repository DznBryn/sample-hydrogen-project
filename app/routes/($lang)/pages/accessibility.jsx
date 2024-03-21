import Layouts from '~/layouts';

import AccessibilityPage, {
  links as accessibilityPageStyles,
} from '~/modules/accessibilityPage';

export const links = () => accessibilityPageStyles();

export const meta = () => [
  {title: 'Accessibility'},
  {
    name: 'description',
    content: 'This page contains accessibility information for tula.com',
  },
];

export default function AccessibilityPageComponent() {
  return (
    <Layouts.MainNavFooter>
      <AccessibilityPage />
    </Layouts.MainNavFooter>
  );
}
