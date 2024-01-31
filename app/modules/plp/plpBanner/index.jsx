import {useEffect, useState} from 'react';
import FireWorkStory from '../../fireWorkStory';

import styles from './styles.css';
import LoadingSkeleton from '~/modules/global/loadingSkeleton';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const BannerDesktop = ({banner = {}, ...rest}) => {
  return (
    <div {...rest} className={'containerDesktop'}>
      {banner.id ? (
        <div {...rest} className={'containerFireWorkDesktop'}>
          <LoadingSkeleton
            width="250px"
            height="503px"
            style={{borderRadius: '10px', position: 'absolute', top: '0'}}
          />
          <FireWorkStory id={banner.id} />
        </div>
      ) : (
        <a href={banner.url}>
          <img src={banner.desktop} className={'imageDesktop'} />
        </a>
      )}
    </div>
  );
};

const BannerMobile = ({banner = {}, ...rest}) => {
  return (
    <div {...rest} className={'containerMobile'}>
      {banner.id ? (
        <div {...rest} className={'containerFireWorkMobile'}>
          <LoadingSkeleton
            width="195px"
            height="393px"
            style={{borderRadius: '10px', position: 'absolute', top: '0'}}
          />
          <FireWorkStory id={banner.id} />
        </div>
      ) : (
        <a href={banner.url}>
          <img src={banner.mobile} className={'imageMobile'} />
        </a>
      )}
    </div>
  );
};

const PLPBanner = ({banner, ...rest}) => {
  const [isMobile, setIsMobile] = useState();
  const bannerData = getFormatedBannerData(banner);

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

  return Object.keys(bannerData).length > 0 ? (
    isMobile ? (
      <BannerMobile banner={bannerData} {...rest} />
    ) : (
      <BannerDesktop banner={bannerData} {...rest} />
    )
  ) : null;
};

function getFormatedBannerData(banner) {
  let bannerObj = {};
  const {id, imageDesktop, imageMobile, url} = banner;

  if (id) {
    bannerObj = {id};
  } else {
    bannerObj = {
      desktop: imageDesktop.asset.url + '?auto=format',
      mobile: imageMobile.asset.url + '?auto=format',
      url,
    };
  }

  return bannerObj;
}

export default PLPBanner;
