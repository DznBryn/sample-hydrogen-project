import { useEffect, useRef } from 'react';
import { Link } from '@remix-run/react';
import getApiKeys from '~/utils/functions/getApiKeys';
import { bindCustomEvent, createCustomEvent, triggerAnalyticsLoyaltyEvents } from '~/utils/functions/eventFunctions';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const MainNavMobileOverlay = ({ mobileOverlayItems, mobileNavMainButton }) => {

  const overlayRef = useRef(null);
  const overlayItems = mobileOverlayItems;

  useEffect(() => {

    bindCustomEvent(overlayRef, 'data-visible-state', { hidden: 'hidden', visible: 'visible' });

  }, []);

  return (

    <div className={'overlayWrap hidden'} id="mobileOverlayWrapper" data-visible-state="hidden" ref={overlayRef}>

      <Navigation overlayItems={overlayItems} />

      <FooterButtons />

      <Link reloadDocument to={mobileNavMainButton.linkURL} id={'footer'} onClick={() => { (getApiKeys().FEATURE_FLAGS.LOYALTY) && triggerAnalyticsLoyaltyEvents('LearnMoreBtnClick', { source: 'mobileBanner' }); }} style={((getApiKeys().FEATURE_FLAGS.LOYALTY)) ? { backgroundImage: 'url(' + mobileNavMainButton.imageBackground.asset.url + ')' } : {}}>

        <div className={['content', ((getApiKeys().FEATURE_FLAGS.LOYALTY) ? 'whiteColor' : '')].join(' ')} onClick={handleClickOnLink}>
          <p className={(getApiKeys().FEATURE_FLAGS.LOYALTY) && 'whiteColor'}>{mobileNavMainButton.header}</p>
          {mobileNavMainButton.contentText}
        </div>

        {(getApiKeys().FEATURE_FLAGS.LOYALTY) ? icons['round_arrow'] : icons['arrow']}

      </Link>

    </div>

  );

};

const Navigation = ({ overlayItems }) => {

  let optionOffsetHeight;

  function handleClickOnOption(e) {

    const menuOption = e.currentTarget.parentNode;
    const icon = menuOption.querySelector('.navIcon');
    const subItems = menuOption.querySelector('.navGroupItems');
    const isItOpen = menuOption.classList.contains('active');

    if (menuOption) {

      optionOffsetHeight = optionOffsetHeight || menuOption.offsetHeight;

      const heightToGo = ((isItOpen) ? optionOffsetHeight : optionOffsetHeight + subItems.offsetHeight) + 'px';
      const iconToShow = (isItOpen) ? '+' : '–';

      menuOption.classList[(isItOpen) ? 'remove' : 'add']('active');
      menuOption.style.height = heightToGo;
      icon.textContent = iconToShow;

    }

  }

  const LinkButton = ({ navItem, idx }) => (

    <Link reloadDocument to={navItem.linkUrl} style={{ zIndex: idx.toString() }}>
      <div className={'navItem nav_click_hamburger_t1'} onClick={handleClickOnLink}>
        <ButtonLabel navItem={navItem} />
      </div>
    </Link>

  );

  const ButtonwithSubMenu = ({ navItem, idx }) => (

    <div className={'navItem nav_click_hamburger_t1'} style={{ zIndex: idx.toString() }}>
      <div onClick={handleClickOnOption}>
        <ButtonLabel navItem={navItem} />
        <span className={'navIcon'}>+</span>
      </div>
      <SubItems navItem={navItem} />
    </div>

  );

  const SubItems = ({ navItem }) => (

    <div className={'navGroupItems'}>

      {
        navItem.dropdownOverlay?.overlayNavLinks.map((navLink) => (

          <Link reloadDocument to={navLink.url} key={navLink.displayText}>
            <div className={'navGroupItem nav_click_hamburger_t2'} onClick={handleClickOnLink}>
              {navLink.displayText}
              {navLink.calloutText && <span className={'callout'} style={{ color: (navLink?.calloutFontColorHex) ? navLink?.calloutFontColorHex : '' }}>{navLink.calloutText}</span>}
            </div>
          </Link>

        ))
      }

    </div>

  );

  const ButtonLabel = ({ navItem }) => (

    <span className={'groupHeader'} style={{ color: (navItem?.fontColorHex) ? navItem?.fontColorHex : undefined }}>
      {navItem.emoji && <img className={'emoji'} src={navItem.emoji.src} />}
      {navItem.displayText}
    </span>

  );

  return (

    <div className={'overlayMenu'}>
      <div id={'header'}>
        <Link reloadDocument to={'/pages/skincare-finder'} onClick={handleClickOnLink}>
          <p>Take our skin quiz</p>
          find your perfect skin routine
        </Link>
      </div>
      {
        overlayItems?.map((navItem, idx) =>
          (navItem.linkUrl !== '' && navItem.linkUrl !== null) ?
            <LinkButton navItem={navItem} idx={idx} key={navItem.displayText} />
            : <ButtonwithSubMenu navItem={navItem} idx={idx} key={navItem.displayText} />)
      }
    </div>

  );

};

