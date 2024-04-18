import Layouts from '~/layouts';
import {getCMSContent} from '~/utils/functions/eventFunctions';
import {GET_TULA_SCHOLARSHIP_PAGE} from '~/utils/graphql/sanity/queries';
import {useLoaderData} from '@remix-run/react';

import TulaScholarshipPage, {
  links as tulaScholarshipPageStyles,
} from '~/modules/tulaScholarshipPage';

export const links = () => tulaScholarshipPageStyles();

export const meta = () => [
  {title: 'TULA Medical School Scholarship Program'},
  {
    name: 'description',
    content:
      'As a brand that’s based on science, skin health & wellness from the inside out, plus that is founded by a practicing internal medicine doctor who is also a woman of color, we’re committed to furthering advances in medical research, health care & health care & health equality',
  },
];

export async function loader({context}) {
  const tulaScholarshipPageContent = await getCMSContent(
    context,
    GET_TULA_SCHOLARSHIP_PAGE,
  );

  return {
    tulaScholarshipPageContent,
  };
}

export default function TulaScholarshipPageComponent() {
  const {tulaScholarshipPageContent} = useLoaderData();

  return (
    <Layouts.MainNavFooter>
      <TulaScholarshipPage content={tulaScholarshipPageContent} />
    </Layouts.MainNavFooter>
  );
}
