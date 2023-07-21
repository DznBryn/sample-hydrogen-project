import { useEffect, useRef } from 'react';
import { Link } from '@remix-run/react';
import { bindCustomEvent, createCustomEvent } from '~/utils/functions/eventFunctions';
import NavCollectionCarousel, {links as navCollectionCarouselStyle} from '~/modules/navCollectionCarousel';
import NavShopOverlay, {links as navShopOverlayStyle} from '~/modules/navShopOverlay';
import NavShopOverlaySplit, {links as navShopOverlaySplitStyle} from '~/modules/navShopOverlaySplit';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...navCollectionCarouselStyle(),
    ...navShopOverlayStyle(),
    ...navShopOverlaySplitStyle(),
  ];
};

const handleMouseEnter = (e, itemId) => {
  console.log('handleMouseEnter');
  const dataHoverEvent = createCustomEvent();
  for (let it = 0; it < e.currentTarget.children.length; it++) {
    const parentElement = e.currentTarget.children[it].parentElement.id;
    if (e.currentTarget.children[it].getAttribute('data-hover-state') === 'hide' && parentElement === itemId) {
      e.currentTarget.children[it].setAttribute('data-hover-state', 'show');
      e.currentTarget.children[it].dispatchEvent(dataHoverEvent);
    } else {
      e.currentTarget.children[it].setAttribute('data-hover-state', 'hide');
      e.currentTarget.children[it].dispatchEvent(dataHoverEvent);
    }
  }
};

const handleMouseLeave = (e) => {
  const dataHoverEvent = createCustomEvent();
  for (let it = 0; it < e.currentTarget.children.length; it++) {
    if (e.currentTarget.children[it].getAttribute('data-hover-state') === 'show' && e.currentTarget.children[it].classList !== null) {
      e.currentTarget.children[it].setAttribute('data-hover-state', 'hide');
      e.currentTarget.children[it].dispatchEvent(dataHoverEvent);
    }
  }
};

const handleTouch = (e) => {
  for (let it = 0; it < e.currentTarget.children.length; it++) {
    if (e.currentTarget.children[it].classList.contains('desktopNavItemVisible')) {
      e.currentTarget.children[it].classList.remove('desktopNavItemVisible');
      e.currentTarget.children[it].classList.add('desktopNavItemHidden');
    } else {
      if (e.currentTarget.children[it].classList.contains('desktopNavItemHidden')) {
        e.currentTarget.children[it].classList.remove('desktopNavItemHidden');
        e.currentTarget.children[it].classList.add('desktopNavItemVisible');
      }
    }
  }
};

const DesktopHoverList = ({ linkList = [] }) => {
  const dropDownRef = useRef(null);

  useEffect(() => bindCustomEvent(dropDownRef, 'data-hover-state', {
    hidden: 'desktopNavItemHidden',
    visible: 'desktopNavItemVisible',
  }));

  return (
    <div className={'desktopHoverWrap desktopNavItemHidden'} ref={dropDownRef} data-hover-state="hide">
      {linkList.map((navLink = {}) => (
        <Link
          key={navLink._id}
          to={navLink.url}
          className={'desktopHoverItem'}
        >
          {navLink.displayText}
        </Link>
      ))}
    </div>
  );
};

const DesktopNavItem = ({ navItem = {}, itemId = '' }) => {
  const { megaMenuOverlay = null, megaMenuSplit = null, overlayNavLinks = [], carouselProductCollection = null } = navItem.dropdownOverlay || {};
  const navStyle = (overlayNavLinks?.length > 0) ? 'desktopNavItem relativeNav' : 'desktopNavItem';

  return (
    <div
      className={navStyle}
      id={itemId}
      onMouseEnter={(e) => handleMouseEnter(e, itemId)}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouch}
    >
      {navItem.emoji && <img className={'emoji'} src={navItem.emoji.src} />}
      <Link
        className={'navLink'}
        to={navItem.linkUrl}
        style={{ color: (navItem?.fontColorHex) ? navItem?.fontColorHex : undefined }}
      >
        {navItem.displayText}
      </Link>
      {carouselProductCollection && <NavCollectionCarousel collection={carouselProductCollection} navItem={navItem} />}
      {megaMenuSplit && <NavShopOverlaySplit megaMenuSplit={megaMenuSplit} />}
      {megaMenuOverlay && <NavShopOverlay megaMenuOverlay={megaMenuOverlay} />}
      {(overlayNavLinks?.length > 0) && <DesktopHoverList linkList={overlayNavLinks} />}
    </div>
  );
};

export default DesktopNavItem;