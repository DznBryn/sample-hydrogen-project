import { useState, useEffect, useRef } from 'react';
import { AngleDownIcon, AngleUpIcon } from '~/modules/icons';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const defaultThumbnail = 'https://res.cloudinary.com/shogun-frontend/image/fetch/f_auto,q_auto,c_limit,w_1920/https://f.shgcdn.com/1cf676c2-5a99-401a-9d1d-7b84ebf9a666/';

const MobileNavbar = ({ content }) => {

  const navbarContent = content.navbarItems;
  const [subItemsOpenId, setSubItemsOpenId] = useState(null);
  const [isHidden, setIsHidden] = useState(true);
  const subItemsContainer = useRef(null);
  const listenerStateRef = useRef({ subItemOpenned: false });
  let initScroll = false;
  let prevScrollTop = 0;

  function handleOpenSubItems(value) {
    listenerStateRef.current.subItemOpenned = true;
    setSubItemsOpenId(value);
    resetSubItemsScroll();
  }

  function handleCloseSubItems() {
    listenerStateRef.current.subItemOpenned = false;
    setSubItemsOpenId(null);
  }

  function resetSubItemsScroll() { subItemsContainer.current?.scrollTo(0, 0); }

  useEffect(() => setIsHidden(isToHideIt()));

  useEffect(() => {

    window.addEventListener('scroll', handleOnScroll.bind(this), true);

    const handleClickOutside = (event) => {
      const navbarContainer = document.getElementById('mobileNavbarContainer');
      const isOutsideClicked = !navbarContainer.contains(event.target);

      if (isOutsideClicked) {
        handleCloseSubItems();
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, []);

  function handleOnScroll() {

    if (avoidScrollEffect()) return;

    const scrollTop = document.documentElement.scrollTop;
    const mobileWrap = document.querySelector('.container');

    if (!initScroll && scrollTop > 30) {
      mobileWrap.classList.add('inactive');
      initScroll = true;
      prevScrollTop = scrollTop;
    } else {
      if (document.documentElement.scrollTop > 10) {
        if (prevScrollTop < scrollTop) {
          if (!mobileWrap.classList.contains('inactive')) {
            mobileWrap.classList.add('inactive');
          }
        }
        if (prevScrollTop > scrollTop) {
          if (mobileWrap.classList.contains('inactive')) {
            mobileWrap.classList.remove('inactive');
          }
        }
      }
      prevScrollTop = scrollTop;
    }

  }

  function isToHideIt() {

    const pathname = window.location.pathname;
    const isLandingPage = pathname.includes('/tiktok');

    return (isLandingPage);

  }

  function avoidScrollEffect() {

    const pathname = window.location.pathname;

    const someSubOptionIsOpenned = listenerStateRef.current.subItemOpenned;
    const isOnSearchPage = pathname.includes('/search');
    const isOnPLP = pathname.includes('/collection');
    const isOnHomepage = (pathname === '/');

    return (someSubOptionIsOpenned || (isOnHomepage || isOnPLP || isOnSearchPage));

  }

  const onNavbarClick = (idx) => {
    if (idx === subItemsOpenId) {
      handleCloseSubItems();
      return;
    }

    if (navbarContent[idx].navLinks.length > 0) {
      handleOpenSubItems(idx);
      return;
    }

    window.location.href = navbarContent[idx].url;
  };

  function sortContentByOrder(navbarContent) {
    const sortedContent = navbarContent.sort((a, b) => a.order - b.order);
    return sortedContent;

  }

  const renderIcon = (img) => (
    <img className={'icon'} src={img} />
  );

  const sortedContent = sortContentByOrder(navbarContent);
  const holidayColor = '#EF0000';

  return !isHidden && (
    <div className={'container'} style={{ display: 'none' }}>
      <div id='mobileNavbarContainer' className={'mobileNavContainer'}>
        <div className={'mobileNavItemWrapper'}>
          {sortedContent.map((navItem, idx) => (
            <div key={idx} className={'itemContainer'}>
              {navItem?.emoji?.src && renderIcon(navItem.emoji.src)}
              <div
                className={'mobileNavItem'}
                style={subItemsOpenId === idx ? { color: '#48C6D9' } : navItem?.emoji?.src ? { color: holidayColor } : {}}
                onClick={() => onNavbarClick(idx)}
              >
                {navItem.displayText}
                {navItem.navLinks.length > 0 && (
                  <span className={'mobileNavbarArrow'}>
                    {subItemsOpenId === idx ? <AngleUpIcon /> : <AngleDownIcon />}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {subItemsOpenId !== null && (
          <div className={'mobileSubNavWrapper'} ref={subItemsContainer}>
            {navbarContent[subItemsOpenId].navLinks?.map((subItem, idx) => (
              <a href={subItem.url} className={'mobileLink'} key={subItem.displayText}>
                <div key={idx} className={'mobileSubNavItem'}>
                  <img src={subItem.thumbnail ? subItem.thumbnail.src : defaultThumbnail} className={'mobileSubNavImage'} />
                  <span style={subItem.fontColorHex ? { color: subItem.fontColorHex } : {}}>
                    {subItem.emoji && <img className={'emoji'} src={subItem.emoji.src} />}
                    {subItem.displayText.toLowerCase()}</span>
                  {subItem.calloutText && (
                    <span style={{ color: subItem.calloutFontColorHex }}>
                      {subItem.calloutText}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
      <div
        className={'overlayOpacity'}
        style={subItemsOpenId !== null ? {} : { display: 'none' }}
      ></div>
    </div>
  );
};

export default MobileNavbar;