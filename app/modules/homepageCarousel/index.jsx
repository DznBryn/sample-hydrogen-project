import { useEffect } from 'react';
import HomepageCarouselSlideVideo, { links as homepageCarouselSlideVideoStyles } from '../homepageCarouselSlideVideo';
import HomepageCarouselSlideOne, { links as homepageCarouselSlideOneStyles } from '../homepageCarouselSlideOne';
import HomepageCarouselStaticSlide, { links as homepageCarouselStaticSlideStyles } from '../homepageCarouselStaticSlide';
import Swiper from 'swiper';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css' },
    ...homepageCarouselSlideVideoStyles(),
    ...homepageCarouselSlideOneStyles(),
    ...homepageCarouselStaticSlideStyles(),
  ];
};

const HomepageCarousel = ({ carouselSlidesGroup }) => {
  useEffect(() => {

    Swiper.use([Autoplay, Pagination, EffectFade]);

    new Swiper('.swiper', {

      loop: true,
      effect: 'fade',

      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      threshold: 50,

      scrollbar: {
        el: '.swiper-scrollbar',
        type: 'bullets'
      },
    });

  });


  return <div className='hpCarouselWrapper minHeight' >
    <div className='swiper'>
      <div className="swiper-wrapper">
        {carouselSlidesGroup?.slides && carouselSlidesGroup.slides.map((slide) => {
          if (slide.video) {
            return <div className="swiper-slide" key={slide.name}>
              <HomepageCarouselSlideVideo slideContent={slide} />
            </div>;
          } else {
            if (slide.fullWidth) {
              return <div className="swiper-slide" key={slide.name}>
                <HomepageCarouselStaticSlide slideContent={slide} />
              </div>;
            } else {
              return <div className="swiper-slide" key={slide.name}>
                <HomepageCarouselSlideOne slideContent={slide} />
              </div>;
            }
          }

        })}

      </div>

      <div className="swiper-pagination"></div>

    </div>
  </div>;

};

export default HomepageCarousel;
