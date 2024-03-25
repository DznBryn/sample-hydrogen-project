import Layouts from '~/layouts';
import {getCMSContent} from '~/utils/functions/eventFunctions';
import {GET_PRIVACY_POLICY_PAGE} from '~/utils/graphql/sanity/queries';
import {useLoaderData} from '@remix-run/react';

import PrivacyPolicyPage, {
  links as privacyPolicyPageStyles,
} from '~/modules/privacyPolicyPage';

export const links = () => privacyPolicyPageStyles();

export const meta = () => [
  {title: 'Privacy Policy'},
  {
    name: 'description',
    content:
      'Tula Privacy Policy This Privacy Policy describes how Tula Life, Inc. and any of its subsidiaries and affiliates (“Tula,” “we,” “us,” and/or “our”) handle personal data we collect online (e.g., through our websites) and offline (e.g., through customer support channels, retail locations where our products are sold...',
  },
];

export async function loader({context}) {
  const privacyPolicyPageContent = await getCMSContent(
    context,
    GET_PRIVACY_POLICY_PAGE,
  );

  return {
    privacyPolicyPageContent,
  };
}

export default function PrivacyPolicyPageComponent() {
  const {privacyPolicyPageContent} = useLoaderData();

  return (
    <Layouts.MainNavFooter>
      <PrivacyPolicyPage content={privacyPolicyPageContent} />
    </Layouts.MainNavFooter>
  );
}
