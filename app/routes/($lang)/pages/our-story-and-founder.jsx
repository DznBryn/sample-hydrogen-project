import Layouts from '~/layouts';

import { getCMSContent, getCMSDoc } from '~/utils/functions/eventFunctions';
import { GET_OUR_STORY, GET_CAROUSEL_SLIDES_GROUP, GET_WHY_TULA } from '~/utils/graphql/sanity/queries';
import { useLoaderData } from '@remix-run/react';

import OurStoryAndFounder from '~/modules/ourStoryAndFounder';


export async function loader({context}) {

  const ourStoryContent = await getCMSContent(context, GET_OUR_STORY);

  return {
    ourStoryContent,
  }
}

export default function OurStoryAndFounderComponent() {

  const { 
    ourStoryContent

  } = useLoaderData();

  console.log("devdrew ourStoryContent", ourStoryContent)

  return (
    <Layouts.MainNavFooter>
       <OurStoryAndFounder ourStoryText={ourStoryContent} ourStoryImgs={ourStoryContent} />
    </Layouts.MainNavFooter>
  );
}
