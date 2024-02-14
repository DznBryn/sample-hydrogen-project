import Layouts from '~/layouts';

import Sustainability, {
  links as sustainabilityStyles,
} from '~/modules/sustainability';

export const links = () => sustainabilityStyles();

export const meta = () => [
  {title: 'Sustainability'},
  {
    description: 'sustainability at TULA This is the start of our journey. We\'re continuing to evaluate opportunities that make a more thoughtful impact on the environment & help you make choices that keep your skin & our planet healthy. TULA Skincare® Recycling Program Recycle TULA jars & tubes that can’t be curbside recycled, free of...',
  },
];

export default function SustainabilityComponent() {
  return (
    <Layouts.MainNavFooter>
      <Sustainability />
    </Layouts.MainNavFooter>
  );
}
