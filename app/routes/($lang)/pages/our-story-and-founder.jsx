import Layouts from '~/layouts';

import { getCMSContent, getCMSDoc } from '~/utils/functions/eventFunctions';
import { GET_OUR_STORY, GET_CAROUSEL_SLIDES_GROUP, GET_WHY_TULA } from '~/utils/graphql/sanity/queries';
import { useLoaderData } from '@remix-run/react';

import OurStoryAndFounder from '~/modules/ourStoryAndFounder';


export async function loader({context}) {

  const ourStoryContent = await getCMSContent(contect, GET_OUR_STORY);

  const carouselSlidesGroup = await getCMSContent(context, GET_CAROUSEL_SLIDES_GROUP);
  const whyTulaContent = await getCMSContent(context, GET_WHY_TULA);

  return {
    carouselSlidesGroup,
    whyTulaContent
  }
}

export default function OurStoryAndFounderComponent() {

  const { 
    carouselSlidesGroup,
    whyTulaContent,
    ourStoryContent

  } = useLoaderData();

  console.log("devdrew ourStoryContent", ourStoryContent)

  return (
    <Layouts.MainNavFooter>
       <p>Hello from OurStory Parent</p>
    </Layouts.MainNavFooter>
  );
}
