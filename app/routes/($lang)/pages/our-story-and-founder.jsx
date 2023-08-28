import Layouts from '~/layouts';

import { getCMSContent, getCMSDoc } from '~/utils/functions/eventFunctions';
import { GET_OUR_STORY } from '~/utils/graphql/sanity/queries';
import { useLoaderData } from '@remix-run/react';

import OurStoryAndFounder from '~/modules/ourStoryAndFounder';


export async function loader({context}) {

  const ourStoryContent = await getCMSContent(context, GET_OUR_STORY);
  return {
    ourStoryContent
  }
}

export default function OurStoryAndFounderComponent() {

  const { 
    ourStoryContent
  } = useLoaderData();

  return (
    <Layouts.MainNavFooter>
       <OurStoryAndFounder />
    </Layouts.MainNavFooter>
  );
}
