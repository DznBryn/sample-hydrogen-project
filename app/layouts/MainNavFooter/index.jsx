import { getCMSDoc } from '~/utils/functions/eventFunctions';
import SliderAccount, { links as sliderAccountStyles} from '~/modules/sliderAccount';
import MainNav, { links as mainNavStyles } from '~/modules/mainNav';
import Footer, { links as footerStyles } from '~/modules/footer';
import BodyBottom, { links as BodyBottomStyles } from '~/modules/bodyBottom';
import NavPlaceholder, { links as NavPlaceholderStyles } from '~/modules/navPlaceholder';

export const links = () => {
  return [
    ...sliderAccountStyles(),
    ...BodyBottomStyles(),
    ...footerStyles(),
    ...mainNavStyles(),
    ...NavPlaceholderStyles(),
  ];
};

const MainNavFooter = ({ 
  children, 
  footers, 
  productsList, 
  emailSmsSignupContent,
  cartConfig,
  announcementHeader,
  announcementMessages,
  mobileNavBar,
  mobileOverlayNav,
  mobileNavMainButton,
  annoucementTopBannerContent,
  desktopHeaderNav,
  siteWideSettings,
  searchConfig,
}) => {

  //getting specific docs
  const desktopFooterData = getCMSDoc(footers, 'Desktop');
  const mobileFooterData = getCMSDoc(footers, 'Mobile');
  const emailSmsSignupData = getCMSDoc(emailSmsSignupContent, 'Content');
  const cartConfigData = getCMSDoc(cartConfig, 'DefaultCart');
  const announcementHeaderData = getCMSDoc(announcementHeader, 'Main Announcement');
  const mobileNavbarData = getCMSDoc(mobileNavBar, 'Mobile');
  const mobileOverlayNavData = getCMSDoc(mobileOverlayNav, 'Mobile Overlay Nav');
  const mobileNavMainButtonData = getCMSDoc(mobileNavMainButton, 'Main Button');
  const annoucementTopBannerContentData = getCMSDoc(annoucementTopBannerContent, 'rose glow');
  const desktopHeaderNavData = getCMSDoc(desktopHeaderNav, 'Desktop Header Nav');
  const siteWideSettingsData = getCMSDoc(siteWideSettings, 'Black Friday');
  const searchConfigData = getCMSDoc(searchConfig, 'Default');

  //getting all the docs
  const announcementMessagesData = announcementMessages;

  return (

    <>
      <NavPlaceholder siteWideSettings={siteWideSettingsData} searchConfig={searchConfigData}/>
      <MainNav 
        cartConfig={cartConfigData} 
        announcementHeader={announcementHeaderData} 
        announcementMessages={announcementMessagesData}
        mobileNavbar={mobileNavbarData}
        mobileOverlayNav={mobileOverlayNavData}
        mobileNavMainButton={mobileNavMainButtonData}
        annoucementTopBannerContent={annoucementTopBannerContentData}
        desktopHeaderNav={desktopHeaderNavData}
        products={productsList}
      />
      <h3>SliderCart</h3>
      <SliderAccount/>
      {
        children
      }
      <BodyBottom emailSmsSignupContent={emailSmsSignupData} productList={productsList}/>
      <Footer desktopFooter={desktopFooterData} mobileFooter={mobileFooterData}/>
    </>
    
  );

};

export default MainNavFooter;