import classnames from 'classnames';
import { Link } from '@remix-run/react';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const classes = {
  footerMobileNav: classnames('footer__mobileNav'),
  mobileNavListItem: classnames('mobileNav_listItem'),
  footerMobileSubNav: classnames('footer__mobileSubNav'),
  mobileSubNavListItem: classnames('mobileSubNav_listItem'),
  listItemLinkContainer: classnames('linkItem_link__container'),
  listItemLink: classnames('listItem_link'),
  listItemLinkBold: classnames('listItem_link', 'fw_bold_mobile')
};

const FooterSubNavMobile = ({ navLinks = [] }) => (
  <ul className={classes.footerMobileSubNav}>
    {
      navLinks.map(linkItem =>
        <li key={linkItem._id} className={classes.mobileSubNavListItem}>
          <Link reloadDocument to={linkItem.url} className={classes.listItemLink}>
            {linkItem.displayText}
          </Link>
        </li>
      )
    }
  </ul>
);

const FooterNavMobile = ({ navLinkGroups = [] }) => {

  const handleDropdown = (e) => {
    if (e.currentTarget.classList.contains('active')) {
      e.currentTarget.classList.remove('active');
      e.currentTarget.children[0].children[1].textContent = '+';
    } else {
      e.currentTarget.classList.add('active');
      e.currentTarget.children[0].children[1].textContent = '–';
    }
  };

  return (
    <ul className={classes.footerMobileNav}>
      {
        navLinkGroups.map(linkItem => linkItem.navLinks && linkItem.navLinks.length > 0 ? (
          <li key={linkItem._id} className={classes.mobileNavListItem} onClick={(e) => handleDropdown(e)}>
            <div className={classes.listItemLinkContainer}>
              <span to={linkItem.url} className={classes.listItemLinkBold}>{linkItem.displayText}</span>
              <span className={classes.listItemLinkBold} >+</span>
            </div>
            <FooterSubNavMobile navLinks={linkItem.navLinks} />
          </li>
        ) : (
          <li key={linkItem._id} className={classes.mobileNavListItem}>
            <div className={classes.listItemLinkContainer}>
              <Link reloadDocument to={linkItem.url} className={classes.listItemLinkBold} style={linkItem?.fontColorHex ? { color: linkItem?.fontColorHex } : undefined}>
                {linkItem.displayText}
                {linkItem?.emoji && <img src={linkItem.emoji?.asset?.url} />}
              </Link>
            </div>
          </li>
        )
        )
      }
    </ul>
  );
};
export default FooterNavMobile;