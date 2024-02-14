import Layouts from '~/layouts';
import {getCMSContent} from '~/utils/functions/eventFunctions';
import {GET_TERMS_CONDITIONS_PAGE} from '~/utils/graphql/sanity/queries';
import {useLoaderData} from '@remix-run/react';

import TermsCondition, {
  links as termsConditionPageStyles,
} from '~/modules/termsConditionsPage';

export const links = () => termsConditionPageStyles();

export const meta = () => [
  {title: 'Terms & Conditions'},
  {
    description: 'TULA Terms & Conditions Welcome to Tula.com and our affiliated sites (collectively, the “Site”). Tula Life, Inc. (“TULA”, “we”, “us” or “our”) provides the content and services available on the Site to you subject to the following Terms and Conditions, our Privacy Policy and other terms, policies and guidelines which...',
  },
];

export async function loader({context}) {
  const termsConditionsContent = await getCMSContent(
    context,
    GET_TERMS_CONDITIONS_PAGE,
  );

  return {
    termsConditionsContent,
  };
}

export default function TermsConditionPageComponent() {
  const {termsConditionsContent} = useLoaderData();

  return (
    <Layouts.MainNavFooter>
      <TermsCondition content={termsConditionsContent} />
    </Layouts.MainNavFooter>
  );
}
