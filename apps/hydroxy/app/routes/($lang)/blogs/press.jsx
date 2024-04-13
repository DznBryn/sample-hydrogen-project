import Layouts from '~/layouts';

import {getCMSContent} from '~/utils/functions/eventFunctions';
import {GET_PRESS_PAGE} from '~/utils/graphql/sanity/queries';
import {useLoaderData} from '@remix-run/react';

import PressPage, {links as pressPageStyles} from '~/modules/pressPage';

export const links = () => pressPageStyles();

export const meta = () => [
  {title: 'Tula Probiotics Skincare in the Press - TULA Skincare'},
  {
    name: 'description',
    content: 'Tula Probiotics Skincare in the Press - TULA Skincare',
  },
];

export async function loader({context}) {
  const pressPageContent = await getCMSContent(context, GET_PRESS_PAGE);

  return {
    pressPageContent,
  };
}

export default function PressPageComponent() {
  const {pressPageContent} = useLoaderData();

  return (
    <Layouts.MainNavFooter>
      <PressPage content={pressPageContent} />
    </Layouts.MainNavFooter>
  );
}
