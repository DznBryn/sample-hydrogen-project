import SiteSwitcher, { links as siteSwitcherStyles } from '~/modules/siteSwitcher';
import FooterCopyright, { links as footerCopyrightStyles} from '~/modules/footerCopyright';
import FooterSocial, { links as footerSocialStyles} from '~/modules/footerSocial';
import FooterLogo, { links as footerLogoStyles } from '~/modules/footerLogo';
import FooterNav, { links as footerNavStyles } from '~/modules/footerNav';

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


const mockFooter = {
  'legalText': [
    {
      'children': [
        {
          'text': '© TULA Life, INC | All Rights Reserved | Made in NYC | Terms & Conditions | Privacy Policy'
        }
      ],
      'type': 'paragraph'
    }
  ],
  'navLinkGroups': [
    {
      '_id': 0,
      'displayText': 'Shop',
      'navLinks': [
        {
          '_id': 0,
          'displayText': 'Shop All',
          'url': 'https://www.tula.com/collections/all'
        },
        {
          '_id': 1,
          'displayText': 'Best Sellers',
          'url': 'https://www.tula.com/collections/best-sellers'
        },
        {
          '_id': 3,
          'displayText': 'Value Kits',
          'url': 'https://www.tula.com/collections/best-sellers'
        },
        {
          '_id': 4,
          'displayText': 'Skin Quiz',
          'url': 'https://www.tula.com/collections/best-sellers'
        },
        {
          '_id': 5,
          'displayText': 'Store Locator',
          'url': 'https://www.tula.com/collections/best-sellers'
        },
      ],
      'url': ''
    },
    {
      '_id': 1,
      'displayText': 'Learn More',
      'navLinks': [
        {
          '_id': 0,
          'displayText': 'Probiotics & Superfoods',
          'url': 'https://www.tula.com/collections/all'
        },
        {
          '_id': 1,
          'displayText': 'Refer Friends',
          'url': 'https://www.tula.com/collections/best-sellers'
        },
        {
          '_id': 3,
          'displayText': 'Press',
          'url': 'https://www.tula.com/collections/best-sellers'
        },
        {
          '_id': 4,
          'displayText': 'Video Testimonials',
          'url': 'https://www.tula.com/collections/best-sellers'
        },
      ],
      'url': ''
    },
    {
      '_id': 2,
      'displayText': 'ABOUT',
      'navLinks': [
        {
          '_id': 0,
          'displayText': 'Clean & Effective',
          'url': 'https://www.tula.com/collections/all'
        },
        {
          '_id': 1,
          'displayText': 'Our Story & Founder',
          'url': 'https://www.tula.com/collections/best-sellers'
        },
        {
          '_id': 3,
          'displayText': 'Careers',
          'url': 'https://www.tula.com/collections/best-sellers'
        },
        {
          '_id': 4,
          'displayText': 'Ambassador Program',
          'url': 'https://www.tula.com/collections/best-sellers'
        },
      ],
      'url': ''
    },
    {
      '_id': 3,
      'displayText': 'help',
      'navLinks': [
        {
          '_id': 0,
          'displayText': 'FAQs',
          'url': 'https://www.tula.com/collections/all'
        },
        {
          '_id': 1,
          'displayText': 'Returns & Exchanges',
          'url': 'https://www.tula.com/collections/best-sellers'
        },
        {
          '_id': 3,
          'displayText': 'Contact Us',
          'url': 'https://www.tula.com/collections/best-sellers'
        },
        {
          '_id': 4,
          'displayText': 'Accessibility',
          'url': 'https://www.tula.com/collections/best-sellers'
        },
      ],
      'url': ''
    },
  ]
};

const Footer = ({ desktopFooter, mobileFooter }) => {

  const { navLinkGroups: desktopNavLinkGroups = [] } = desktopFooter || mockFooter;
  const { navLinkGroups: mobileLinkGroups = [] } = mobileFooter || mockFooter;

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
