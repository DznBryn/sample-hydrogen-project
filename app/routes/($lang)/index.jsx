import { useMatches } from '@remix-run/react';
import Layouts, { links as layoutsStyles } from '~/layouts';
import Homepage, { links as homePageStyles } from '~/modules/homepage';

export const links = () => {
  return [
    ...homePageStyles(),
    ...layoutsStyles().mainNavFooterStyles,
  ];
};

export default function Index() {

  const [root] = useMatches();
  const CMSData = root.data.globalCMSData.mainNavFooter;

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
    collection, 
  } = CMSData;

  return (
    <Layouts.MainNavFooter 
      footers={Footers} 
      productsList={collection} 
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