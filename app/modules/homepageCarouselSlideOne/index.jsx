import { Link } from '@remix-run/react';
import PortableTextCustom from '../portableTextCustom';

import styles from './styles.css';

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

const HomepageCarouselSlideOne = ({ slideContent }) => {
  return (
    <div className={'slideWrapper'}>
      <Link href={slideContent.slideCtaLink}>
        <div className={'slideOneWrapper'}>
          <div className={'hpVideo'}>
            <div className={'left'} style={{ backgroundColor: slideContent.slideBGColorHex }}>
              <h1 className={'eyebrow'}
                style={{ color: slideContent.slideEyebrowFontColorHex }}
              >{slideContent.slideEyebrowText}</h1>
              <h1
                style={{ color: slideContent.slideHeaderFontColorHex }}
              >{slideContent.slideHeader}</h1>

              <p style={{ color: slideContent.slideCopyFontColorHex }}>
                <PortableTextCustom value={slideContent.slideCopyRaw}/>
              </p>
                
              <button
                className={'btn'}
                style={{ color: slideContent.slideCtaFontColorHex, backgroundColor: slideContent.slideCtaBGColorHex }}>
                {slideContent.slideCta}
              </button>
            </div>
            <div
              style={{backgroundImage: `url(${slideContent.slideImage.asset.url})`}}
              className={'right desktop'}
            />
            <div
              style={{backgroundImage: `url(${slideContent.slideImage.asset.url})`}}
              className={'right mobile'}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HomepageCarouselSlideOne;
