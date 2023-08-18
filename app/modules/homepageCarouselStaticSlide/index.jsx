import { Link } from '@remix-run/react';
import PortableTextCustom from '../portableTextCustom';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const HomepageCarouselStaticSlide = (slideContent) => {
  const textColors = {
    eyeBrowColor: slideContent.slideContent.slideEyebrowFontColorHex ? slideContent.slideContent.slideEyebrowFontColorHex : '#FFF',
    headerColor: slideContent.slideContent.slideHeaderFontColorHex ? slideContent.slideContent.slideHeaderFontColorHex : '#FFF',
    copyColor: slideContent.slideContent.slideCopyFontColorHex ? slideContent.slideContent.slideCopyFontColorHex : '#FFF',
    ctaColor: slideContent.slideContent.slideCtaFontColorHex ? slideContent.slideContent.slideCtaFontColorHex : '#FFF'
  };

  const desktopImage = slideContent.slideContent.fullWidthImage.asset.url;
  const mobileImage = slideContent.slideContent.fullWidthMobileImage.asset.url;

  const css = `@media (max-width: 500px) {
    .backimage${slideContent.slideContent.fullWidthImage.asset._id} {
        background-image: url(${mobileImage})
    }
  }
  @media (min-width: 501px) {
      .backimage${slideContent.slideContent.fullWidthImage.asset._id} {
          background-image: url(${desktopImage})
      }
  }`;

  return (
    <div className={'slideWrapper'}>
      <Link to={slideContent.slideContent.slideCtaLink}>
        <style>{css}</style>
        <div className={['hpStaticSlide', 'backimage' + slideContent.slideContent.fullWidthImage.asset._id].join(' ')}>
          <div className={'textWrapper'}>
            <h1 className={'eyebrow'} style={{ color: textColors.eyeBrowColor }}>
              {slideContent.slideContent.slideEyebrowText}
            </h1>
            <h1 style={{ color: textColors.headerColor }}>
              {slideContent.slideContent.slideHeader}
            </h1>

            <div className={'slideCopy'} style={{ color: textColors.copyColor }} >
              <PortableTextCustom value={slideContent.slideContent.slideCopyRaw}/>
            </div>

            <button className={'btnClear'} style={{ color: slideContent.slideCtaFontColorHex, backgroundColor: slideContent.slideCtaBGColorHex }}>
              {slideContent.slideContent.slideCta}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default HomepageCarouselStaticSlide;
