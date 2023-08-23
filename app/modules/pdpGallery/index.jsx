import { useState, useCallback } from 'react';
import SwiperSlider, { links as swiperSliderStyles } from '../swiperSlider';
import PDPVideoModule, { links as pdpVideoModuleStyles } from '../pdpVideoModule';
import { PDPBadges, links as badgesStyles } from '../badges';
import { useStore } from '~/hooks/useStore';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...pdpVideoModuleStyles(),
    ...swiperSliderStyles(),
    ...badgesStyles(),
  ];
};

const PDPGallery = ({
  variants = null,
  productId = 0,
  productImages = [],
  videos = null,
  details,
}) => {

  const { store } = useStore();
  const images = getFilteredImages();

  function getFilteredImages(){

    if ((isShadeFinderRendering() || isConcealerFinderRendering())) {
      
      return getFindersFilteredImages();
      
    } else if (variants?.length <= 1) {

      return getSingleVariantFilteredImages();

    } else if (variants?.length > 1 && store?.productPage?.selectedVariant) {
      
      return getVariantsFilteredImages();

    } else {

      return getDefaultImgs();

    }

  }

  function getSingleVariantFilteredImages() {

    let filteredImage;

    if (store?.productPage?.selectedVariant && store.productPage.selectedVariant !== 0) {

      filteredImage = productImages.filter(img =>
        img?.url?.includes(store.productPage.selectedVariant),
      );

      // setImages([
      //   ...filteredImage,
      //   ...getDefaultImgs(),
      // ]);

    } else {

      filteredImage = productImages.filter(img => img?.url?.includes(productId));
      // setImages([
      //   ...filteredImage,
      //   ...getDefaultImgs(),
      // ]);

    }

    return [
      ...filteredImage,
      ...getDefaultImgs(),
    ];

  }

  function getVariantsFilteredImages() {

    const variant = variants.find(v => v.id === store.productPage.selectedVariant);
    const sizes = ['regular', 'regularsize', 'supersize', 'super size', 'jumbo'];

    let filtersImages = [];
    let colorCode = '';
    let sizeColorCode = '';
    let mergeImages = [];

    if (variant?.title) {

      const getFirstItemFromVariantNameList = variant.title
        .toLowerCase()
        .replace(' ', '')
        ?.split('-')[0];
      const getSecondItemFromVariantNameList = variant.title.replace(' ', '')?.split('-')[1];

      if (getSecondItemFromVariantNameList) {

        if (sizes.indexOf(getFirstItemFromVariantNameList) > 0) {

          const sizeIndex = sizes.indexOf(getFirstItemFromVariantNameList);

          sizeColorCode = sizes[sizeIndex];

        } else {

          const variantInit = variant.title.replace(' ', '')?.split('-')[1].toLowerCase().trim();

          if (variantInit?.split(' / ')[1]) {
            colorCode = variantInit.split(' / ')[0].replace('/', '_').replace(' ', '_');
            const size = sizes.filter(size => {
              return variantInit.includes(size);
            });

            colorCode = 'color_' + colorCode.toLowerCase() + '_shade';
            sizeColorCode = size[0].replace(' ', '').replace('regular', 'regularsize');

          } else {

            colorCode = 'color_' + variantInit.replace('/', '_').replace(' ', '_') + '_shade';

          }

          if (sizeColorCode !== '') {

            filtersImages = productImages.filter(
              img =>
                img?.url.includes(colorCode) &&
                !img?.url.includes(sizeColorCode),
            );

          } else {

            filtersImages = productImages.filter(img => img?.url.includes(colorCode));

          }

        }

        if (colorCode !== '') {

          mergeImages = productImages.filter(
            img =>
              img?.url.includes(colorCode) || img?.url.includes('default'),
          );

        } else {

          mergeImages = productImages.filter(img => img?.url.includes(sizeColorCode));
          mergeImages = mergeImages.concat(
            productImages.filter(img => img?.url.includes('default')),
          );

        }

        if (filtersImages.length < 2) {

          return mergeImages;

        } else {

          return filtersImages;

        }

      }else{

        return getDefaultImgs();
      }

    } else {

      return getDefaultImgs();


    }

  }

  function getFindersFilteredImages() {

    return productImages.filter(img => img?.url.includes(store?.productPage?.selectedVariant));

  }

  function getDefaultImgs() {

    return productImages.filter(img => img?.url.includes('default')).length > 0 ?
      productImages.filter(img => img.url.includes('default'))
      : productImages;

  }

  function isShadeFinderRendering() {

    return variants?.some(variant => variant.title.split(' ')[1] === '30') ?? false;

  }

  function isConcealerFinderRendering() {

    return variants?.some(variant => variant.title.split(' ')[0] === 'shade') ?? false;

  }

  function getImages(imgObj) {
    return (
      <img
        className={'product__image'}
        loading={'lazy'}
        src={imgObj?.url ?? ''}
        alt={imgObj?.altText ?? 'Tula Product'}
        width={imgObj.width ?? '500'}
        height={imgObj?.height ?? '500'}
      />
    );
  }

  return (
    <div className={'gallery'}>
      <div className={'pdpGallerBadgeContainer'}>
        <PDPBadges
          productDetails={details}
          selectedVariant={0}
        />
      </div>
      <div className={'gallery__container'}>
        {
          videos && <PDPGalleryVideo
            productVideo={{
              thumbnail: {
                src: 'https://cdn.shopify.com/s/files/1/1736/9637/files/updated_video_thumbnail_2x_c86fd15e-088c-4e4c-9e7c-192bd742ba2b.png?v=1659104371',
                alt: 'Tula Product Video',
                width: 500,
              },
              src: videos,
            }}
          />
        }
        {
          (
            <SwiperSlider
              classes={'product__image_swiper'}
              data={images?.map(img => getImages(img))}
              selectedVariant={store?.productPage?.selectedVariant}
              loop={true}
            />
          )
        }
      </div>
    </div>
  );
};

const PDPGalleryVideo = ({ productVideo = {} }) => {

  const [shouldVideoShow, setShouldVideoShow] = useState(false);
  const handleShowVideo = useCallback(() => setShouldVideoShow(!shouldVideoShow));

  return (
    <>
      <div id="pdp__video_thumb" className={'video__thumbnail'}>
        <div className={'video__thumbnail__container'} onClick={handleShowVideo}>
          <img
            style={{
              maxWidth: '100%',
            }}
            src={productVideo?.thumbnail?.src}
            alt={productVideo?.thumbnail?.alt}
            width={productVideo?.thumbnail?.width}
          />
          <div className={'pdpGallery_icon__container'}>
            <IconPlay />
          </div>
        </div>
      </div>
      <PDPVideoModule
        shouldVideoShow={shouldVideoShow}
        handleShowVideo={handleShowVideo}
        videoURL={productVideo?.src ?? null}
      />
    </>
  );
};

const IconPlay = ({ color = '#F8F8F8' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="28" viewBox="0 0 23 28" fill="none">
    <path
      d="M21.2858 12.1882L4.12673 0.788007C2.6629 -0.185391 0.683502 0.874159 0.683502 2.62069V25.3918C0.683502 27.1674 2.6629 28.199 4.12673 27.2244L21.2858 15.8243C22.577 14.9941 22.577 13.0473 21.2858 12.1881V12.1882Z"
      fill={color}
    />
  </svg>
);

export default PDPGallery;
