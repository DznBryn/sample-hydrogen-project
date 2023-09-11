import { useState, useEffect } from 'react';
import {updateElemsPositionOnBannerClose} from '..';
import {PortableText} from '@portabletext/react';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const AnnouncementTopBanner = ({ content }) => {
  const { messageRaw, available, background, closeButtonColor } = content;
  const [showBanner, setShowBanner] = useState(false);

  function removeBanner() {
    setShowBanner(false);
    window?.sessionStorage.setItem('annoucementBannerVisibility', false);
  }

  useEffect(() => {

    if(showBanner === false) updateElemsPositionOnBannerClose();

  }, [showBanner]);

  useEffect(() => {

    if (window) {
      const bannerVisibility = window?.sessionStorage.getItem('annoucementBannerVisibility');

      if (!bannerVisibility) {
        setShowBanner(available);
        return window?.sessionStorage.setItem('annoucementBannerVisibility', available);
      } else {
        setShowBanner(JSON.parse(bannerVisibility));
      }
    } else {
      setShowBanner(available);
    }

  }, []);

  return (
    <div className={(showBanner ? 'bannerContainer' : 'hideBanner')} style={{ background }}>
      <PortableText value={messageRaw}/>
      <span style={{ color: closeButtonColor }} onClick={removeBanner}>+</span>
    </div>
  );
};

export default AnnouncementTopBanner;