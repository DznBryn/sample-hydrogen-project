import React from 'react';
import FooterNavDesktop, {
  links as footerNavDesktopStyles,
} from '~/modules/footer/footerNavDesktop';
import FooterNavMobile, {
  links as footerNavMobileStyles,
} from '~/modules/footer/footerNavMobile';

export const links = () => {
  return [...footerNavDesktopStyles(), ...footerNavMobileStyles()];
};

const FooterNav = ({desktopNavLinkGroups = [], mobileLinkGroups = []}) => (
  <>
    <FooterNavDesktop navLinkGroups={desktopNavLinkGroups} />
    <FooterNavMobile navLinkGroups={mobileLinkGroups} />
  </>
);
export default FooterNav;
