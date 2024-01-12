import {useEffect, useRef, useState} from 'react';
import {switchSliderPanelVisibility} from '../sliderPanel';
import {triggerAnalyticsLoyaltyEvents} from '~/utils/functions/eventFunctions';
import YotpoProductBox, {
  links as yotpoRedeemProductBoxStyles,
} from '../yotpoRedeemProductBox';
import {Swiper, SwiperSlide} from 'swiper/react';
import styles from './styles.css';
import {Navigation, Pagination} from 'swiper/modules';
import {useCustomerState} from '~/hooks/useCostumer';

import swiperStyles from 'swiper/css';
import swiperNavigationStyles from 'swiper/css/navigation';
import swiperPaginationStyles from 'swiper/css/pagination';
import {isArray} from '@apollo/client/utilities';

export const links = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
    {
      rel: 'stylesheet',
      href: swiperStyles,
    },
    {
      rel: 'stylesheet',
      href: swiperNavigationStyles,
    },
    {
      rel: 'stylesheet',
      href: swiperPaginationStyles,
    },
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css',
      media: 'screen',
    },
    ...yotpoRedeemProductBoxStyles(),
  ];
};

const RedeemProductsSection = (props) => {
  const [isProductsLoaded, SetIsProductLoaded] = useState(false);

  useEffect(() => {
    if (props?.products && isArray(props.products)) {
      SetIsProductLoaded(true);
    }
  }, [props]);

  const [buttonDisabled, setButtonDisabled] = useState('prev');
  const navigationNextRef = useRef(null);
  const navigationPrevRef = useRef(null);
  const swiperRef = useRef(null);

  const {isLoggedIn} = useCustomerState();
  function handleMovePrevSlide() {
    swiperRef.current?.swiper?.slidePrev();
    if (swiperRef.current?.isBeginning) {
      setButtonDisabled('prev');
    } else {
      buttonDisabled !== null && setButtonDisabled(null);
    }
  }

  function handleMoveNextSlide() {
    swiperRef.current?.swiper?.slideNext();
    if (swiperRef.current?.isEnd) {
      setButtonDisabled('next');
    } else {
      buttonDisabled !== null && setButtonDisabled(null);
    }
  }

  const isPrevDisabled = buttonDisabled === 'prev';
  const isNextDisabled = buttonDisabled === 'next';

  return (
    <div className={'redeemProductsListContainer'}>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        observer={true}
        observeParents={true}
        className={'swiperContainer'}
        spaceBetween={15}
        slidesPerView={2}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onInit={(swiper) => {
          (swiper.params.navigation.prevEl = navigationPrevRef.current),
            (swiper.params.navigation.nextEl = navigationNextRef.current);

          swiper.navigation.update();
        }}
        breakpoints={{
          500: {
            slidesPerView: 4,
            spaceBetween: 27,
          },
        }}
      >
        {isProductsLoaded
          ? props?.products.map((item, i) => (
              <SwiperSlide key={i}>
                <div className={'redeemProductItem'}>
                  <YotpoProductBox
                    yotpoProduct={item}
                    teste={props?.products}
                  />
                </div>
              </SwiperSlide>
            ))
          : null}
      </Swiper>
      <div className={'arrowsContainer'}>
        <button
          id="prev-btn"
          ref={navigationPrevRef}
          disabled={isPrevDisabled}
          onClick={handleMovePrevSlide}
        >
          <LeftArrow />
        </button>
        <button
          id="next-btn"
          ref={navigationNextRef}
          disabled={isNextDisabled}
          onClick={handleMoveNextSlide}
        >
          <RightArrow />
        </button>
      </div>
      {!isLoggedIn && <YotpoLoginButton />}
    </div>
  );
};

export default RedeemProductsSection;

const YotpoLoginButton = () => (
  <button
    className={'yotpoLoginButton'}
    type="button"
    onClick={() => {
      switchSliderPanelVisibility('SliderAccount');
      triggerAnalyticsLoyaltyEvents('LoginBtnClick', {
        source: 'landingRedeemProduct',
      });
    }}
  >
    Login to redeem
  </button>
);

const RightArrow = () => (
  <svg
    width={37}
    height={37}
    viewBox="0 0 37 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.2529 18.5H24.7479"
      stroke="#47C6D9"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.5 12.2524L24.7475 18.4999L18.5 24.7474"
      stroke="#47C6D9"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LeftArrow = () => (
  <svg
    width={37}
    height={37}
    viewBox="0 0 37 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24.7471 18.5L12.2521 18.5"
      stroke="#47C6D9"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.5 24.7476L12.2525 18.5001L18.5 12.2526"
      stroke="#47C6D9"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
