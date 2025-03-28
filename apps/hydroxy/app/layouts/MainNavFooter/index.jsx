const SliderAccount = lazy(() => import('~/modules/sliderAccount'));
import {links as sliderAccountStyles} from '~/modules/sliderAccount';
const ShadeFinderSlider = lazy(() => import('~/modules/pdp/shadeFinderSlider'));
const ConcealerSlider = lazy(() => import('~/modules/pdp/concealerSlider'));
import {links as shadeFinderSliderStyles} from '~/modules/pdp/shadeFinderSlider';
import {links as concealerSliderStyles} from '~/modules/pdp/concealerSlider';

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
import PreviewModeWaterMark, {
  links as PreviewModeWaterMarkStyles,
} from '~/modules/previewModeWaterMark';
// import OneTrustScripts, {CookieScripts} from '~/utils/services/customerPrivacy';

export const links = () => {
  return [
    ...sliderAccountStyles(),
    ...shadeFinderSliderStyles(),
    ...concealerSliderStyles(),
    ...sliderCartStyles(),
    ...BodyBottomStyles(),
    ...footerStyles(),
    ...mainNavStyles(),
    ...NavPlaceholderStyles(),
    ...PreviewModeWaterMarkStyles(),
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
    previewMode,
  } = root.data;

  /* TODO: Remove products property from sliderCart and remove this custom hook */
  const {products: allCollection, state} = useCollection('all');

  return (
    <>
      {previewMode && <PreviewModeWaterMark />}

      <NavPlaceholder
        siteWideSettings={
          getCMSDoc(mainNavFooterCMSData?.SiteWideSettings, 'SiteWideSettings')
            ?.activeSitewideSettings
        }
        searchConfig={searchConfig}
      />

      <MainNav
        cartConfig={cartPageConfig}
        announcementHeader={getCMSDoc(
          mainNavFooterCMSData?.AnnouncementHeaders,
          'Main Announcement',
        )}
        mobileNavbar={getCMSDoc(mainNavFooterCMSData?.MobileNavbar, 'Mobile')}
        mobileOverlayNav={getCMSDoc(
          mainNavFooterCMSData?.HeaderConfig,
          'Mobile Overlay Nav',
        )}
        mobileNavMainButton={mobileNavFooterMainButton}
        annoucementTopBannerContent={announcementTopBanner}
        desktopHeaderNav={getCMSDoc(
          mainNavFooterCMSData?.HeaderConfig,
          'Desktop Header Nav',
        )}
        promoContent={mainNavFooterCMSData?.GlobalPromoBar}
      />

      {/* TODO: Remove products property from sliderCart */}
      {state === 'loaded' && (
        <Suspense>
          <Await resolve={cartPageConfig}>
            {(CartPageConfigSolved) => (
              <SliderCart
                cartConfig={getCMSDoc(CartPageConfigSolved, 'DefaultCart')}
                recommendations={mainNavFooterCMSData?.ProductRecommendation}
                products={{products: allCollection}}
              />
            )}
          </Await>
        </Suspense>
      )}

      <Suspense>
        <SliderAccount />
      </Suspense>
      <Suspense>
        <ShadeFinderSlider />
      </Suspense>
      <Suspense>
        <ConcealerSlider />
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
