import { useFetcher, useMatches } from '@remix-run/react';
import { useState } from 'react';
import { switchSliderPanelVisibility } from '../sliderPanel';
import { Padlock } from '../icons';
import { useCustomerState } from '~/hooks/useCostumer';
import { createCustomEvent, useLayoutEffect } from '~/utils/functions/eventFunctions';

import styles from './styles.css';
import { API_METHODS } from '~/utils/constants';
import { useStore } from '~/hooks/useStore';
import { useCartState } from '~/hooks/useCart';
import getApiKeys from '~/utils/functions/getApiKeys';

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

const IDLE = 'idle';
const LOADING = 'loading';
const SOLD_OUT = 'sold out';
const SELECT_SHADE = 'select shade';
const ERROR = 'error';
const LOCKED = 'sign in to buy';

export default function PDPAddToCart({
  addItem,
  classes = [],
  forceSoldOut = false,
  displayPrice,
  exclusiveProductAtcColor,
  exclusiveProductTextColor,
  isGated = false,
  fromPLP = false,
  availableForSale,
}) {
  const [root] = useMatches();
  const { setData: setCartData = () => { }, data = null } = useStore(store => store?.cart ?? null);
  const selectedLocale = root.data.selectedLocale;
  const addToCart = useFetcher();

  const {id, items} = useCartState();
  const { isLoggedIn } = useCustomerState();
  const [buttonState, setButtonState] = useState(IDLE);
  const loadingBtnStylesForExclusiveProducts = {
    color: exclusiveProductTextColor,
    borderColor: exclusiveProductTextColor,
    background: 'transparent',
  };
  const atcStylesForExclusiveProducts = fromPLP ? 'plpExclusive' : 'pdpExclusive';
  const lineItems = [{ merchandiseId: addItem?.variantId, quantity: addItem?.quantity || 1 }];

  useLayoutEffect(() => {

    if (addItem?.quantity === 0 || !availableForSale || forceSoldOut) {
      setButtonState(SOLD_OUT);
    } else if (isGated && !isLoggedIn) {
      setButtonState(LOCKED);
    } else if (addItem?.variantId === 0) {
      setButtonState(SELECT_SHADE);
    } else if (addToCart?.state === 'loading') {
      setButtonState(LOADING);
    } else if (addToCart?.type && addToCart?.type === 'done' && addToCart?.data?.errors?.length > 0) {
      setButtonState(ERROR);
    } else if (addItem?.quantity > 0 && availableForSale && buttonState !== IDLE) {
      if (addToCart.data && addToCart.type === 'done') {
        updateOGState();
        dispatchAlertEvent();
        if (root?.data?.cart?.totalQuantity !== data?.totalQuantity) {
          setCartData(root.data.cart);
        }
      }
      setButtonState(IDLE);
    }

    return () => { };
  }, [addItem?.quantity, addItem?.variantId, isLoggedIn, addToCart.data, addToCart.state, addToCart?.type, availableForSale, isGated, buttonState]);

  function dispatchAlertEvent() {

    const alertEvent = createCustomEvent();

    if (document.querySelector('[data-alert-state]').getAttribute('data-alert-state') === 'hide') {
      document.querySelector('[data-alert-state]').setAttribute('data-alert-state', 'show');
      document.querySelector('[data-alert-state]').dispatchEvent(alertEvent);

      setTimeout(() => {
        document.querySelector('[data-alert-state]').setAttribute('data-alert-state', 'hide');
        document.querySelector('[data-alert-state]').dispatchEvent(alertEvent);
      }, 4000);
    }

  }

  function updateOGState() {

    if (addItem.selling_plan_id !== 0) {
      
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
        if (item.selling_plan_allocation) {
          OG_STATE.productOffer[item.variant_id] = [getApiKeys().OG_KEY];
        }
      });
      
      if(typeof window === 'object') {
      
        window.localStorage.setItem('OG_STATE', JSON.stringify(OG_STATE));
      
      }
    }

  }

  const clearError = () => setButtonState(IDLE);

  const mapStateToButton = {
    [IDLE]: <addToCart.Form action="/cart" method={API_METHODS.POST}>
      <input type="hidden" name="cartAction" value={addItem?.action ?? 'ADD_TO_CART'} />
      <input
        type="hidden"
        name="countryCode"
        value={selectedLocale?.country ?? 'US'}
      />
      <input type="hidden" name="lines" value={JSON.stringify(lineItems)} />
      <div className="addToCart__container">
        <button
          className={`${classes.join(' ')} add_to_cart ${exclusiveProductAtcColor ? atcStylesForExclusiveProducts
            : ''}`}
          style={{ background: fromPLP ? '#48c6d9' : exclusiveProductAtcColor }}
          type="submit"
          disabled={addToCart?.state === 'submitting'}
        >
          <span>
            {(displayPrice === true && addItem?.product?.price) ? `Add To Cart - $${addItem?.product?.price}` : 'Add To Cart'}
          </span>
        </button>
      </div>
    </addToCart.Form>,
    [LOADING]: <div className="addToCart__container">
      <button
        className={`${classes.join(' ')} add_to_cart`}
        style={
          exclusiveProductAtcColor && !fromPLP
            ? loadingBtnStylesForExclusiveProducts
            : {}
        }
        disabled
      >
        <span>Loading...</span>
      </button>
    </div>,
    [SOLD_OUT]: <div className="addToCart__container">
      <button className={'add_to_cart disabled'} disabled>
        <span>{buttonState === SOLD_OUT ? 'Sold out' : 'Select Shade'}</span>
      </button>
    </div>,
    [ERROR]: <div className="addToCart__container">
      <button
        className={`${classes.join(' ')} add_to_cart `}
        onClick={clearError}
      >
        <span>Sorry, checkout is down</span>
      </button>
    </div>,
    [LOCKED]: <div className={'addToCart__container'}>
      <button
        className={`${classes.join(' ')} add_to_cart ${exclusiveProductAtcColor && atcStylesForExclusiveProducts
        } `}
        style={{ background: fromPLP ? '#48c6d9' : exclusiveProductAtcColor }}
        onClick={() => switchSliderPanelVisibility('SliderAccount')}
      >
        <span>
          <Padlock /> {LOCKED}
        </span>
      </button>
    </div>
  };

  return buttonState === SOLD_OUT || buttonState === SELECT_SHADE ? mapStateToButton[SOLD_OUT] : mapStateToButton[buttonState];

}