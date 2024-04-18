import Layouts from '~/layouts';
import {getCMSContent} from '~/utils/functions/eventFunctions';
import {GET_WHY_TULA} from '~/utils/graphql/sanity/queries';
import {useLoaderData} from '@remix-run/react';

import WhyTula, {links as whyTulaStyles} from '~/modules/whyTula';

export const links = () => whyTulaStyles();

export const meta = () => [
  {title: 'Probiotic Skincare – TULA Skincare'},
  {
    name: 'description',
    content:
      'Rethink healthy skin From the inside out with probiotic skincare. Probiotic extracts are natural, good-for-you bacteria that work to improve your health, inside and out.',
  },
];

export async function loader({context}) {
  const whyTulaContent = await getCMSContent(context, GET_WHY_TULA);

  return {
    whyTulaContent,
  };
}

export default function WhyTulaComponent() {
  const {whyTulaContent} = useLoaderData();

  return (
    <Layouts.MainNavFooter>
      <WhyTula content={whyTulaContent} />
    </Layouts.MainNavFooter>
  );
}
