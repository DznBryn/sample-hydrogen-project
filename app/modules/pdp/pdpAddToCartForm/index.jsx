import PDPAddToCart, {links as pdpAddToCartStyles} from '../../addToCartButton';
// import {switchSliderPanelVisibility} from '../../sliderPanel';
import {useStore} from '~/hooks/useStore';
import classnames from 'classnames';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}, ...pdpAddToCartStyles()];
};

const PDPAddToCartForm = ({
  classes,
  forceSoldOut,
  // renderingShadeFinder,
  exclusiveProductAtcColor,
  exclusiveProductTextColor,
  isGated,
  // renderingConcealer,
}) => {
  const showOOSForm = false;
  const {store, setStore} = useStore();

  function setQuantity(quantity) {
    setStore({
      ...store,
      productPage: {
        ...store?.productPage,
        addToCart: {
          ...store?.productPage?.addToCart,
          quantity,
        },
      },
    });
  }

  const increaseItemQty = () => {
    setQuantity(store?.productPage?.addToCart?.quantity + 1);
  };

  const decreaseItemQty = () => {
    setQuantity(store?.productPage?.addToCart?.quantity - 1);
  };

  return (
    <div className={classnames('atc__container', classes)}>
      <div className={classnames('container', 'add_to_cart_form')}>
        <div className={'quantity_container'}>
          <button
            className={'control_button'}
            onClick={() =>
              store?.productPage?.addToCart?.quantity > 1 && decreaseItemQty()
            }
          >
            -
          </button>
          {store?.productPage?.addToCart?.quantity && (
            <input
              className={'quantity'}
              type="number"
              name="quantity"
              value={forceSoldOut ? 0 : store?.productPage?.addToCart?.quantity}
              pattern="/[^1-5]/gi"
              disabled
              required
            />
          )}
          <button
            className={'control_button'}
            onClick={() =>
              store?.productPage?.addToCart?.quantity < 5 && increaseItemQty()
            }
          >
            +
          </button>
        </div>

        <div className={'ctaContainer'}>
          {/* DO NOT REMOVE - POST LAUNCH FEATURE */}
          {/* {renderingShadeFinder &&
            store?.productPage?.selectedVariant === undefined && (
              <div
                className={'openSFButtonForm'}
                onClick={() => {
                  window?.dataLayer?.push({
                    event: 'shadeFinderFindMyShade',
                    details: {
                      source: 'addToCart',
                    },
                  });

                  switchSliderPanelVisibility('ShadeFinderSlider');
                }}
              >
                Find my shade
              </div>
            )}

          {renderingConcealer &&
            store?.productPage?.selectedVariant === undefined && (
              <div
                className={'openSFButtonForm'}
                onClick={() => switchSliderPanelVisibility('ConcealerSlider')}
              >
                Find my shade
              </div>
            )} */}

          <PDPAddToCart
            addItem={{
              product: store?.product ?? {},
              variantId: store?.productPage?.selectedVariant,
              quantity: store?.productPage?.addToCart?.quantity,
              ['selling_plan_id']:
                store?.productPage?.addToCart?.selling_plan_id &&
                store?.productPage?.addToCart?.selling_plan_id !== 0
                  ? store.productPage.addToCart.selling_plan_id
                  : null,
              discount: store?.productPage?.addToCart?.discount ?? 0,
            }}
            forceSoldOut={forceSoldOut}
            exclusiveProductAtcColor={exclusiveProductAtcColor}
            exclusiveProductTextColor={exclusiveProductTextColor}
            isGated={isGated}
            // availableForSale={store?.product?.totalInventory > 0}
            availableForSale={store?.product?.availableForSale}
          />
        </div>
        <div className={'hidden__col'}></div>
        <div className={'return__container'}>
          <p className={'return__message'}>
            free 60-day returns on all orders.
          </p>
        </div>
      </div>
      {showOOSForm && (
        <form
          method="post"
          action="https://enews.tula.com/q/3wBgLPnjA04CRBbCS52FQCRKto233O4SK-yZm_WpZlUNRhGKbOhS2T8CK"
          acceptCharset="UTF-8"
        >
          <input
            type="hidden"
            name="crvs"
            value="rz6C4_Y2g6Sz4EnN0V-LALDY2q51xNcdkrtdP0i_ETcEYZKVHjQZ6DX8c0EkCC2r8MJKQ5lj38B01T0l3vNAY_AR3ldgTx7BX-CSo3MRZQC6jvAiJ7iIVfCLNUq-D5sFeQ8L7OhFcK146bIAXSypwFBp_fQpdH36Xad5k8YmDQs"
          />
          <div className={'formWrap'}>
            <h2>Get Notified</h2>
            <h3>
              Enter your email to receive an update when this product becomes
              available
            </h3>
            <input
              type="text"
              name="ABC"
              size="10"
              maxLength="10"
              value=""
              tabIndex="-1"
              autoComplete="off"
              style={{display: 'none'}}
            />
            <input
              type="text"
              name="XYZ"
              size="10"
              maxLength="10"
              value=""
              tabIndex="-1"
              autoComplete="off"
              style={{display: 'none'}}
            />
            <input
              type="text"
              name="AtZ"
              size="10"
              maxLength="10"
              value=""
              tabIndex="-1"
              autoComplete="off"
              style={{display: 'none'}}
            />
            <div className={'inputWrap'}>
              <input
                type="text"
                className={'email'}
                name="email"
                size="40"
                maxLength="100"
              />
              <input
                type="submit"
                className={'submit'}
                id="submit"
                value="Sign Up"
              />
            </div>
            <input
              type="hidden"
              name="CheckBox.New-Product-Launch-Waitlist.Body-OOS-Q12022"
              value="on"
            />
            <div className={'warning'}>
              By providing your email, you consent to receive marketing and
              promotional emails from TULA. For more information please visit
              our Terms & Conditions & our Privacy Policy.
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default PDPAddToCartForm;
