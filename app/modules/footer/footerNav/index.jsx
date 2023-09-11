import React from 'react';
import FooterNavDesktop, { links as footerNavDesktopStyles } from '~/modules/footer/footerNavDesktop';
import FooterNavMobile, { links as footerNavMobileStyles } from '~/modules/footer/footerNavMobile';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...footerNavDesktopStyles(),
    ...footerNavMobileStyles(),
  ];
};

const FooterNav = ({ desktopNavLinkGroups = [], mobileLinkGroups = [] }) => (
  <>
    <FooterNavDesktop navLinkGroups={desktopNavLinkGroups} />
    <FooterNavMobile navLinkGroups={mobileLinkGroups} />
  </>
);
export default FooterNav;
