import Layouts from '~/layouts';

import { getCMSContent, getCMSDoc } from '~/utils/functions/eventFunctions';
import { GET_WHY_TULA } from '~/utils/graphql/sanity/queries';
import { useLoaderData } from '@remix-run/react';

import WhyTula, { links as whyTulaStyles } from '~/modules/whyTula';

export const links = () => whyTulaStyles();

export async function loader({context}) {

  const whyTulaContent = await getCMSContent(context, GET_WHY_TULA);

  return {
    whyTulaContent,
  }
}

export default function WhyTulaComponent() {

  const { 
    whyTulaContent

  } = useLoaderData();

  return (
    <Layouts.MainNavFooter>
       <WhyTula content={whyTulaContent} />
    </Layouts.MainNavFooter>
  );
}
