import Layouts from '~/layouts';
import { getCMSContent } from '~/utils/functions/eventFunctions';
import { GET_TULA_SCHOLARSHIP_PAGE } from '~/utils/graphql/sanity/queries';
import { useLoaderData } from '@remix-run/react';

import TulaScholarshipPage, { links as tulaScholarshipPageStyles } from '~/modules/tulaScholarshipPage';

export const links = () => tulaScholarshipPageStyles();

export async function loader({context}) {

    const tulaScholarshipPageContent = await getCMSContent(context, GET_TULA_SCHOLARSHIP_PAGE);
  
    return {
        tulaScholarshipPageContent,
    }
  }


export default function TulaScholarshipPageComponent() {

    const { 
        tulaScholarshipPageContent
    } = useLoaderData();

  return (
    <Layouts.MainNavFooter>
       <TulaScholarshipPage content={tulaScholarshipPageContent} />
    </Layouts.MainNavFooter>
  );
}

