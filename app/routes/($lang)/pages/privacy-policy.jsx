import Layouts from '~/layouts';
import { getCMSContent } from '~/utils/functions/eventFunctions';
import { GET_PRIVACY_POLICY_PAGE } from '~/utils/graphql/sanity/queries';
import { useLoaderData } from '@remix-run/react';

import PrivacyPolicyPage, { links as privacyPolicyPageStyles } from '~/modules/privacyPolicyPage';

export const links = () => privacyPolicyPageStyles();

export async function loader({context}) {

    const privacyPolicyPageContent = await getCMSContent(context, GET_PRIVACY_POLICY_PAGE);
  
    return {
        privacyPolicyPageContent,
    };
  }


export default function PrivacyPolicyPageComponent() {

    const { 
        privacyPolicyPageContent
    } = useLoaderData();

  return (
    <Layouts.MainNavFooter>
       <PrivacyPolicyPage content={privacyPolicyPageContent} />
    </Layouts.MainNavFooter>
  );
}

