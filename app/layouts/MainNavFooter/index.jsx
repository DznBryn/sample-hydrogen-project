import SliderAccount, {
  links as sliderAccountStyles,
} from '~/modules/sliderAccount';
import NavPlaceholder, {
  links as NavPlaceholderStyles,
} from '~/modules/navPlaceholder';
import {getCMSDoc} from '~/utils/functions/eventFunctions';
import SliderCart, {links as sliderCartStyles} from '~/modules/sliderCart';
import BodyBottom, {links as BodyBottomStyles} from '~/modules/bodyBottom';
import MainNav, {links as mainNavStyles} from '~/modules/mainNav';
import Footer, {links as footerStyles} from '~/modules/footer';
import {useMatches} from '@remix-run/react';
import {useCollection} from '~/hooks/useCollection';

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
  const {mainNavFooterCMSData} = root.data;

  const {
    Footers,
    EmailSmsSignupContent,
    CartPageConfig,
    AnnouncementHeaders,
    MobileNavbar,
    HeaderConfig,
    MobileNavFooterMainButton,
    AnnouncementTopBanner,
    SiteWideSettings,
    SearchConfig,
    ProductRecommendation,
  } = mainNavFooterCMSData;

  /* TODO: Remove products property from sliderCart and remove this custom hook */
  const {products: allCollection, state} = useCollection('all');

  return (
    <>
      <NavPlaceholder
        siteWideSettings={
          getCMSDoc(SiteWideSettings, 'SiteWideSettings')
            ?.activeSitewideSettings
        }
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
      />

      {/* TODO: Remove products property from sliderCart */}
      {state === 'loaded' && (
        <SliderCart
          cartConfig={getCMSDoc(CartPageConfig, 'DefaultCart')}
          recommendations={ProductRecommendation}
          products={{products: allCollection}}
        />
      )}

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
