import { useCustomerState } from '~/hooks/useCostumer';
import { switchSliderPanelVisibility } from '../sliderPanel';
import { triggerAnalyticsLoyaltyEvents } from '~/utils/functions/eventFunctions';

import YotpoProductBox, { links as yotpoRedeemProductBoxStyles } from '../yotpoRedeemProductBox';

import styles from './styles.css';


export const links = () => {
    return [
      {
        rel: 'stylesheet', href: styles,
        
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css',
        media: 'screen',
      },
      ...yotpoRedeemProductBoxStyles()];
  };  

const RedeemProductsSection = ({ products = [] }) => {
  const { isLoggedIn } = useCustomerState();

  return (
    <div className={'redeemProductsListContainer'}>
      <div className={'redeemProductItem'}>
          <YotpoProductBox yotpoProducts={products} />
        </div>
        {!isLoggedIn && <YotpoLoginButton />}
        {/* {products && products.map((item) => (
          // <SwiperSlide key={item._id}>
            <div key={item._id} className={styles.redeemProductItem}>
              <YotpoProductBox yotpoProduct={item} />
            </div>
          // </SwiperSlide>
        ))} */}
      {/* </Swiper>

      {!isLoggedIn && <YotpoLoginButton />} */}
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
        triggerAnalyticsLoyaltyEvents('LoginBtnClick', {source: 'landingRedeemProduct'});
    }}
  >
    Login to redeem
  </button>
);
