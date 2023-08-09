import SwiperCore, { Navigation, Autoplay, Pagination, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Autoplay, Pagination, EffectFade, Navigation]);

const SwiperSlider = ({ classes = '', data = [], }) => {
  return (
    <Swiper
      id="pdp-swiper-slider"
      className={`swiper-wrapper swiper-wrapper ${classes}`}
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
      {data.length > 0 &&
        data.map((slide, index) => (
          <SwiperSlide key={`slide-${index}`} className={'swiperSlide'}>
            {slide}
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default SwiperSlider;
