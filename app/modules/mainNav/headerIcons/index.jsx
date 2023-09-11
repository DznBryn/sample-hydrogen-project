import { useRef, useEffect } from 'react';
import classname from 'classnames';
import { bindCustomEvent, isAutoCart, getCartQuantity, getCurrency, getCartTotalForFreeShipping } from '~/utils/functions/eventFunctions';
import getApiKeys from '~/utils/functions/getApiKeys';
import { switchSliderPanelVisibility } from '~/modules/sliderPanel';

import IconSearch, { links as iconSearchStyles } from '~/modules/mainNav/iconSearch';
import IconCart, { links as iconCartStyles } from '~/modules/mainNav/iconCart';

import { useCustomerState } from '~/hooks/useCostumer';
import { useCartState } from '~/hooks/useCart';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...iconSearchStyles(),
    ...iconCartStyles(),
  ];
};

const classes = {
  headerIcons: classname('header_icons'),
  iconContainer: classname('icon__container'),
};

const HeaderIcons = ({ cartConfig, hideSearch, fixedRight, lpMinimalHeader, products }) => {

  const cartPageConfig = cartConfig;
  const alertRef = useRef();
  const { items } = useCartState();
  const cart = (useCartState()) ? useCartState() : {};
  const carbonOffsetVariant = getApiKeys().CLOVERLY_ID;
  const carbonOffsetIsOnCart = items.filter(item => item.id === carbonOffsetVariant)[0];
  const quantity = getTotalItemsOnCart();
  const cartTotal = parseFloat(getCartTotalForFreeShipping());
  let progressMsg = null;

  useEffect(() => bindCustomEvent(alertRef, 'data-alert-state', {
    hidden: 'hidden',
    visible: 'visible'
  }));

  
  if (isAutoCart(items)) {
    progressMsg = <p> Enjoy FREE SHIPPING with auto-delivery</p>;
  } else {
    if (cartTotal >= cartPageConfig?.freeShippingThreshold) {
      progressMsg = <p>Congrats! Your order ships free!</p>;
    } else {
      progressMsg = <p>You&apos;re only {getCurrency() + (cartPageConfig?.freeShippingThreshold - parseFloat(cartTotal)).toFixed(2)} away from FREE SHIPPING!</p>;
    }
  }

  const CartAlert = ({ lpMinimalHeader }) => {

    const ID = (lpMinimalHeader ? 'cartAlertMinimalHeader' : '___cartAlert___');

    function shouldForceLift() {

      if (typeof window === 'object') {

        const IS_LANDING_PAGE = window.location.pathname.includes('/tiktok');

        return (IS_LANDING_PAGE);

      }

    }

    return (

      <div id={ID} className={['cartAlert', 'hidden', (shouldForceLift() ? 'forceLift' : '')].join(' ')} ref={alertRef} data-alert-state="hide">

        <div className={'alertText'}>
          <div className={'addItem'}>
            1 item added to cart <span>-</span>
          </div>
          {progressMsg}
        </div>

        <a className={'checkoutButton'} href={cart?.checkoutUrl}>
          Checkout
        </a>

      </div>

    );

  };

  function getTotalItemsOnCart() {

    const GWP_PRODUCT_EXTERNAL_ID = parseInt(cartConfig?.freeGiftPromoProductExternalID);
    const GWP_PRODUCT = products?.products.filter(product => (product.externalId === GWP_PRODUCT_EXTERNAL_ID))[0];
    const GWP_PRODUCT_VARIANT_ID = GWP_PRODUCT?.variants[0].externalId;
    const IS_GWP_PRODUCT_ON_CART = (items.some(product => (product.variant_id !== undefined && product.variant_id === GWP_PRODUCT_VARIANT_ID)));

    const EXCEPTIONS = [carbonOffsetIsOnCart, IS_GWP_PRODUCT_ON_CART];

    let total = getCartQuantity(items);

    EXCEPTIONS.forEach(exception => {
      if (exception) total -= 1;
    });

    return total;

  }

  return (
    <>

      <CartAlert lpMinimalHeader={lpMinimalHeader} />

      {fixedRight === true ?
        <ul id={'headerIcons'} className={'header_icons'}>
          <li className={classname('icon__container', 'account')}><AccIcon /></li>
          {
            hideSearch !== true ?
              <li className={classname('icon__container', 'search')}><IconSearch /></li>
              :
              null
          }
          <li className={classes.iconContainer}><IconCart numberOfItems={quantity} /></li>
        </ul>
        :
        <ul className={classes.headerIcons}>
          <li className={classname('icon__container', 'account')}><AccIcon /></li>
          {
            hideSearch !== true ?
              <li className={classname('icon__container', 'search')}><IconSearch /></li>
              :
              null
          }
          <li className={classes.iconContainer}><IconCart numberOfItems={quantity} /></li>
        </ul>
      }
    </>
  );
};
export default HeaderIcons;

