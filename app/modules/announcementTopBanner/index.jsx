import { useState, useEffect } from 'react';
import {PortableText} from '@portabletext/react';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

import { annoucementTopBannerContentMock } from '~/utils/functions/mocks';

const AnnouncementTopBanner = ({ content }) => {
  const { message, available, background, closeButtonColor } = content || annoucementTopBannerContentMock;
  const [showBanner, setShowBanner] = useState(false);

  function removeBanner() {
    setShowBanner(false);
    window?.sessionStorage.setItem('annoucementBannerVisibility', false);
  }

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
      <PortableText value={message}/>
      <span style={{ color: closeButtonColor }} onClick={removeBanner}>+</span>
    </div>
  );
};

export default AnnouncementTopBanner;