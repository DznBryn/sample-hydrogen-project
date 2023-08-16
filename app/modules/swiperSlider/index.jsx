import { Navigation, Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css' },
  ];
};

const SwiperSlider = ({ classes = '', data = [], }) => {

  return (
    data.length > 0 && <Swiper
      id="pdp-swiper-slider"
      className={`swiper-wrapper pdp-swiper-wrapper ${classes}`}
      modules={[Autoplay, Pagination, EffectFade, Navigation]}
      wrapperTag="div"
      pagination={{ ...Pagination, clickable: true }}
      navigation
      centeredSlides={true}
      slidesPerView={'auto'}
      onSwiper={(swiper) => {
        swiper.on('slideChange', function () {
          if (swiper.activeIndex === 1 || swiper.activeIndex === (data.length + 1)) {
            document.getElementById('pdp__video_thumb')?.classList?.remove('hidePdpVideo');
          } else {
            document.getElementById('pdp__video_thumb')?.classList?.add('hidePdpVideo');
          }
        });
      }
      }
    >
      {
        data.map((slide, index) => (
          <SwiperSlide key={`slide-${index}`} className={'swiperSlide'}>
            {slide}
          </SwiperSlide>
        ))}
    </Swiper>
  );

};

export default SwiperSlider;