const AccIcon = () => {

  const { isLoggedIn } = useCustomerState();

  return (
    <div className={'accIcon'} onClick={() => switchSliderPanelVisibility('SliderAccount')} style={{ cursor: 'pointer', height: '0' }}>
      {
        (isLoggedIn) ? (
          <svg className={'loggedIn'} width={21} height={21} viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx={14.5} cy={14.5} r={12.5} fill="#47C6D9" /><circle cx={14.5} cy={14.5} r={11.5} fill="#ffffff" /><circle cx={14.5} cy={14.5} r={10.5} fill="#47C6D9" /><g clipPath="url(#clip0_1140_6463)"><path d="M16.966 14.407C18.1679 13.6832 18.9914 12.468 19.2178 11.0834C19.4449 9.6988 19.0518 8.28431 18.1433 7.21518C17.2349 6.14605 15.9027 5.52979 14.4996 5.52979C13.0964 5.52979 11.7643 6.14604 10.8558 7.21518C9.9473 8.28433 9.55423 9.69871 9.78133 11.0834C10.0078 12.4679 10.8312 13.6832 12.0332 14.407C10.5908 14.8573 9.30125 15.696 8.30573 16.8323C7.30963 17.9685 6.64691 19.3571 6.38983 20.8458C6.34667 21.1313 6.53925 21.3996 6.82413 21.4488C7.10902 21.4986 7.38061 21.3113 7.4364 21.0277C7.83019 18.7958 9.25523 16.8813 11.2806 15.864C13.306 14.8466 15.6926 14.8466 17.718 15.864C19.7434 16.8813 21.1685 18.7958 21.5622 21.0277C21.606 21.2827 21.8272 21.4687 22.0855 21.4687C22.116 21.4687 22.1466 21.466 22.1771 21.4607C22.3159 21.4368 22.4401 21.3584 22.5211 21.2429C22.6021 21.128 22.6347 20.9846 22.6101 20.8458C22.3531 19.357 21.6897 17.9684 20.6942 16.8323C19.6981 15.6961 18.4079 14.8567 16.9654 14.4071L16.966 14.407ZM10.7809 10.3124C10.7809 9.32628 11.1727 8.38002 11.8699 7.68268C12.5672 6.98534 13.5135 6.59363 14.4996 6.59363C15.4858 6.59363 16.432 6.98543 17.1294 7.68268C17.8267 8.37994 18.2184 9.32624 18.2184 10.3124C18.2184 11.2986 17.8266 12.2448 17.1294 12.9421C16.4321 13.6395 15.4858 14.0312 14.4996 14.0312C13.5135 14.0312 12.5673 13.6394 11.8699 12.9421C11.1726 12.2449 10.7809 11.2986 10.7809 10.3124Z" fill="white" /></g><defs><clipPath id="clip0_1140_6463"><rect width={17} height={17} fill="white" transform="translate(6 5)" /></clipPath></defs></svg>
        ) : (
          <svg width={24} height={24} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.127 13.834C17.8946 12.7696 19.1055 10.9825 19.4385 8.94626C19.7725 6.91014 19.1944 4.83001 17.8584 3.25776C16.5225 1.68551 14.5634 0.779236 12.4999 0.779236C10.4364 0.779236 8.47744 1.68549 7.14143 3.25776C5.80543 4.83004 5.22738 6.91001 5.56136 8.94626C5.89436 10.9824 7.10531 12.7695 8.87286 13.834C6.75176 14.4961 4.85536 15.7295 3.39136 17.4005C1.92651 19.0714 0.951908 21.1135 0.573858 23.3028C0.51038 23.7227 0.793586 24.1172 1.21253 24.1895C1.63148 24.2627 2.03088 23.9873 2.11293 23.5703C2.69203 20.2881 4.78768 17.4726 7.76618 15.9766C10.7447 14.4805 14.2544 14.4805 17.2329 15.9766C20.2114 17.4727 22.3072 20.2881 22.8862 23.5703C22.9506 23.9453 23.2758 24.2188 23.6557 24.2188C23.7006 24.2188 23.7456 24.2149 23.7905 24.2071C23.9946 24.1719 24.1772 24.0567 24.2963 23.8868C24.4155 23.7178 24.4633 23.5069 24.4272 23.3028C24.0493 21.1133 23.0737 19.0713 21.6097 17.4005C20.1448 15.7296 18.2474 14.4953 16.1262 13.834L16.127 13.834ZM7.03126 7.81251C7.03126 6.36231 7.60743 4.97076 8.63281 3.94526C9.65819 2.91976 11.0498 2.34371 12.5001 2.34371C13.9503 2.34371 15.3418 2.91989 16.3673 3.94526C17.3928 4.97064 17.9689 6.36226 17.9689 7.81251C17.9689 9.26276 17.3927 10.6543 16.3673 11.6798C15.3419 12.7053 13.9503 13.2813 12.5001 13.2813C11.0498 13.2813 9.65831 12.7051 8.63281 11.6798C7.60731 10.6544 7.03126 9.26276 7.03126 7.81251Z" fill="#4C4E56" /></svg>
        )
      }
    </div>
  );

};