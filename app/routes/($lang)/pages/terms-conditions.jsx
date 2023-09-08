import Layouts from '~/layouts';
import { getCMSContent } from '~/utils/functions/eventFunctions';
import { GET_TERMS_CONDITIONS_PAGE } from '~/utils/graphql/sanity/queries';
import { useLoaderData } from '@remix-run/react';

import TermsCondition, { links as termsConditionPageStyles } from '~/modules/termsConditionsPage';

export const links = () => termsConditionPageStyles();

export async function loader({context}) {

    const termsConditionsContent = await getCMSContent(context, GET_TERMS_CONDITIONS_PAGE);
  
    return {
        termsConditionsContent,
    }
  }


export default function TermsConditionPageComponent() {

    const { 
        termsConditionsContent
    } = useLoaderData();

  return (
    <Layouts.MainNavFooter>
       <TermsCondition content={termsConditionsContent} />
    </Layouts.MainNavFooter>
  );
}

