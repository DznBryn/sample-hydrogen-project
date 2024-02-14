import Layouts from '~/layouts';
import {getCMSContent} from '~/utils/functions/eventFunctions';
import {GET_OUR_STORY} from '~/utils/graphql/sanity/queries';
import {useLoaderData} from '@remix-run/react';

import OurStoryAndFounder, {
  links as ourStoryAndFounderStyles,
} from '~/modules/ourStoryAndFounder';

export const links = () => ourStoryAndFounderStyles();

export const meta = () => [
  {title: 'TULA Skincare Story & Founder'},
  {
    description: 'Founded by Dr. Roshini Raj, TULA is built on the power of probiotics & superfoods. We believe that ingredients which are good for your body are also great for your skin.',
  },
];

export async function loader({context}) {
  const ourStoryContent = await getCMSContent(context, GET_OUR_STORY);

  return {
    ourStoryContent,
  };
}

export default function OurStoryAndFounderComponent() {
  const {ourStoryContent} = useLoaderData();

  return (
    <Layouts.MainNavFooter>
      <OurStoryAndFounder ourStoryContent={ourStoryContent} />
    </Layouts.MainNavFooter>
  );
}
