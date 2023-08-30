import Layouts from '~/layouts';

import { getCMSContent, getCMSDoc } from '~/utils/functions/eventFunctions';
import { GET_STORE_LOCATOR } from '~/utils/graphql/sanity/queries';
import { useLoaderData } from '@remix-run/react';

import StoreLocator, { links as storeLocatorStyles } from '~/modules/storeLocator';

export const links = () => storeLocatorStyles();

export async function loader({context}) {

  const storeLocatorContent = await getCMSContent(context, GET_STORE_LOCATOR);

  return {
    storeLocatorContent,
  }
}

export default function OurStoryAndFounderComponent() {

  const { 
    storeLocatorContent

  } = useLoaderData();


  return (
    <Layouts.MainNavFooter>
       <StoreLocator content={storeLocatorContent} />
    </Layouts.MainNavFooter>
  );
}
