import { useFetcher, useMatches } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { switchSliderPanelVisibility } from '../sliderPanel';
import { Padlock } from '../icons';
import styles from './styles.css';
import { useInventory } from '~/hooks/useInventory';
import { useCustomerState } from '~/hooks/useCostumer';

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
  analytics = null,
  onClick = null,
  displayPrice,
  exclusiveProductAtcColor,
  exclusiveProductTextColor,
  isGated = false,
  fromPLP = false,
}) {
  const [root] = useMatches();
  const selectedLocale = root.data.selectedLocale;
  const addToCart = useFetcher();
  const { quantity, availableForSale } = useInventory({ id: addItem?.variantId, slug: addItem?.slug });
  const { isLoggedIn } = useCustomerState;
  const [buttonState, setButtonState] = useState(IDLE);
  const loadingBtnStylesForExclusiveProducts = {
    color: exclusiveProductTextColor,
    borderColor: exclusiveProductTextColor,
    background: 'transparent',
  };
  const atcStylesForExclusiveProducts = fromPLP ? 'plpExclusive' : 'exclusive';
  const lineItems = [{ merchandiseId: addItem?.variantId, quantity: 1 }];

  useEffect(() => {
    if (quantity === 0 || !availableForSale || forceSoldOut) {
      setButtonState(SOLD_OUT);
    } else if (isGated && !isLoggedIn) {
      setButtonState(LOCKED);
    } else if (addItem?.variantId && addItem?.variantId === 0) {
      setButtonState(SELECT_SHADE);
    } else if (addToCart?.state === 'loading') {
      setButtonState(LOADING);
    } else if (addToCart?.type && addToCart?.type === 'done' && addToCart?.data?.errors?.length > 0) {
      setButtonState(ERROR);
    } else if (quantity > 0 && availableForSale && buttonState !== IDLE) {
      setButtonState(IDLE);
    }

    return () => { };
  }, [quantity, isLoggedIn, addToCart.state]);


  const clearError = () => setButtonState(IDLE);

  const mapStateToButton = {
    [IDLE]: <addToCart.Form action="/cart" method="post">
      <input type="hidden" name="cartAction" value={addItem?.action ?? 'UPDATE_CART'} />
      <input
        type="hidden"
        name="countryCode"
        value={selectedLocale?.country ?? 'US'}
      />
      <input type="hidden" name="lines" value={JSON.stringify(lineItems)} />
      <div className="addToCart__container">
        <button
          className={`${classes.join(' ')}add_to_cart${exclusiveProductAtcColor ? atcStylesForExclusiveProducts
            : ''}`}
          style={{ background: fromPLP ? '#48c6d9' : exclusiveProductAtcColor }}
          type="submit"
          disabled={addToCart?.state === 'submitting'}
        >
          <span>
            {displayPrice === true ? `Add To Cart - ${3400 / 100}` : 'Add To Cart'}
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
