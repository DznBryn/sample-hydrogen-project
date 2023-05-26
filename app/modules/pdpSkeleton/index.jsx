import React, { useEffect } from 'react';
import LoadingSkeleton from '~/modules/loadingSkeleton';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const PDPSkeleton = () => {

  useEffect(() => {

    const handlePDP = () => {

      document.querySelector('.PDPSkeleton').style.display = 'flex';
      setTimeout(() => {
        document.querySelector('.PDPSkeleton').style.display = 'none';
      }, 1500);
    };

    window.location.href.includes('/products/') ?
      handlePDP()
      : document.querySelector('.PDPSkeleton').style.display = 'none';

  }, []);

  return (

    <div className={'PDPSkeleton'}>
      <div className={'PDPtopSection'}>
        <div className={'left'}>
          <div className={'galleryThumbnailsPlaceholder'}>
            <LoadingSkeleton width="138px" height="380px" />
          </div>

          <div id={'mobileTitle'} className={'mobile'}>
            <LoadingSkeleton width="168px" height="20px" />
            <LoadingSkeleton width="250px" height="20px" />
          </div>

          <div className={'mainGalleryPlaceholder'}>
            <LoadingSkeleton width="540px" height="680px" />
          </div>

          <div id={'mobileThumbs'} className={'mobile'}>
            <LoadingSkeleton width="184px" height="30px" />
            <LoadingSkeleton width="70px" height="20px" />
          </div>

        </div>

        <div className={'right'}>
          <div className={'productDescriptionPlaceholder'}>
            <LoadingSkeleton width="200px" height="20px" />
            <LoadingSkeleton width="316px" height="25px" />
            <LoadingSkeleton width="200px" height="20px" />
            <LoadingSkeleton width="77px" height="20px" />
            <LoadingSkeleton width="482px" height="316px" />
          </div>

          <div className={'productVariantsPlaceholder'}>
            <LoadingSkeleton width="77px" height="20px" />
            <div id={'desktopSelectors'} className={'selectors'}>
              <LoadingSkeleton width="225px" height="50px" />
              <LoadingSkeleton width="225px" height="50px" />
              <LoadingSkeleton width="225px" height="50px" />
              <LoadingSkeleton width="225px" height="50px" />
              <LoadingSkeleton width="225px" height="50px" />
            </div>

            <div id={'mobileSelectors'} className={'selectors'}>
              <LoadingSkeleton width="145px" height="110px" />
              <LoadingSkeleton width="145px" height="110px" />
              <LoadingSkeleton width="145px" height="110px" />
              <LoadingSkeleton width="145px" height="110px" />
              <LoadingSkeleton width="145px" height="110px" />
            </div>

            <div id={'desktopVariantSizeWrapper'} className={'variantSizeWrapper'}>
              <LoadingSkeleton width="231px" height="39px" />
              <LoadingSkeleton width="231px" height="39px" />
            </div>

            <div id={'mobileVariantSizeWrapper'} className={'variantSizeWrapper'}>
              <LoadingSkeleton width="160px" height="35px" />
              <LoadingSkeleton width="160px" height="35px" />
            </div>

            <div className={'boxThree'}>
              <LoadingSkeleton width="482px" height="140px" />
            </div>

            <div className={'boxFour'}>
              <LoadingSkeleton width="235px" height="25px" />
            </div>

            <div id={'desktopAtcWrapper'} className={'atcWrapper'}>
              <LoadingSkeleton width="149px" height="45px" />
              <LoadingSkeleton width="315px" height="45px" />
            </div>

            <div id={'mobileAtcWrapper'} className={'atcWrapper'}>
              <LoadingSkeleton width="112px" height="44px" />
              <LoadingSkeleton width="210px" height="44px" />
            </div>

          </div>
        </div>
      </div>

      <div className={'fullBleedPlaceholder'}>
        <LoadingSkeleton width="100%" height="400px" />
      </div>

    </div>
    
  );
};

export default PDPSkeleton;
