import Layouts from '~/layouts';

import {getCMSContent} from '~/utils/functions/eventFunctions';
import {GET_CONTACT_US} from '~/utils/graphql/sanity/queries';
import {useLoaderData} from '@remix-run/react';

import ContactUs, {links as contactUsStyles} from '~/modules/contactUs';

export const links = () => contactUsStyles();

export const meta = () => [
  {title: 'Contact Us | TULA Skincare'},
  {
    description: 'Tula Probiotics Skincare - We\'d love to hear from you - Contact Us - Tula Skincare Products',
  },
];

export async function loader({context}) {
  const contactUsContent = await getCMSContent(context, GET_CONTACT_US);

  return {
    contactUsContent,
  };
}

export default function ContactUsComponent() {
  const {contactUsContent} = useLoaderData();

  return (
    <Layouts.MainNavFooter>
      <ContactUs content={contactUsContent} />
    </Layouts.MainNavFooter>
  );
}
