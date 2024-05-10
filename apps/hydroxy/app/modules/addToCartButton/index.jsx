import {useFetcher, useMatches} from '@remix-run/react';
import {useEffect, useState} from 'react';
import {switchSliderPanelVisibility} from '../sliderPanel';
import {Padlock} from '../icons';
import {useCustomer} from '~/hooks/useCustomer';
import {
  createCustomEvent,
  getIdFromGid,
} from '~/utils/functions/eventFunctions';
import {API_METHODS, FETCHER} from '~/utils/constants';
import {useStore} from '~/hooks/useStore';
import {useCartState} from '~/hooks/useCart';
import {useRouteLoaderData} from '@remix-run/react';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
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
  content,
}) {
  const rootData = useRouteLoaderData('root');
  const [root] = useMatches();
  const {setData: setCartData = () => {}, data = null} = useStore(
    (store) => store?.cart ?? null,
  );

  const selectedLocale = root.data.selectedLocale;
  const addToCart = useFetcher();

  const {id, items} = useCartState();
  const {isLoggedIn} = useCustomer();
  const [buttonState, setButtonState] = useState(IDLE);
  const loadingBtnStylesForExclusiveProducts = {
    color: exclusiveProductTextColor,
    borderColor: exclusiveProductTextColor,
    background: 'transparent',
  };
  const atcStylesForExclusiveProducts = fromPLP
    ? 'plpExclusive'
    : 'pdpExclusive';
  const lineItems = [
    {
      merchandiseId: addItem?.variantId,
      quantity: addItem?.quantity || 1,
      sellingPlanId: addItem?.selling_plan_id
        ? `gid://shopify/SellingPlan/${addItem?.selling_plan_id}`
        : null,
    },
  ];

  useEffect(() => {
    if (addItem?.quantity === 0 || availableForSale === false || forceSoldOut) {
      setButtonState(SOLD_OUT);
    } else if (isGated && !isLoggedIn) {
      setButtonState(LOCKED);
    } else if (!addItem?.variantId || addItem?.variantId === 0) {
      setButtonState(SELECT_SHADE);
    } else if (addToCart?.state === FETCHER.STATE.SUBMIT) {
      setButtonState(LOADING);
    } else if (
      addToCart?.type &&
      addToCart?.type === 'done' &&
      addToCart?.data?.errors?.length > 0
    ) {
      setButtonState(ERROR);
    } else if (
      addItem?.quantity > 0 &&
      availableForSale &&
      buttonState !== IDLE
    ) {
      if (
        addToCart.data?.cart &&
        addToCart.data?.cart?.totalQuantity !== data?.totalQuantity &&
        addToCart.type === FETCHER.TYPE.ACTION_RELOAD
      ) {
        updateOGState();
        dispatchAlertEvent();
        setCartData(addToCart.data.cart);

        const product = addItem?.product || null;

        if (window.dataLayer && product)
          window.dataLayer.push({
            event: 'addToCart',
            ecommerce: {
              currencyCode: product?.priceRange?.minVariantPrice?.currencyCode,
              add: {
                products: [
                  {
                    name: product?.name,
                    id: getIdFromGid(product?.id),
                    price: `${parseFloat(
                      product?.priceRange?.minVariantPrice?.amount,
                    )?.toFixed(2)}`,
                    brand: 'TULA Skincare',
                    category: product?.productType,
                    variant: getIdFromGid(addItem?.variantId),
                    quantity: addItem?.quantity,
                  },
                ],
              },
            },
          });
      }
      setButtonState(IDLE);
    }

    return () => {};
  }, [
    addItem?.quantity,
    addItem?.variantId,
    addItem?.selling_plan_id,
    isLoggedIn,
    addToCart.type,
    availableForSale,
    isGated,
    buttonState,
  ]);

  function dispatchAlertEvent() {
    const alertEvent = createCustomEvent();

    if (
      document
        .querySelector('[data-alert-state]')
        .getAttribute('data-alert-state') === 'hide'
    ) {
      document
        .querySelector('[data-alert-state]')
        .setAttribute('data-alert-state', 'show');
      document.querySelector('[data-alert-state]').dispatchEvent(alertEvent);

      setTimeout(() => {
        document
          .querySelector('[data-alert-state]')
          .setAttribute('data-alert-state', 'hide');
        document.querySelector('[data-alert-state]').dispatchEvent(alertEvent);
      }, 4000);
    }
  }

  function updateOGState() {
    if (addItem.selling_plan_id !== 0) {
      const OG_STATE = {
        sessionId: id,
        optedin: [
          {id: '8419474538542', frequency: '2_3'},
          {id: '35292334273', frequency: '2_3'},
          {id: '39450381320238', frequency: '2_3'},
          {id: '33187649665', frequency: '3_3'},
        ],
        optedout: [],
        productOffer: {},
        firstOrderPlaceDate: {},
        productToSubscribe: {},
      };

      const OG_KEY = {
        US_STG: {
          AD15: 'ddeeb16695fd11ea80bdbc764e10b970',
          AD20: 'fb58fa587a4411edbad7ce8f0c4adeb8',
        },
        US_PROD: {
          AD15: 'ddeeb16695fd11ea80bdbc764e10b970',
          AD20: 'fb58fa587a4411edbad7ce8f0c4adeb8',
        },
        CA_PROD: {
          AD15: 'c1ff625674af11ecbde3f2737e309b5b',
          AD20: 'dc673fbe7a4511ed8191ea4fad94f603',
        },
        UK_PROD: {
          AD15: 'ed2450c806a811edb66cda989c1a3bbf',
          AD20: 'f2f7719a7a4511ed9f3ece8f0c4adeb8',
        },
      };

      OG_STATE.productOffer[addItem.variantId.toString()] = [
        OG_KEY[rootData?.ENVS?.SITE_NAME]?.AD20,
      ];

      items.forEach((item) => {
        if (item.selling_plan_allocation) {
          OG_STATE.productOffer[item.variant_id] = [
            OG_KEY[rootData?.ENVS?.SITE_NAME]?.AD20,
          ];
        }
      });

      if (typeof window === 'object') {
        window.localStorage.setItem('OG_STATE', JSON.stringify(OG_STATE));
      }
    }
  }

  const clearError = () => setButtonState(IDLE);

  const mapStateToButton = {
    [IDLE]: (
      <addToCart.Form action="/cart" method={API_METHODS.POST}>
        <input
          type="hidden"
          name="cartAction"
          value={addItem?.action ?? 'ADD_TO_CART'}
        />
        <input
          type="hidden"
          name="countryCode"
          value={selectedLocale?.country ?? 'US'}
        />
        <input type="hidden" name="lines" value={JSON.stringify(lineItems)} />
        <div className="addToCart__container">
          <button
            className={`${classes.join(' ')} add_to_cart ${
              exclusiveProductAtcColor ? atcStylesForExclusiveProducts : ''
            }`}
            style={{background: fromPLP ? '#48c6d9' : exclusiveProductAtcColor}}
            type="submit"
            disabled={addToCart?.state === 'submitting'}
          >
            <span>
              {content?.addToCart && content?.addToCart !== ''
                ? content.addToCart
                : displayPrice === true && addItem?.product?.price
                ? `Add To Cart - $${addItem?.product?.price}`
                : 'Add To Cart'}
            </span>
          </button>
        </div>
      </addToCart.Form>
    ),
    [LOADING]: (
      <div className="addToCart__container">
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
      </div>
    ),
    [SOLD_OUT]: (
      <div className="addToCart__container">
        <button className={'add_to_cart disabled_atc'} disabled>
          <span>{buttonState === SOLD_OUT ? 'Sold out' : 'Select Shade'}</span>
        </button>
      </div>
    ),
    [ERROR]: (
      <div className="addToCart__container">
        <button
          className={`${classes.join(' ')} add_to_cart `}
          onClick={clearError}
        >
          <span>Sorry, checkout is down</span>
        </button>
      </div>
    ),
    [LOCKED]: (
      <div className={'addToCart__container'}>
        <button
          className={`${classes.join(' ')} add_to_cart ${
            exclusiveProductAtcColor && atcStylesForExclusiveProducts
          } `}
          style={{background: fromPLP ? '#48c6d9' : exclusiveProductAtcColor}}
          onClick={() => switchSliderPanelVisibility('SliderAccount')}
        >
          <span>
            <Padlock /> {LOCKED}
          </span>
        </button>
      </div>
    ),
  };

  return buttonState === SOLD_OUT || buttonState === SELECT_SHADE
    ? mapStateToButton[SOLD_OUT]
    : mapStateToButton[buttonState];
}
