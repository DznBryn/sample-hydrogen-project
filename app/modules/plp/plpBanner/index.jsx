import { useEffect, useState } from 'react';
import FireWorkStory from '../../fireWorkStory';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const BannerDesktop = ({ banner = {}, ...rest }) => {
  return (
    <div {...rest} className={'containerDesktop'}>
      {
        (banner.id) ? (
          <div {...rest} className={'containerFireWorkDesktop'}>
            <FireWorkStory id={banner.id} />
          </div>
        ) : (
          <a href={banner.url}>
            {/* <img src={banner.desktop} className={'imageDesktop'} /> */}
            <div className={'imageDesktop'} style={{backgroundColor: '#47C6D9', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
              Add banners via Metafield
            </div> {/*placeholder -> remove after add banner via metafields*/}
          </a>
        )
      }
    </div>
  );
};

const BannerMobile = ({ banner = {}, ...rest }) => {
  return (
    <div {...rest} className={'containerMobile'}>
      {
        (banner.id) ? (
          <div {...rest} className={'containerFireWorkMobile'}>
            <FireWorkStory id={banner.id} />
          </div>
        ) : (
          <a href={banner.url}>
            <img src={banner.mobile} className={'imageMobile'} />
          </a>
        )
      }
    </div>
  );
};

const PLPBanner = ({ banner, ...rest }) => {
  const [isMobile, setIsMobile] = useState();

  useEffect(() => {
    if (window?.innerWidth < 500) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }

    const resize = function () {
      if (window?.innerWidth < 500) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  let bannerData = {};
  banner[1]?.forEach((field) => {
    let newKeyValue = field.key.split('-')[field.key.split('-').length - 1];
    bannerData[newKeyValue] = field.value;
  });

  return Object.keys(bannerData).length > 0? (
    isMobile ? (
      <BannerMobile banner={bannerData} {...rest} />
    ) : (
      <BannerDesktop banner={bannerData} {...rest} />
    )
  ) : null;
};

export default PLPBanner;
