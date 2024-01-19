const SliderAccount = lazy(() => import('~/modules/sliderAccount'));
import {links as sliderAccountStyles} from '~/modules/sliderAccount';
import NavPlaceholder, {
  links as NavPlaceholderStyles,
} from '~/modules/navPlaceholder';
import {getCMSDoc} from '~/utils/functions/eventFunctions';
const SliderCart = lazy(() => import('~/modules/sliderCart'));
import {links as sliderCartStyles} from '~/modules/sliderCart';
const BodyBottom = lazy(() => import('~/modules/bodyBottom'));
import {links as BodyBottomStyles} from '~/modules/bodyBottom';
import MainNav, {links as mainNavStyles} from '~/modules/mainNav';
const Footer = lazy(() => import('~/modules/footer'));
import {links as footerStyles} from '~/modules/footer';
import {Await, useMatches} from '@remix-run/react';
import {useCollection} from '~/hooks/useCollection';
import {Suspense, lazy} from 'react';

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
  const {
    mainNavFooterCMSData,
    footers,
    emailSmsSignupContent,
    cartPageConfig,
    mobileNavFooterMainButton,
    announcementTopBanner,
    searchConfig,
  } = root.data;

  const {
    AnnouncementHeaders,
    MobileNavbar,
    HeaderConfig,
    SiteWideSettings,
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
        searchConfig={searchConfig}
      />

      <MainNav
        cartConfig={cartPageConfig}
        announcementHeader={getCMSDoc(AnnouncementHeaders, 'Main Announcement')}
        mobileNavbar={getCMSDoc(MobileNavbar, 'Mobile')}
        mobileOverlayNav={getCMSDoc(HeaderConfig, 'Mobile Overlay Nav')}
        mobileNavMainButton={mobileNavFooterMainButton}
        annoucementTopBannerContent={announcementTopBanner}
        desktopHeaderNav={getCMSDoc(HeaderConfig, 'Desktop Header Nav')}
      />

      {/* TODO: Remove products property from sliderCart */}
      {state === 'loaded' && (
        <Suspense>
          <Await resolve={cartPageConfig}>
            {(CartPageConfigSolved) => (
              <SliderCart
                cartConfig={getCMSDoc(CartPageConfigSolved, 'DefaultCart')}
                recommendations={ProductRecommendation}
                products={{products: allCollection}}
              />
            )}
          </Await>
        </Suspense>
      )}

      <Suspense>
        <SliderAccount />
      </Suspense>

      {children}

      <div
        className="footerContainer"
        style={{
          marginTop: 'auto',
        }}
      >
        <Suspense>
          <Await resolve={emailSmsSignupContent}>
            {(EmailSmsSignupContentSolved) => (
              <BodyBottom
                emailSmsSignupContent={getCMSDoc(
                  EmailSmsSignupContentSolved,
                  'Content',
                )}
              />
            )}
          </Await>
        </Suspense>

        <Suspense>
          <Await resolve={footers}>
            {(FootersSolved) => (
              <Footer
                desktopFooter={getCMSDoc(FootersSolved, 'Desktop')}
                mobileFooter={getCMSDoc(FootersSolved, 'Mobile')}
              />
            )}
          </Await>
        </Suspense>
      </div>
    </>
  );
};

export default MainNavFooter;
