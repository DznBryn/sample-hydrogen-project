import {useEffect, useRef} from 'react';
import {Link} from '@remix-run/react';
import {bindCustomEvent} from '~/utils/functions/eventFunctions';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const MenuImage = ({ctaImage = {src: '', alt: ''}, cta, ctaUrl}) => (
  <div className={'sideImg'}>
    <div className={'menuImgWrap'}>
      <img src={ctaImage.asset.url + '?auto=format&w=160'} />
      <Link reloadDocument className={'ctaLink'} to={ctaUrl}>
        {cta}
      </Link>
    </div>
  </div>
);

const MenuLinks = ({menuLinks = []}) => (
  <div className={'menuLinks'} id="nav_click_desktop_t2">
    {menuLinks.map((sectionLinks, index) => {
      return (
        <div className={'sectionList'} key={sectionLinks.displayText}>
          <h2 className={'catLink'}>{sectionLinks.displayText}</h2>
          <Link reloadDocument className={'seeLink'} to={sectionLinks.url}>
            See All
          </Link>
          <ul>
            {sectionLinks.navLinks.map((l) => {
              return (
                <li key={l._id} className={'linkItem'}>
                  <Link reloadDocument className={'link'} to={l.url}>
                    {l.displayText}
                    {l.calloutText && (
                      <span
                        className={'callout'}
                        style={{
                          color: l.calloutFontColorHex
                            ? l.calloutFontColorHex
                            : '',
                        }}
                      >
                        {l.calloutText}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          {index < menuLinks.length - 1 && <div className={'menuBorder'}></div>}
        </div>
      );
    })}
  </div>
);

const NavShopOverlay = ({megaMenuOverlay = {}}) => {
  const shopOverlayRef = useRef(null);
  useEffect(() =>
    bindCustomEvent(shopOverlayRef, 'data-hover-state', {
      hidden: 'navShopOverlayHidden',
      visible: 'navShopOverlayVisible',
    }),
  );
  return (
    <div
      className={'navShopOverlay navShopOverlayHidden mainNavMegaMenu'}
      ref={shopOverlayRef}
      data-hover-state="hide"
    >
      <MenuImage
        ctaImage={megaMenuOverlay.leftBackgroundMedia}
        cta={megaMenuOverlay.leftCta}
        ctaUrl={megaMenuOverlay.leftCtaUrl}
      />
      <MenuLinks menuLinks={megaMenuOverlay.navLinkGroups} />
      <MenuImage
        ctaImage={megaMenuOverlay.rightBackgroundMedia}
        cta={megaMenuOverlay.rightCta}
        ctaUrl={megaMenuOverlay.rightCtaUrl}
      />
    </div>
  );
};

export default NavShopOverlay;
