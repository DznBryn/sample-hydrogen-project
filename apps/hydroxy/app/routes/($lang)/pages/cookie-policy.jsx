import Layouts from '~/layouts';
import { getCMSContent } from '~/utils/functions/eventFunctions';
import { GET_COOKIE_POLICY_PAGE } from '~/utils/graphql/sanity/queries';
import { useLoaderData } from '@remix-run/react';

import CookiePolicyPage, { links as cookiePolicyPageStyles } from '~/modules/cookiePolicyPage';

export const links = () => cookiePolicyPageStyles();

export async function loader({context}) {

    const cookiePolicyPageContent = await getCMSContent(context, GET_COOKIE_POLICY_PAGE);
  
    return {
        cookiePolicyPageContent,
    };
  }


export default function CookiePolicyPageComponent() {

    const { 
        cookiePolicyPageContent
    } = useLoaderData();

  return (
    <Layouts.MainNavFooter>
       <CookiePolicyPage content={cookiePolicyPageContent} />
    </Layouts.MainNavFooter>
  );
}

