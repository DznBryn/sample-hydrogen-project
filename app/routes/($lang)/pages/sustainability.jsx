import Layouts from '~/layouts';

import { getCMSContent, getCMSDoc } from '~/utils/functions/eventFunctions';
import { GET_WHY_TULA } from '~/utils/graphql/sanity/queries';
import { useLoaderData } from '@remix-run/react';

import Sustainability, { links as sustainabilityStyles } from '~/modules/sustainability';

export const links = () => sustainabilityStyles();

export async function loader({context}) {

  const sustainabilityContent = await getCMSContent(context, GET_WHY_TULA);

  return {
    sustainabilityContent,
  }
}

export default function OurStoryAndFounderComponent() {

  const { 
    sustainabilityContent

  } = useLoaderData();

  return (
    <Layouts.MainNavFooter>
       <Sustainability content={sustainabilityContent} />
    </Layouts.MainNavFooter>
  );
}
