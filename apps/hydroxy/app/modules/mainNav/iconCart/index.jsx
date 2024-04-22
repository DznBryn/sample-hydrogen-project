import classname from 'classnames';

import styles from './styles.css';
import {useStore} from '~/hooks/useStore';
import {flattenConnection} from '@shopify/hydrogen';
import {getCartQuantity} from '~/utils/functions/eventFunctions';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const classes = {
  cartIconContainer: classname('cart_icon__container'),
  cartListNumber: classname('cart_listNumber'),
};

const IconCart = ({cartConfig}) => {
  const cart = useStore((store) => store?.cart?.data ?? (() => {}));
  const items = cart?.lines ? flattenConnection(cart.lines) : [];
  const toggleCart = useStore((store) => store?.cart?.toggleCart ?? (() => {}));
  const quantity = getTotalItemsOnCart();

  function getTotalItemsOnCart() {
    const GWP_PRODUCT_EXTERNAL_ID = parseInt(
      cartConfig?.freeGiftPromoProductExternalID,
    );

    const IS_GWP_PRODUCT_ON_CART = items.some(
      (product) =>
        product?.merchandise?.id !== undefined &&
        product?.merchandise?.product?.id?.includes(GWP_PRODUCT_EXTERNAL_ID),
    );

    const EXCEPTIONS = [IS_GWP_PRODUCT_ON_CART];

    let total = getCartQuantity(items);

    EXCEPTIONS.forEach((exception) => {
      if (exception) total -= 1;
    });

    return total;
  }
  return (
    <div className={classes.cartIconContainer} onClick={toggleCart}>
      <svg
        role="img"
        width={24}
        height={24}
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Cart</title>
        <path
          d="M24.4517 4.84265C23.9777 4.23706 23.2405 3.86899 22.4776 3.86899H6.44861L5.94893 1.92165C5.65897 0.789632 4.65962 0 3.50086 0H0.816374C0.369126 0 0 0.368074 0 0.816374C0 1.26362 0.368074 1.63275 0.816374 1.63275H3.50086C3.89567 1.63275 4.23806 1.89596 4.34292 2.29077L7.55383 15.0833C7.84378 16.2154 8.84314 17.005 10.0019 17.005H20.5035C21.6612 17.005 22.6883 16.2154 22.9515 15.0833L24.9256 6.97619C25.1097 6.23796 24.9524 5.44833 24.4516 4.84273L24.4517 4.84265ZM23.3207 6.60595L21.3466 14.7131C21.2417 15.1079 20.8994 15.3711 20.5046 15.3711H10.0019C9.60711 15.3711 9.26472 15.1079 9.15986 14.7131L6.87014 5.52758H22.4788C22.742 5.52758 23.0052 5.65919 23.1636 5.86996C23.3209 6.07971 23.399 6.34293 23.3209 6.60614L23.3207 6.60595Z"
          fill="#4C4E56"
        />
        <path
          d="M10.5552 18.0556C9.05507 18.0556 7.8183 19.2924 7.8183 20.7924C7.8183 22.2924 9.05518 23.5293 10.5552 23.5293C12.0553 23.5303 13.292 22.2934 13.292 20.7932C13.292 19.293 12.0551 18.0553 10.5552 18.0553V18.0556ZM10.5552 21.8721C9.94957 21.8721 9.47558 21.3981 9.47558 20.7925C9.47558 20.1869 9.94957 19.7129 10.5552 19.7129C11.1608 19.7129 11.6347 20.1869 11.6347 20.7925C11.6337 21.3724 11.134 21.8721 10.5552 21.8721Z"
          fill="#4C4E56"
        />
        <path
          d="M19.6091 18.0555C18.109 18.0555 16.8722 19.2924 16.8722 20.7924C16.8722 22.2924 18.1091 23.5293 19.6091 23.5293C21.109 23.5293 22.3459 22.2924 22.3459 20.7924C22.3202 19.2933 21.109 18.0555 19.6091 18.0555ZM19.6091 21.8721C19.0035 21.8721 18.5295 21.3981 18.5295 20.7925C18.5295 20.1869 19.0035 19.7129 19.6091 19.7129C20.2147 19.7129 20.6886 20.1869 20.6886 20.7925C20.6886 21.3724 20.1879 21.8721 19.6091 21.8721Z"
          fill="#4C4E56"
        />
      </svg>
      <div className={classes.cartListNumber}>
        {quantity > 9 ? <span>9+</span> : quantity}
      </div>
    </div>
  );
};

export default IconCart;