const FooterButtons = () => {

  const links = [
    { label: 'my account', icon: icons['person'], link: '/account', showIt: true, },
    { label: 'upload receipt to earn points', icon: icons['upload'], link: '/pages/upload-receipt', showIt: (getApiKeys().FEATURE_FLAGS.LOYALTY), onClick: () => triggerAnalyticsLoyaltyEvents('SubmitReceiptBtnClick', { source: 'hamburgerNav' }) },
    { label: 'returns & exchanges', icon: icons['flux'], link: getApiKeys().RETURNS_HREF, showIt: true, },
    { label: 'contact us', icon: icons['chat'], link: '/pages/contact-us', showIt: true, },
    { label: 'faq', icon: icons['question'], link: '/pages/faq', showIt: true, },
    { label: 'accessibility', icon: icons['accessibility'], link: '/pages/accessibility', showIt: true, },
  ];

  return (

    <div id={'extraLinkContainer'}>
      {
        links.map((data) => (
          (data.showIt) && (
            <Link reloadDocument to={data.link} className={'extraLink'} key={data.label}
              onClick={(data.onClick ? (() => { data.onClick(); handleClickOnLink(); }) : (handleClickOnLink))}>
              {data.icon}
              <span>{data.label}</span>
            </Link>
          )
        ))
      }
    </div>
  );

};

const handleClickOnLink = () => {
  const dataEvent = createCustomEvent();
  const activeOverlayClassName = 'styles_overlayActive__2BCiY';
  const containerElem = document.querySelector('#frontend-root');
  const menuElem = document.querySelector('.styles_menu__1eESF ');
  const menuWraper = document.querySelector('[data-visible-state]');
  const isActive = containerElem.classList.contains(activeOverlayClassName);

  if (isActive) containerElem.classList.remove(activeOverlayClassName);

  if (menuElem) menuElem.classList.remove('styles_opened__3TPmZ');
  menuWraper.setAttribute('data-visible-state', 'hide');
  menuWraper.dispatchEvent(dataEvent);
};

