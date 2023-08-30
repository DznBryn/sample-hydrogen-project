import Layouts from '~/layouts';

import { getCMSContent, getCMSDoc } from '~/utils/functions/eventFunctions';
import { useLoaderData } from '@remix-run/react';

import Sustainability, { links as sustainabilityStyles } from '~/modules/sustainability';

export const links = () => sustainabilityStyles();

export default function SustainabilityComponent() {

  return (
    <Layouts.MainNavFooter>
       <Sustainability />
    </Layouts.MainNavFooter>
  );
}
