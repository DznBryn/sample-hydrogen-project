import SiteSwitcher, { links as siteSwitcherStyles } from '~/modules/footer/siteSwitcher';
import FooterCopyright, { links as footerCopyrightStyles} from '~/modules/footer/footerCopyright';
import FooterSocial, { links as footerSocialStyles} from '~/modules/footer/footerSocial';
import FooterLogo, { links as footerLogoStyles } from '~/modules/footer/footerLogo';
import FooterNav, { links as footerNavStyles } from '~/modules/footer/footerNav';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...siteSwitcherStyles(),
    ...footerCopyrightStyles(),
    ...footerSocialStyles(),
    ...footerLogoStyles(),
    ...footerNavStyles(),

  ];
};

const Footer = ({ desktopFooter, mobileFooter }) => {

  const { navLinkGroups: desktopNavLinkGroups = [] } = desktopFooter;
  const { navLinkGroups: mobileLinkGroups = [] } = mobileFooter;

  return (
    <footer className={'footerWrap'}>
      <div className={'fixedWidthPage'}>
        <div className={'footerCol1'}>
          <FooterLogo />
          <FooterSocial />
          <SiteSwitcher isMobile={false} />
        </div>
        <div className={'footerCol2'}>
          <FooterNav desktopNavLinkGroups={desktopNavLinkGroups} mobileLinkGroups={mobileLinkGroups} />
        </div>
        <div className={'break'}></div>
        <SiteSwitcher isMobile={true} />
        <div className={'footerRow2'}>
          <FooterCopyright desktopFooter={desktopFooter} />
        </div>
      </div>
    </footer>
  );

};

export default Footer;
