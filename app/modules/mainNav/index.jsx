import {useRef, useEffect} from 'react';
import {createCustomEvent} from '~/utils/functions/eventFunctions';
import DesktopNavItem, {
  links as desktopNavItemStyles,
} from '~/modules/mainNav/desktopNavItem';
import HeaderIcons, {
  links as headerIconsStyles,
} from '~/modules/mainNav/headerIcons';
import HeaderLogo, {
  links as headerLogoStyles,
} from '~/modules/mainNav/headerLogo';
import NavTopHeader, {
  links as navTopHeaderStyles,
} from '~/modules/mainNav/navTopHeader';
import MobileNavbar, {
  links as mobileNavbarStyles,
} from '~/modules/mainNav/mobileNavbar';
import MainNavMobileOverlay, {
  links as mainNavMobileOverlayStyles,
} from '~/modules/mainNav/mainNavMobileOverlay';
import PromoOfferBar, {
  links as promoOfferBarStyles,
} from '~/modules/mainNav/promoOfferBar';
import IconSearch, {
  links as iconSearchStyles,
} from '~/modules/mainNav/iconSearch';
import CountdownTimerBar, {
  links as countdownTimerBarStyles,
} from '~/modules/mainNav/countdownTimerBar';
import AnnouncementTopBanner, {
  links as announcementTopBannerStyles,
} from '~/modules/mainNav/announcementTopBanner';

import styles from './styles.css';

export const links = () => {
  return [
    {rel: 'stylesheet', href: styles},
    ...desktopNavItemStyles(),
    ...headerIconsStyles(),
    ...headerLogoStyles(),
    ...navTopHeaderStyles(),
    ...mobileNavbarStyles(),
    ...mainNavMobileOverlayStyles(),
    ...promoOfferBarStyles(),
    ...iconSearchStyles(),
    ...countdownTimerBarStyles(),
    ...announcementTopBannerStyles(),
  ];
};

const MainNav = ({
  desktopHeaderNav,
  mobileOverlayNav,
  mobileNavbar,
  announcementHeader,
  announcementMessages,
  cartConfig,
  searchConfig,
  promoContent,
  mobileNavMainButton,
  products,
  annoucementTopBannerContent,
}) => {
  const mainContainer = useRef(null);
  const {
    enableCountdownTimerPromo,
    countdownTimerPromoESTDeadlineDate,
    countdownTimerPromoESTDeadlineHour,
    countdownTimerPromoCopy,
    countdownTimerPromoBannerColor,
  } = cartConfig;

  const handleClick = (e) => {
    const dataEvent = createCustomEvent();
    if (
      document
        .querySelector('[data-visible-state]')
        .getAttribute('data-visible-state') === 'show'
    ) {
      e.currentTarget.parentElement.classList.remove('menuOverlayOpened');
      document.querySelector('body').classList.remove('bodyWrap');
      document
        .querySelector('[data-visible-state]')
        .setAttribute('data-visible-state', 'hide');
      document.querySelector('[data-visible-state]').dispatchEvent(dataEvent);
      mainContainer.current.style.zIndex = '10000';
    } else {
      e.currentTarget.parentElement.classList.add('menuOverlayOpened');
      document.querySelector('body').classList.add('bodyWrap');
      document
        .querySelector('[data-visible-state]')
        .setAttribute('data-visible-state', 'show');
      document.querySelector('[data-visible-state]').dispatchEvent(dataEvent);
      mainContainer.current.style.zIndex = '2147483001';
    }
  };

  useEffect(() => {
    if (document) {
      const anchor = document.querySelectorAll('a');
      anchor.forEach((el) => (el.target = '_self'));
    }
  }, []);

  return (
    <section className={'mainNav'} ref={mainContainer}>
      <div id="promoBannersWrap" className={'promoBannersWrap'}>
        <PromoOfferBar content={promoContent} />
        <CountdownTimerBar
          enable={enableCountdownTimerPromo}
          copy={countdownTimerPromoCopy}
          bgColor={countdownTimerPromoBannerColor}
          deadline={{
            date: countdownTimerPromoESTDeadlineDate,
            hour: countdownTimerPromoESTDeadlineHour,
          }}
        />
        <AnnouncementTopBanner content={annoucementTopBannerContent} />
      </div>
      <div className={'mainNavWrap mainNav'}>
        <div className={'relativeNav'}>
          <NavTopHeader
            announcementHeader={announcementHeader}
            announcementMessages={announcementMessages}
          />

          <div className={'navItemsWrap'}>
            <div className={'menu'}>
              <div
                className={'hamburgerWrapper'}
                id="nav_click_hamburger"
                onClick={handleClick}
              >
                <HamburguerIcon />
                <div className={'closeBtn'}>+</div>
              </div>
              <IconSearch />
            </div>
            <div className={'headerWrapper'}>
              <HeaderLogo />
            </div>
            <div id="nav_click_desktop_t1" className={'navItemsContainer'}>
              {desktopHeaderNav?.headerNavItems?.map((navItem, index) => (
                <DesktopNavItem
                  key={index}
                  navItem={navItem}
                  itemId={`${index}-${navItem.displayText
                    .replace(' ', '-')
                    .toLowerCase()}`}
                />
              ))}
            </div>
            <HeaderIcons
              cartConfig={cartConfig}
              searchConfig={searchConfig}
              products={products}
            />
          </div>
        </div>
      </div>

      <MobileNavbar content={mobileNavbar} />

      <MainNavMobileOverlay
        mobileOverlayItems={mobileOverlayNav?.headerNavItems}
        mobileNavMainButton={mobileNavMainButton}
      />
    </section>
  );
};

const HamburguerIcon = () => (
  <svg
    width={21}
    height={16}
    viewBox="0 0 17 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1={0.75}
      y1={1.25}
      x2={15.75}
      y2={1.25}
      stroke="#4C4E56"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1={0.75}
      y1={11.25}
      x2={15.75}
      y2={11.25}
      stroke="#4C4E56"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1={0.75}
      y1={6.25}
      x2={15.75}
      y2={6.25}
      stroke="#4C4E56"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default MainNav;
