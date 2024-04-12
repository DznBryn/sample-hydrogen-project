import React from 'react';
import classnames from 'classnames';
import {Link} from '@remix-run/react';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const mockLinks = [
  {
    _id: 0,
    displayText: 'Shop',
    navLinks: [
      {
        _id: 0,
        displayText: 'Shop All',
        url: 'https://www.tula.com/collections/all',
      },
      {
        _id: 1,
        displayText: 'Best Sellers',
        url: 'https://www.tula.com/collections/best-sellers',
      },
      {
        _id: 3,
        displayText: 'Value Kits',
        url: 'https://www.tula.com/collections/best-sellers',
      },
      {
        _id: 4,
        displayText: 'Skin Quiz',
        url: 'https://www.tula.com/collections/best-sellers',
      },
      {
        _id: 5,
        displayText: 'Store Locator',
        url: 'https://www.tula.com/collections/best-sellers',
      },
    ],
    url: '',
  },
  {
    _id: 1,
    displayText: 'Learn More',
    navLinks: [
      {
        _id: 0,
        displayText: 'Probiotics & Superfoods',
        url: 'https://www.tula.com/collections/all',
      },
      {
        _id: 1,
        displayText: 'Refer Friends',
        url: 'https://www.tula.com/collections/best-sellers',
      },
      {
        _id: 3,
        displayText: 'Press',
        url: 'https://www.tula.com/collections/best-sellers',
      },
      {
        _id: 4,
        displayText: 'Video Testimonials',
        url: 'https://www.tula.com/collections/best-sellers',
      },
    ],
    url: '',
  },
  {
    _id: 2,
    displayText: 'ABOUT',
    navLinks: [
      {
        _id: 0,
        displayText: 'Clean & Effective',
        fontColorHex: '#48C6D9',
        url: 'https://www.tula.com/collections/all',
      },
      {
        _id: 1,
        displayText: 'Our Story & Founder',
        url: 'https://www.tula.com/collections/best-sellers',
      },
      {
        _id: 3,
        displayText: 'Careers',
        url: 'https://www.tula.com/collections/best-sellers',
      },
      {
        _id: 4,
        displayText: 'Ambassador Program',
        url: 'https://www.tula.com/collections/best-sellers',
      },
    ],
    url: '',
  },
  {
    _id: 3,
    displayText: 'help',
    navLinks: [
      {
        _id: 0,
        displayText: 'FAQs',
        url: 'https://www.tula.com/collections/all',
      },
      {
        _id: 1,
        displayText: 'Returns & Exchanges',
        url: 'https://www.tula.com/collections/best-sellers',
      },
      {
        _id: 3,
        displayText: 'Contact Us',
        url: 'https://www.tula.com/collections/best-sellers',
      },
      {
        _id: 4,
        displayText: 'Accessibility',
        url: 'https://www.tula.com/collections/best-sellers',
      },
    ],
    url: '',
  },
];

const classes = {
  footerDesktopNav: classnames('footer__desktopNav'),
  desktopNavListItem: classnames('desktopNavdesktopNav_listItemListItem'),
  footerDesktopSubNav: classnames('footer__desktopSubNav'),
  desktopSubNavListItem: classnames('desktopSubNav_listItem'),
  listItemLink: classnames('listItem__link'),
  listItemLinkBold: classnames('listItem__link', 'fw_bold'),
};

const FooterSubNavDesktop = ({navLinks = []}) => {
  return (
    <ul className={classes.footerDesktopSubNav}>
      {navLinks.map((linkItem) => (
        <li key={linkItem._id} className={classes.desktopSubNavListItem}>
          <Link
            to={linkItem.url}
            className={classes.listItemLink}
            style={
              linkItem?.fontColorHex
                ? {color: linkItem?.fontColorHex}
                : undefined
            }
          >
            {linkItem.displayText}
            {linkItem?.emoji && <img src={linkItem.emoji?.asset?.url} />}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const FooterNavDesktop = ({navLinkGroups}) => {
  navLinkGroups = navLinkGroups || mockLinks;
  return (
    <ul className={classes.footerDesktopNav}>
      {navLinkGroups.map((linkItem) => (
        <li key={linkItem._id} className={classes.desktopNavListItem}>
          <div className={classes.listItemLinkBold}>{linkItem.displayText}</div>
          {linkItem.navLinks && (
            <FooterSubNavDesktop navLinks={linkItem.navLinks} />
          )}
        </li>
      ))}
    </ul>
  );
};
export default FooterNavDesktop;
