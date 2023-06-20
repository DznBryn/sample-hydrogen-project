import { useLoaderData } from '@remix-run/react';
import { getCMSContent } from '~/utils/functions/eventFunctions';
import { getCollectionProducts } from '~/utils/graphql/shopify/queries/collections';
import Layouts, { links as layoutsStyles } from '~/layouts';
import Homepage, { links as homePageStyles } from '~/modules/homepage';

import { GET_FOOTERS, GET_EMAIL_SMS_SIGNUP_CONTENT, GET_CART_PAGE_CONFIG, GET_ANNOUNCEMENT_HEADER, GET_ANNOUNCEMENT_MESSAGES, GET_MOBILE_NAV_BAR, GET_HEADER_CONFIG, GET_MOBILE_NAV_FOOTER_MAIN_BUTTON, GET_ANNOUNCEMENT_TOP_BANNER, GET_SITE_WIDE_SETTINGS, GET_SEARCH_CONFIG } from '~/utils/graphql/sanity/queries';
import { recoverPassword } from '~/utils/graphql/shopify/mutations/customer';
import { json } from '@shopify/remix-oxygen';

export const links = () => {
  return [
    ...homePageStyles(),
    ...layoutsStyles().mainNavFooterStyles,
  ];
};

export const action = async ({ request, context }) => {

  const [formData] = await Promise.all([
    request.formData(),
  ]);

  if (formData.get('forgotEmail') && (formData.get('forgotEmail') !== '' || typeof formData.get('forgotEmail') !== 'string')) {
    const email = formData.get('forgotEmail');
    const result = await recoverPassword(email, context);

    if (result?.customerRecover?.customerUserErrors?.length) {
      return json({ message: result?.customerRecover?.customerUserErrors[0]?.message, status: 400 });
    }
    return json({ message: 'Success', status: 200 });
  } else {
    return json({ message: 'Email is required.', status: 400 });
  }


};
export const loader = async ({ context }) => {

  const collection = await getCollectionProducts(context, 'all');

  const footers = await getCMSContent(context, GET_FOOTERS);
  const emailSmsSignupContent = await getCMSContent(context, GET_EMAIL_SMS_SIGNUP_CONTENT);
  const cartPageConfig = await getCMSContent(context, GET_CART_PAGE_CONFIG);
  const announcementHeader = await getCMSContent(context, GET_ANNOUNCEMENT_HEADER);
  const announcementMessages = await getCMSContent(context, GET_ANNOUNCEMENT_MESSAGES);
  const mobileNavBar = await getCMSContent(context, GET_MOBILE_NAV_BAR);
  const headerConfig = await getCMSContent(context, GET_HEADER_CONFIG);
  const mobileNavFooterMainButton = await getCMSContent(context, GET_MOBILE_NAV_FOOTER_MAIN_BUTTON);
  const annoucementTopBanner = await getCMSContent(context, GET_ANNOUNCEMENT_TOP_BANNER);
  const siteWideSettings = await getCMSContent(context, GET_SITE_WIDE_SETTINGS);
  const searchConfig = await getCMSContent(context, GET_SEARCH_CONFIG);

  return {
    collection,
    footers,
    emailSmsSignupContent,
    cartPageConfig,
    announcementHeader,
    announcementMessages,
    mobileNavBar,
    headerConfig,
    mobileNavFooterMainButton,
    annoucementTopBanner,
    siteWideSettings,
    searchConfig,
  };

};

export default function Index() {

  const {
    footers,
    collection,
    emailSmsSignupContent,
    cartPageConfig,
    announcementHeader,
    announcementMessages,
    mobileNavBar,
    headerConfig,
    mobileNavFooterMainButton,
    annoucementTopBanner,
    siteWideSettings,
    searchConfig,
  } = useLoaderData();

  return (
    <Layouts.MainNavFooter
      footers={footers}
      productsList={collection}
      emailSmsSignupContent={emailSmsSignupContent}
      cartConfig={cartPageConfig}
      announcementHeader={announcementHeader}
      announcementMessages={announcementMessages}
      mobileNavBar={mobileNavBar}
      mobileOverlayNav={headerConfig}
      mobileNavMainButton={mobileNavFooterMainButton}
      annoucementTopBannerContent={annoucementTopBanner}
      desktopHeaderNav={headerConfig}
      siteWideSettings={siteWideSettings}
      searchConfig={searchConfig}
    >
      <Homepage />
    </Layouts.MainNavFooter>
  );
}