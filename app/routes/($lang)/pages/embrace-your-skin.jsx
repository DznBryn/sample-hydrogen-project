import Layouts from '~/layouts';

import { getCMSContent } from '~/utils/functions/eventFunctions';
import { GET_EMBRACE_YOUR_SKIN } from '~/utils/graphql/sanity/queries';
import { useLoaderData } from '@remix-run/react';

import EmbraceYourSkin, { links as embraceYourSkinStyles } from '~/modules/embraceYourSkin';

export const links = () => embraceYourSkinStyles();

export async function loader({context}) {

    const embraceYourSkinContent = await getCMSContent(context, GET_EMBRACE_YOUR_SKIN);
  
    return {
        embraceYourSkinContent,
    }
  }

export default function EmbraceYourSkinComponent() {

    const { 
        embraceYourSkinContent
    } = useLoaderData();

  return (
    <Layouts.MainNavFooter>
       <EmbraceYourSkin content={embraceYourSkinContent} />
    </Layouts.MainNavFooter>
  );
}