const icons = {
  'arrow': <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.89127 1.57816L12.9954 7.25803L7.89127 12.9379M1.32877 7.25803H12.9954H1.32877Z" stroke="#47C6D9" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>,
  'person': <svg width={11} height={15} viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.43 0C3.30994 0 1.57662 1.68314 1.57662 3.74175C1.57662 5.80039 3.30997 7.48781 5.43 7.48781C7.55006 7.48781 9.28856 5.79976 9.28856 3.74175C9.28856 1.6831 7.55015 0 5.43 0ZM5.43 1.49713C6.71664 1.49713 7.74602 2.49242 7.74602 3.74175C7.74602 4.99108 6.71671 5.99068 5.43 5.99068C4.14329 5.99068 3.11841 4.99118 3.11841 3.74175C3.11841 2.49231 4.1434 1.49713 5.43 1.49713ZM5.40759 8.2556C3.38079 8.2556 2.02552 8.63743 1.14434 9.36107C0.263206 10.0847 -0.00568278 11.1088 9.06297e-05 11.9875C0.00948759 13.5008 0.0123784 14.2469 0.0123784 14.2469H0.011656C0.0109332 14.4455 0.0911678 14.6364 0.235005 14.7782C0.379572 14.9193 0.575452 14.9993 0.780019 15H10.0338C10.239 14.9993 10.4349 14.92 10.5795 14.7782C10.7241 14.6371 10.8043 14.4462 10.8036 14.2469V12.0037V11.9658C10.7624 11.1144 10.5094 10.1093 9.6427 9.37923C8.77603 8.64926 7.43585 8.2562 5.40831 8.2562L5.40759 8.2556ZM5.40759 9.75413C7.22986 9.75413 8.1631 10.1135 8.62849 10.5059C9.09399 10.8982 9.22844 11.3888 9.25953 12.0367V13.5001L1.54759 13.5008C1.54686 13.1681 1.54831 12.9983 1.54108 11.9812C1.53747 11.3636 1.66252 10.8968 2.13887 10.5059C2.61522 10.1149 3.58381 9.75413 5.40677 9.75413L5.40759 9.75413Z" fill="#48C6D9" /></svg>,
  'flux': <svg width={15} height={15} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0974 11.2504C14.6209 11.185 15.0105 10.7348 14.9997 10.2075V7.00069C14.9997 6.47044 14.7888 5.9617 14.4138 5.58672C14.0388 5.21174 13.5301 5.0008 12.9998 5.0008H9.75003C9.46684 4.99982 9.19636 5.11798 9.00592 5.32696C8.8155 5.5369 8.72273 5.81618 8.75008 6.09839C8.81551 6.62181 9.26568 7.01141 9.793 7.00069H11.5859L5.7932 12.7934C5.40162 13.184 5.40162 13.8168 5.7932 14.2073C6.1838 14.5989 6.81659 14.5989 7.20717 14.2073L12.9998 8.41566V10.2505C12.9989 10.5337 13.117 10.8042 13.326 10.9946C13.5359 11.185 13.8152 11.2778 14.0974 11.2505V11.2504Z" fill="#48C6D9" /><path d="M0.902516 3.25084C0.379095 3.31627 -0.0105083 3.76644 0.000216117 4.29376V7.50058C0.000216117 8.03083 0.211142 8.53958 0.586133 8.91456C0.961125 9.28953 1.46988 9.50047 2.00011 9.50047H5.24992C5.53311 9.50145 5.80359 9.38329 5.99403 9.17432C6.18445 8.96437 6.27722 8.68509 6.24987 8.40288C6.18444 7.87946 5.73427 7.48986 5.20695 7.50058H3.41505L9.20673 1.70791C9.3952 1.52042 9.50066 1.26653 9.50066 1.00092C9.50066 0.735309 9.3952 0.481423 9.20673 0.293934C9.01924 0.105467 8.76536 0 8.49974 0C8.23413 0 7.98025 0.105464 7.79276 0.293934L2.00008 6.08561V4.25076C2.00106 3.96758 1.8829 3.6971 1.67392 3.50666C1.46397 3.31624 1.1847 3.22347 0.902491 3.25082L0.902516 3.25084Z" fill="#48C6D9" /></svg>,
  'chat': <svg width={15} height={15} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.4998 0H2.50018C1.8369 0 1.20115 0.263672 0.732424 0.732424C0.263702 1.20118 0 1.83693 0 2.50018V10.0002C0.000585934 10.5539 0.185161 11.0924 0.524418 11.5307C0.863675 11.9684 1.33888 12.2819 1.87501 12.4213V12.866C1.87501 13.4766 2.24239 14.0268 2.80665 14.26C3.37033 14.4938 4.01896 14.3649 4.45081 13.933L5.88403 12.4998H12.4998C13.1631 12.4998 13.7989 12.2367 14.2676 11.768C14.7363 11.2992 15 10.6629 15 10.0002V2.50018C15 1.8369 14.7363 1.20115 14.2676 0.732424C13.7988 0.263702 13.1631 0 12.4998 0L12.4998 0ZM13.7497 10.0003H13.7502C13.7502 10.3313 13.6184 10.6495 13.384 10.8839C13.1497 11.1182 12.8315 11.2501 12.4998 11.2501H5.62501C5.45918 11.2501 5.30039 11.3157 5.18321 11.4335L3.56605 13.0494C3.48929 13.1145 3.38264 13.1309 3.29008 13.0922C3.19691 13.0535 3.13363 12.9662 3.12483 12.866V11.8752C3.12483 11.7094 3.05921 11.55 2.94201 11.4328C2.82482 11.3156 2.66604 11.25 2.50022 11.25C1.80939 11.25 1.24982 10.6904 1.24982 10.0002V2.50015C1.24982 1.80932 1.8094 1.24976 2.50022 1.24976H12.4999C12.8315 1.24976 13.1497 1.38159 13.3841 1.61597C13.6184 1.85034 13.7503 2.16851 13.7503 2.50015L13.7497 10.0003Z" fill="#48C6D9" /><path d="M4.3752 4.99979C4.03008 4.99979 3.75 5.27987 3.75 5.62499V6.8748C3.75 7.21992 4.03008 7.5 4.3752 7.5C4.72033 7.5 4.99982 7.21992 4.99982 6.8748V5.62499C4.99982 5.45916 4.9342 5.30037 4.817 5.18319C4.69981 5.06601 4.54103 4.99979 4.3752 4.99979Z" fill="#48C6D9" /><path d="M7.5002 4.99979C7.15508 4.99979 6.875 5.27987 6.875 5.62499V6.8748C6.875 7.21992 7.15508 7.5 7.5002 7.5C7.84533 7.5 8.12541 7.21992 8.12541 6.8748V5.62499C8.12541 5.45916 8.0592 5.30037 7.942 5.18319C7.82481 5.06601 7.66603 4.99979 7.5002 4.99979Z" fill="#48C6D9" /><path d="M10.6246 4.99979C10.2795 4.99979 10 5.27987 10 5.62499V6.8748C10 7.21992 10.2795 7.5 10.6246 7.5C10.9697 7.5 11.2498 7.21992 11.2498 6.8748V5.62499C11.2498 5.45916 11.1842 5.30037 11.067 5.18319C10.9498 5.06601 10.7904 4.99979 10.6246 4.99979Z" fill="#48C6D9" /></svg>,
  'question': <svg width={15} height={15} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.74969 9.00003H8.24969V10.5H6.74969V9.00003Z" fill="#48C6D9" /><path d="M7.49982 2.99997C6.22482 2.99997 5.24982 4.04997 5.24982 5.24997H6.74982C6.74982 4.79997 7.04982 4.49997 7.49982 4.49997C7.94982 4.49997 8.24982 4.79997 8.24982 5.24997C8.24982 5.47497 8.17482 5.69997 7.94982 5.84997C7.12482 6.44997 6.74982 7.27497 6.74982 8.24997H8.24982C8.24982 7.72497 8.39982 7.34997 8.84982 7.04997C9.37482 6.67497 9.74982 5.99997 9.74982 5.24997C9.74982 4.04997 8.77482 2.99997 7.49982 2.99997Z" fill="#48C6D9" /><path d="M7.5 0C3.375 0 0 3 0 6.75C0 8.55 0.825 10.275 2.25 11.55V15L6.675 13.425C6.975 13.5 7.275 13.5 7.5 13.5C11.625 13.5 15 10.5 15 6.75C15 3 11.625 0 7.5 0ZM7.5 12C7.275 12 6.975 12 6.675 11.925H6.525L3.75 12.9V10.875L3.45 10.65C2.25 9.6 1.5 8.25 1.5 6.75C1.5 3.825 4.2 1.5 7.5 1.5C10.8 1.5 13.5 3.825 13.5 6.75C13.5 9.675 10.8 12 7.5 12Z" fill="#48C6D9" /></svg>,
  'accessibility': <svg width={15} height={15} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7.5 0C3.36067 0 0 3.36067 0 7.5C0 11.6393 3.36067 15 7.5 15C11.6393 15 15 11.6393 15 7.5C15 3.36067 11.6393 0 7.5 0ZM7.5 1.32747C10.9068 1.32747 13.6732 4.09313 13.6732 7.49997C13.6732 10.9068 10.9068 13.6725 7.5 13.6725C4.09317 13.6725 1.3275 10.9068 1.3275 7.49997C1.3275 4.09313 4.09383 1.32747 7.5 1.32747Z" fill="#48C6D9" /><path fillRule="evenodd" clipRule="evenodd" d="M6.40494 7.127C6.27538 8.61463 5.93424 10.0573 5.40234 11.4597C5.27278 11.8021 5.44531 12.1856 5.78775 12.3151C6.1302 12.4447 6.51367 12.2722 6.64322 11.9297C7.01952 10.9369 7.30729 9.92521 7.50064 8.89388C7.694 9.92513 7.98175 10.9369 8.35805 11.9297C8.48761 12.2722 8.87107 12.4447 9.21352 12.3151C9.55597 12.1856 9.72849 11.8021 9.59894 11.4597C9.06769 10.058 8.72654 8.616 8.59699 7.12966C9.3919 7.0906 10.1868 7.00727 10.9823 6.87836C11.3437 6.81977 11.5897 6.47863 11.5305 6.11665C11.4719 5.75531 11.1308 5.50923 10.7694 5.56846C8.5891 5.92263 6.40877 5.90896 4.22844 5.56781C3.86645 5.51117 3.52662 5.75921 3.46997 6.12119C3.41333 6.48318 3.66137 6.82301 4.02335 6.87901C4.81697 7.00336 5.61059 7.08669 6.40485 7.12706L6.40494 7.127Z" fill="#48C6D9" /><path fillRule="evenodd" clipRule="evenodd" d="M8.69796 4.07883C8.69796 4.74029 8.16149 5.27674 7.50004 5.27674C6.83859 5.27674 6.30212 4.74028 6.30212 4.07883C6.30212 3.41738 6.83859 2.88156 7.50004 2.88156C8.16149 2.88156 8.69796 3.41736 8.69796 4.07883Z" fill="#48C6D9" /></svg>,
  'round_arrow': <svg width={28} height={28} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 1.29539e-06C17.713 1.13309e-06 21.274 1.475 23.8995 4.1005C26.525 6.72601 28 10.287 28 14C28 17.713 26.525 21.274 23.8995 23.8995C21.274 26.525 17.713 28 14 28C10.287 28 6.72602 26.525 4.10051 23.8995C1.475 21.274 -4.49658e-07 17.713 -6.11959e-07 14C-7.74261e-07 10.287 1.475 6.72602 4.1005 4.10051C6.72601 1.475 10.287 1.45769e-06 14 1.29539e-06ZM7.875 13.125C7.64294 13.125 7.42038 13.2172 7.25628 13.3813C7.09219 13.5454 7 13.7679 7 14C7 14.2321 7.09219 14.4546 7.25628 14.6187C7.42038 14.7828 7.64294 14.875 7.875 14.875L18.0128 14.875L14.2555 18.6305C14.0912 18.7948 13.9989 19.0176 13.9989 19.25C13.9989 19.4824 14.0912 19.7052 14.2555 19.8695C14.4198 20.0338 14.6426 20.1261 14.875 20.1261C15.1074 20.1261 15.3302 20.0338 15.4945 19.8695L20.7445 14.6195C20.826 14.5382 20.8906 14.4417 20.9347 14.3354C20.9789 14.2291 21.0016 14.1151 21.0016 14C21.0016 13.8849 20.9789 13.7709 20.9347 13.6646C20.8906 13.5583 20.826 13.4618 20.7445 13.3805L15.4945 8.1305C15.3302 7.9662 15.1074 7.87389 14.875 7.87389C14.6426 7.8739 14.4198 7.9662 14.2555 8.1305C14.0912 8.2948 13.9989 8.51764 13.9989 8.75C13.9989 8.98236 14.0912 9.2052 14.2555 9.3695L18.0128 13.125L7.875 13.125Z" fill="#FFFEFE" /></svg>,
  'upload': <svg width={17} height={15} viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.20312 3.51535H7.71865V10.4531C7.71865 10.5434 7.79248 10.6172 7.88271 10.6172H9.11318C9.20342 10.6172 9.27725 10.5434 9.27725 10.4531V3.51535H10.7969C10.9343 3.51535 11.0102 3.35744 10.9261 3.2508L8.6292 0.342795C8.61385 0.323186 8.59424 0.307327 8.57186 0.296421C8.54947 0.285514 8.5249 0.279846 8.5 0.279846C8.4751 0.279846 8.45053 0.285514 8.42814 0.296421C8.40576 0.307327 8.38615 0.323186 8.3708 0.342795L6.07393 3.24875C5.98984 3.35744 6.06572 3.51535 6.20312 3.51535ZM16.0059 9.83791H14.7754C14.6852 9.83791 14.6113 9.91174 14.6113 10.002V13.1602H2.38867V10.002C2.38867 9.91174 2.31484 9.83791 2.22461 9.83791H0.994141C0.903906 9.83791 0.830078 9.91174 0.830078 10.002V14.0625C0.830078 14.4255 1.12334 14.7188 1.48633 14.7188H15.5137C15.8767 14.7188 16.1699 14.4255 16.1699 14.0625V10.002C16.1699 9.91174 16.0961 9.83791 16.0059 9.83791Z" fill="#47C6D9" /></svg>,
};

export default MainNavMobileOverlay;