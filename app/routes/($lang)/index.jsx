import { useLoaderData } from '@remix-run/react';
import { getGroupOfCMSContent } from '~/utils/functions/eventFunctions';
import { getCollectionProducts } from '~/utils/graphql/shopify/queries/collections';
import Layouts, { links as layoutsStyles } from '~/layouts';
import Homepage, { links as homePageStyles } from '~/modules/homepage';

import { GET_FOOTERS, GET_EMAIL_SMS_SIGNUP_CONTENT, GET_CART_PAGE_CONFIG, GET_ANNOUNCEMENT_HEADER, GET_ANNOUNCEMENT_MESSAGES, GET_MOBILE_NAV_BAR, GET_HEADER_CONFIG, GET_MOBILE_NAV_FOOTER_MAIN_BUTTON, GET_ANNOUNCEMENT_TOP_BANNER, GET_SITE_WIDE_SETTINGS, GET_SEARCH_CONFIG } from '~/utils/graphql/sanity/queries';

export const links = () => {
  return [
    ...homePageStyles(),
    ...layoutsStyles().mainNavFooterStyles,
  ];
};

export const loader = async ({context}) => {

  const queries = [
    GET_FOOTERS, 
    GET_EMAIL_SMS_SIGNUP_CONTENT, 
    GET_CART_PAGE_CONFIG, 
    GET_ANNOUNCEMENT_HEADER, 
    GET_ANNOUNCEMENT_MESSAGES, 
    GET_MOBILE_NAV_BAR, 
    GET_HEADER_CONFIG, 
    GET_MOBILE_NAV_FOOTER_MAIN_BUTTON, 
    GET_ANNOUNCEMENT_TOP_BANNER, 
    GET_SITE_WIDE_SETTINGS, 
    GET_SEARCH_CONFIG
  ];
  
  const contents = await getGroupOfCMSContent(context, queries);
  const collection = await getCollectionProducts(context, 'all');
  
  return {
    ...contents,
    collection
  };

};

export default function Index() {

  const { 
    Footers, 
    EmailSmsSignupContent, 
    CartPageConfig, 
    AnnouncementHeaders,
    AnnouncementMessages,
    MobileNavbar,
    HeaderConfig,
    MobileNavFooterMainButton,
    AnnouncementTopBanner,
    SiteWideSettings,
    SearchConfig,
    Collection, 
  } = useLoaderData();

  return (
    <Layouts.MainNavFooter 
      footers={Footers} 
      productsList={Collection} 
      emailSmsSignupContent={EmailSmsSignupContent}
      cartConfig={CartPageConfig}
      announcementHeader={AnnouncementHeaders}
      announcementMessages={AnnouncementMessages}
      mobileNavBar={MobileNavbar}
      mobileOverlayNav={HeaderConfig}
      mobileNavMainButton={MobileNavFooterMainButton}
      annoucementTopBannerContent={AnnouncementTopBanner}
      desktopHeaderNav={HeaderConfig}
      siteWideSettings={SiteWideSettings}
      searchConfig={SearchConfig}
    >
      <Homepage/>
    </Layouts.MainNavFooter>
  );
}