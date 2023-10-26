import SliderAccount, { links as sliderAccountStyles } from '~/modules/sliderAccount';
import SliderCart, { links as sliderCartStyles } from '~/modules/sliderCart';
import MainNav, { links as mainNavStyles } from '~/modules/mainNav';
import Footer, { links as footerStyles } from '~/modules/footer';
import BodyBottom, { links as BodyBottomStyles } from '~/modules/bodyBottom';
import NavPlaceholder, { links as NavPlaceholderStyles } from '~/modules/navPlaceholder';
import { useMatches } from '@remix-run/react';
import { getGroupOfCMSContent, getCMSDoc, getCollectionWithCMSData } from '~/utils/functions/eventFunctions';
import { getCollectionProducts } from '~/utils/graphql/shopify/queries/collections';
import { GET_FOOTERS, GET_EMAIL_SMS_SIGNUP_CONTENT, GET_CART_PAGE_CONFIG, GET_ANNOUNCEMENT_HEADER, GET_MOBILE_NAV_BAR, GET_HEADER_CONFIG, GET_MOBILE_NAV_FOOTER_MAIN_BUTTON, GET_ANNOUNCEMENT_TOP_BANNER, GET_SITE_WIDE_SETTINGS, GET_SEARCH_CONFIG } from '~/utils/graphql/sanity/queries';
import { useMemo } from 'react';

export const links = () => {
  return [
    ...sliderAccountStyles(),
    ...sliderCartStyles(),
    ...BodyBottomStyles(),
    ...footerStyles(),
    ...mainNavStyles(),
    ...NavPlaceholderStyles(),
  ];
};

const MainNavFooter = ({ children }) => {

  const [root] = useMatches();
  const CMSData = root.data.globalCMSData.mainNavFooter;
  const productsCMSData = root.data.globalCMSData.products;

  const {
    Footers,
    EmailSmsSignupContent,
    CartPageConfig,
    AnnouncementHeaders,
    MobileNavbar,
    HeaderConfig,
    MobileNavFooterMainButton,
    AnnouncementTopBanner,
    // SiteWideSettings,
    SearchConfig,
    collection,
  } = CMSData;

  const collectionWithCMSData = useMemo(
    () => getCollectionWithCMSData(collection, productsCMSData),
    [collection, productsCMSData]
  );

  return (

    <>

      <NavPlaceholder
        // siteWideSettings={getCMSDoc(SiteWideSettings, 'Black Friday')}
        searchConfig={getCMSDoc(SearchConfig, 'Default')}
      />

      <MainNav
        cartConfig={getCMSDoc(CartPageConfig, 'DefaultCart')}
        announcementHeader={getCMSDoc(AnnouncementHeaders, 'Main Announcement')}
        mobileNavbar={getCMSDoc(MobileNavbar, 'Mobile')}
        mobileOverlayNav={getCMSDoc(HeaderConfig, 'Mobile Overlay Nav')}
        mobileNavMainButton={getCMSDoc(MobileNavFooterMainButton, 'Main Button')}
        annoucementTopBannerContent={getCMSDoc(AnnouncementTopBanner, 'rose glow')}
        desktopHeaderNav={getCMSDoc(HeaderConfig, 'Desktop Header Nav')}
        products={collectionWithCMSData}
      />
      <SliderCart
        cartConfig={getCMSDoc(CartPageConfig, 'DefaultCart')}
        products={collectionWithCMSData}
      />
      <SliderAccount />

      {children}

      <div className="footerContainer" style={{
        marginTop: 'auto',
      }}>
        <BodyBottom
          emailSmsSignupContent={getCMSDoc(EmailSmsSignupContent, 'Content')}
          productList={collectionWithCMSData}
        />

        <Footer
          desktopFooter={getCMSDoc(Footers, 'Desktop')}
          mobileFooter={getCMSDoc(Footers, 'Mobile')}
        />
      </div>

    </>

  );

};

export default MainNavFooter;

/**
 * add query here to get content on globalCMSData obj;
 */

export async function getMainNavFooterCMSData(context) {

  const queries = [
    GET_FOOTERS,
    GET_EMAIL_SMS_SIGNUP_CONTENT,
    GET_CART_PAGE_CONFIG,
    GET_ANNOUNCEMENT_HEADER,
    GET_MOBILE_NAV_BAR,
    GET_HEADER_CONFIG,
    GET_MOBILE_NAV_FOOTER_MAIN_BUTTON,
    GET_ANNOUNCEMENT_TOP_BANNER,
    GET_SITE_WIDE_SETTINGS,
    GET_SEARCH_CONFIG,
  ];

  const contents = await getGroupOfCMSContent(context, queries);
  const collection = await getCollectionProducts(context, 'all');

  return {
    ...contents,
    collection
  };

}