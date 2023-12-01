import SliderAccount, {
  links as sliderAccountStyles,
} from '~/modules/sliderAccount';
import NavPlaceholder, {
  links as NavPlaceholderStyles,
} from '~/modules/navPlaceholder';
import {
  getCMSDoc,
  getCollectionWithCMSData,
} from '~/utils/functions/eventFunctions';
import SliderCart, {links as sliderCartStyles} from '~/modules/sliderCart';
import BodyBottom, {links as BodyBottomStyles} from '~/modules/bodyBottom';
import MainNav, {links as mainNavStyles} from '~/modules/mainNav';
import Footer, {links as footerStyles} from '~/modules/footer';
import {useMatches} from '@remix-run/react';
import {useMemo} from 'react';

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

const MainNavFooter = ({children}) => {
  const [root] = useMatches();
  const {mainNavFooterCMSData, productsCMSData} = root.data;

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
  } = mainNavFooterCMSData;

  const collectionWithCMSData = useMemo(
    () => getCollectionWithCMSData(collection, productsCMSData),
    [collection, productsCMSData],
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
        mobileNavMainButton={getCMSDoc(
          MobileNavFooterMainButton,
          'Main Button',
        )}
        annoucementTopBannerContent={getCMSDoc(
          AnnouncementTopBanner,
          'rose glow',
        )}
        desktopHeaderNav={getCMSDoc(HeaderConfig, 'Desktop Header Nav')}
        products={collectionWithCMSData}
      />
      <SliderCart
        cartConfig={getCMSDoc(CartPageConfig, 'DefaultCart')}
        products={collectionWithCMSData}
      />
      <SliderAccount />

      {children}

      <div
        className="footerContainer"
        style={{
          marginTop: 'auto',
        }}
      >
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
