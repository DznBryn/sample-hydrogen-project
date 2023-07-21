import { useEffect, useRef } from 'react';
import { Link } from '@remix-run/react';
import { bindCustomEvent } from '~/utils/functions/eventFunctions';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const MenuLinks = ({ menuLinks = [] }) => (
  <div className={'menuLinks'}>
    {menuLinks.map((collection, index) => {
      return (
        <div className={'collectionLink'} key={collection.name}>
          <Link className={'link'} to={`/collections/${collection.slug}}`}>
            {collection.name}
          </Link>
          {index < menuLinks.length - 1 && <div className={'menuBorder'}></div>}
        </div>
      );
    })}
  </div>
);

const NavShopOverlaySplit = ({ megaMenuSplit = {} }) => {

  const shopOverlayRef = useRef(null);

  useEffect(() => bindCustomEvent(shopOverlayRef, 'data-hover-state', {
    hidden: 'hidden',
    visible: 'visible'
  }));

  return (
    <div className={'navShopOverlaySplit hidden'} ref={shopOverlayRef} data-hover-state="hide">
      <div className={'sectionWrapper'}>
        <div className={'sectionLeft'}>
          <Link className={'featuredLink'} to={`/collections/${megaMenuSplit.imageCollectionLink.slug}`}>
            {megaMenuSplit.imageTextCta}
          </Link>
          <div className={'collectionLinkWrapper'}>
            <MenuLinks menuLinks={megaMenuSplit.menuCollections} />
          </div>
        </div>
        <div className={'sectionRight'}>
          <a href={`/collections/${megaMenuSplit.imageCollectionLink.slug}`}>
            <img
              src={megaMenuSplit.backgroundImage.src}
              className={'imageBlock'}
            >
              <h2>{megaMenuSplit.imageText}</h2>
              <p>{megaMenuSplit.imageTextCta}</p>
            </img>
          </a>
        </div>
      </div>
    </div>
  );
  
};

export default NavShopOverlaySplit;
