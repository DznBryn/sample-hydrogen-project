import { useState, useEffect } from 'react';
import { useInventory } from '~/hooks/useInventory';
import { useCustomerState } from '~/hooks/useCostumer';
import { useCartState , useCartActions } from '~/hooks/useCart';
import getApiKeys from '~/utils/functions/getApiKeys';
import { switchSliderPanelVisibility } from '../sliderPanel';
import { triggerAnalyticsProductClick, createCustomEvent } from '~/utils/functions/eventFunctions';

import classnames from 'classnames';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

// Button states
const IDLE = 'idle';
const LOADING = 'loading';
const SOLD_OUT = 'sold out';
const SELECT_SHADE = 'select shade';
const ERROR = 'error';
const LOCKED = 'Sign in to buy';

// Error message duration
const TIMER = 3 * 1000;

const PDPAddToCart = ({
  addItem = { variantId: 0, quantity: 0, sellingPlanID: 0 },
  forceSoldOut = false,
  displayPrice,
  classes = [],
  analytics = null,
  onClick = null,
  exclusiveProductAtcColor,
  exclusiveProductTextColor,
  isGated,
  fromPLP = false
}) => {
  const { products, status } = useInventory({ ids: [addItem?.variantId] });
  const [buttonState, setButtonState] = useState(IDLE);
  const { id, items } = useCartState();
  const { addItems } = useCartActions();
  const [product, setProduct] = useState(null);

  const { isLoggedIn } = useCustomerState();

  useEffect(

    function setSoldOutStateIfItemIsNotAvailable() {

      if (Object.keys(addItem.product).length > 0 && addItem.variantId === 0) {
        setButtonState(SELECT_SHADE);
      } else {
        setButtonState(IDLE);
      }

      if (isGated && !isLoggedIn) {
        return setButtonState(LOCKED);
      }

      if (addItem.product) {
        setProduct(addItem.product);
      }
      if (status === LOADING || status === ERROR) return;

      if (addItem.variantId !== 0 && addItem.product?.variants?.length > 0) {
        if (typeof products !== 'undefined') {
          const key = Object.keys(products)[0];
          const inventory = products[key];

          if (!isAvailableForSale(inventory)) {
            setButtonState(SOLD_OUT);
          } else {
            setButtonState(IDLE);
          }
        }
      }
      if (forceSoldOut) setButtonState(SOLD_OUT);
    },
    [status, addItem.variantId, addItem.sellingPlanID, isLoggedIn],
  );

  function isAvailableForSale(inventory) {
    if (typeof inventory?.availableForSale !== 'undefined') return inventory?.availableForSale;

    if (typeof inventory?.quantity !== 'undefined') return inventory?.quantity > 1;

    return false;
  }

  const clearError = () => {
    setButtonState(IDLE);
  };

  const handleAddItemToCart = async () => {
    setButtonState(LOADING);
    try {

      const itemsToAdd =
        addItem.sellingPlanID === 0 || addItem.sellingPlanID === null
          ? [
            {
              id: addItem.variantId,
              quantity: addItem.quantity,
            },
          ]
          : [
            {
              id: addItem.variantId,
              quantity: addItem.quantity,
              ['selling_plan']: addItem.sellingPlanID,
            },
          ];

      await addItems(itemsToAdd);

      if (addItem.sellingPlanID !== 0) {
        const OG_STATE = {
          sessionId: id,
          optedin: [
            { id: '8419474538542', frequency: '2_3' },
            { id: '35292334273', frequency: '2_3' },
            { id: '39450381320238', frequency: '2_3' },
            { id: '33187649665', frequency: '3_3' },
          ],
          optedout: [],
          productOffer: {},
          firstOrderPlaceDate: {},
          productToSubscribe: {},
        };
        OG_STATE.productOffer[addItem.variantId.toString()] = [getApiKeys().OG_KEY];
        items.forEach(item => {
          if (item.selling_plan_allocation !== undefined) {
            OG_STATE.productOffer[item.variant_id] = [getApiKeys().OG_KEY];
          }
        });
        window.localStorage.setItem('OG_STATE', JSON.stringify(OG_STATE));
      }

      const alertEvent = createCustomEvent();

      if (document.querySelector('[data-alert-state]').getAttribute('data-alert-state') === 'hide') {
        document.querySelector('[data-alert-state]').setAttribute('data-alert-state', 'show');
        document.querySelector('[data-alert-state]').dispatchEvent(alertEvent);

        setTimeout(() => {
          document.querySelector('[data-alert-state]').setAttribute('data-alert-state', 'hide');
          document.querySelector('[data-alert-state]').dispatchEvent(alertEvent);
        }, 4000);
      }

      setButtonState(IDLE);

    } catch (e) {
      setButtonState(ERROR);
      setTimeout(clearError, TIMER);
    }

    if (window?.postscript) {
      window.postscript.event('add_to_cart', {
        'shop_id': getApiKeys().POSTSCRIPT.shopId, // your Postscript Shop ID
        'url': window.location.href, // the current page
        'search_params': { 'variant': `${addItem.variantId}` },
        'page_type': 'product',
        'referrer': document.referrer, // the referring page
        'resource': { // information about the product
          'category': `${addItem.product.type}`,
          'name': `${addItem.product.name}`,
          'price_in_cents':
            addItem.product.price
              ? addItem.product.price
              : (product.variants.find(item => item.externalId === addItem.variantId).price * 100)
          ,
          'resource_id': addItem.variantId,
          'resource_type': 'product',
          'sku': `${addItem.variantId.sku}`,
          'variant_id': addItem.product?.id ? addItem.product.id : addItem.product.externalId,
          'vendor': 'TULA Skincare'
        }
      });
    }

    if (window?.dataLayer) {
      analytics !== null && triggerAnalyticsProductClick(analytics);
      window.dataLayer.push({
        event: 'addToCart',
        ecommerce: {
          currencyCode: 'USD',
          add: {
            products: [
              {
                name: `${addItem.product.name}`,
                id: `${addItem.product?.id ? addItem.product.id : addItem.product.externalId}`,
                price: `${addItem.product.price
                  ? (addItem.product.price / 100).toFixed(2)
                  : product.variants.find(item => item.externalId === addItem.variantId).price.toFixed(2)
                }`,
                brand: 'TULA Skincare',
                category: `${addItem.product.type}`,
                variant: `${addItem.variantId}`,
                quantity: addItem.quantity,
                dimension10: `${addItem.sellingPlanID === 0 ? 'non_subscription' : 'subscription'
                }`,
              },
            ],
          },
        },
      });
    }
  };

  const loadingBtnStylesForExclusiveProducts = {
    color: exclusiveProductTextColor,
    borderColor: exclusiveProductTextColor,
    background: 'transparent'
  };

  const atcStylesForExclusiveProducts = fromPLP ? 'plpExclusive' : 'exclusive';

  return buttonState === LOADING ? (
    <div className={'addToCart__container'}>
      <button
        className={classes.length > 0 ? classnames(classes, 'add_to_cart') : 'add_to_cart'}
        style={exclusiveProductAtcColor && !fromPLP ? loadingBtnStylesForExclusiveProducts : {}}
      >
        <span>Loading...</span>
      </button>
    </div>
  ) : buttonState === SOLD_OUT ? (
    <div className={'addToCart__container'}>
      <button className={['add_to_cart', 'disabled'].join(' ')} disabled>
        <span>Sold out</span>
      </button>
    </div>
  ) : buttonState === SELECT_SHADE ? (
    <div className={'addToCart__container'}>
      <button className={['add_to_cart', 'disabled'].join(' ')} disabled>
        <span>Select Shade</span>
      </button>
    </div>
  ) : buttonState === ERROR ? (
    <div className={'addToCart__container'}>
      <button
        className={classes.length > 0 ? classnames(classes, 'add_to_cart') : 'add_to_cart'}
        onClick={() => clearError()}
      >
        <span>Sorry, checkout is down</span>
      </button>
    </div>
  ) : buttonState === LOCKED ? (
    <div className={'addToCart__container'}>
      <button
        className={classes.length > 0 ? classnames(classes, 'add_to_cart', exclusiveProductAtcColor && atcStylesForExclusiveProducts) : exclusiveProductAtcColor ? classnames('add_to_cart', atcStylesForExclusiveProducts) : 'add_to_cart'}
        style={{ background: fromPLP ? '#48c6d9' : exclusiveProductAtcColor }}
        onClick={() => switchSliderPanelVisibility('SliderAccount')}
      >
        <span><Padlock /> {LOCKED}</span>
      </button>
    </div>
  ) : (
    <div className={'addToCart__container'}>
      <button
        className={classes.length > 0 ? classnames(classes, 'add_to_cart', exclusiveProductAtcColor && atcStylesForExclusiveProducts) : exclusiveProductAtcColor ? classnames('add_to_cart', atcStylesForExclusiveProducts) : 'add_to_cart'}
        onClick={e => { handleAddItemToCart(e); if (onClick) onClick(); }}
        style={{ background: fromPLP ? '#48c6d9' : exclusiveProductAtcColor }}
      >
        {displayPrice === true ? (
          <span>Add To Cart - ${addItem.product.price / 100}</span>
        ) : (
          <span>Add To Cart</span>
        )}
      </button>
    </div>
  );
};

