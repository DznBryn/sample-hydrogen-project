import { Link } from '@remix-run/react';
import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const isMobile = (typeof navigator === 'object') && (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

const HomepageCarouselSlideVideo = (slideContent) => {

  return (
    <a href={slideContent.slideContent.videoSlideCtaLink}>
      <div className={'hpVideoSlide'}>
        <div className={'videoContent'}>
          {/*<video autoPlay loop muted webkitPlaysInline playsInline preload="auto" loading="eager">*/}
          <video autoPlay loop muted playsInline poster={slideContent.slideContent.video.posterUrl}>
            {
              isMobile ?
                <source src={slideContent.slideContent.video.src} />
                : <source src={'https://cdn.shopify.com/videos/c/o/v/22c46a1276f4425eba84fe6295f14942.mp4'} />
            }
          </video>
        </div>
        <div className={'textWrapper'}>
          <h1 className={'videoHeader'}>{slideContent.slideContent.videoSlideHeader}</h1>
          <p className={'videoCopy'}>{slideContent.slideContent.videoSlideCopy}</p>
          {
            slideContent.slideContent.videoSlideCta &&
            <Link to={slideContent.slideContent.videoSlideCtaGoTo}>
              <div className={'videoBtn'}>
                <div className={'btnClear'}>{slideContent.slideContent.videoSlideCta}</div>
              </div>
            </Link>
          }
        </div>
      </div>
    </a>
  );
};
export default HomepageCarouselSlideVideo;