export default PDPAddToCart;

const Padlock = () => (
  <svg
    width={10}
    height={13}
    viewBox="0 0 10 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.48649 12.3335C1.16566 12.3335 0.890908 12.2192 0.662242 11.9905C0.433575 11.7618 0.319436 11.4873 0.319825 11.1668V5.3335C0.319825 5.01266 0.434158 4.73791 0.662825 4.50925C0.891492 4.28058 1.16605 4.16644 1.48649 4.16683H2.06983V3.00016C2.06983 2.19322 2.3543 1.50527 2.92324 0.93633C3.49219 0.367385 4.17994 0.0831076 4.98649 0.0834965C5.79344 0.0834965 6.48138 0.367969 7.05033 0.936913C7.61927 1.50586 7.90355 2.19361 7.90316 3.00016V4.16683H8.48649C8.80733 4.16683 9.08208 4.28116 9.31074 4.50983C9.53941 4.7385 9.65355 5.01305 9.65316 5.3335V11.1668C9.65316 11.4877 9.53883 11.7624 9.31016 11.9911C9.08149 12.2197 8.80694 12.3339 8.48649 12.3335H1.48649ZM1.48649 11.1668H8.48649V5.3335H1.48649V11.1668ZM4.98649 9.41683C5.30733 9.41683 5.58208 9.3025 5.81074 9.07383C6.03941 8.84516 6.15355 8.57061 6.15316 8.25016C6.15316 7.92933 6.03883 7.65458 5.81016 7.42591C5.58149 7.19725 5.30694 7.08311 4.98649 7.0835C4.66566 7.0835 4.39091 7.19783 4.16224 7.4265C3.93358 7.65516 3.81944 7.92972 3.81983 8.25016C3.81983 8.571 3.93416 8.84575 4.16283 9.07441C4.39149 9.30308 4.66605 9.41722 4.98649 9.41683ZM3.23649 4.16683H6.73649V3.00016C6.73649 2.51405 6.56635 2.10086 6.22608 1.76058C5.8858 1.4203 5.4726 1.25016 4.98649 1.25016C4.50038 1.25016 4.08719 1.4203 3.74691 1.76058C3.40663 2.10086 3.23649 2.51405 3.23649 3.00016V4.16683Z"
      fill="white"
    />
  </svg>
);