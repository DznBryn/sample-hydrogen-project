import React, { useCallback, useState } from 'react';
import SliderCartRec, { links as sliderCartRecStyles } from './sliderCartRec';
import SliderCartProductBox, { links as sliderCartProductBoxStyles } from './sliderCartProductBox';
// import LoyaltyBanner, {
//   SkinQuizCartBanner,
//   ExclamationIcon,
// } from 'Components/LoyaltyBanner';
import {
  bindCustomEvent,
  createCustomEvent,
  // updateListrakCart,
  // updateListrakCartGraphQL,
  isAutoCart,
  isAutoCartGraphQL,
  getCartQuantity,
  convertStorefrontIdToExternalId,
  getLoyaltyCustomerData,
} from '../../utils/functions/eventFunctions';
import { compareItemsState, isFreeGitPromoActivate } from './utils/index';

// import RichText from 'frontend-ui/RichText';
import { useCartState, useCartActions } from '../../hooks/useCart';
import { useCustomerState } from '../../hooks/useCostumer';
import getApiKeys from '../../utils/functions/getApiKeys';
import LoadingSkeleton from '../loadingSkeleton';
// import ResponsiveImage from 'frontend-ui/ResponsiveImage';

import styles from './styles.css';

import ProgressBar from './modules/ProgressBar';
import Checkout from './modules/Checkout';
import LoyaltyTooltipModal from './modules/LoyaltyTooltipModal';
// import FreeGiftPromoProduct from './modules/FreeGiftPromoProduct';
import { GearIcon } from '../icons/index';
import { mockCartConfig, mockProductRecs } from '../../utils/functions/mocks';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...sliderCartRecStyles(),
    ...sliderCartProductBoxStyles(),
  ];
};

const apiType = getApiKeys().API_TYPE;

let prevState = null;

const SliderCart = ({ cartPageConfig, productRecs, products, ...props }) => {
  const cartConfig = cartPageConfig?.emptyCartMessage
    ? cartPageConfig
    : mockCartConfig;
  const productRecList = productRecs?.productList
    ? productRecs
    : mockProductRecs;
  const { items, inventory, subtotalPrice } = useCartState()
    ? useCartState()
    : [];
  const cart = useCartState() ? useCartState() : {};
  const { addItems, removeItems } = useCartActions();
  const cartRef = React.useRef(null);
  const carbonOffsetVariant = getApiKeys().CLOVERLY_ID;
  const carbonOffsetItem = items.filter(
    (item) =>
      (apiType === 'graphql'
        ? convertStorefrontIdToExternalId(item.variant.product.id)
        : item.id) === carbonOffsetVariant,
  )[0];
  const [loading, setLoading] = React.useState(false);
  const [isAbleToRedeem, setIsAbleToRedeem] = React.useState(false);

  const GWP_PRODUCT_EXTERNAL_ID = parseInt(
    cartConfig.freeGiftPromoProductExternalID,
  );
  const GWP_PRODUCT = products?.products?.filter(
    (product) => product.externalId === GWP_PRODUCT_EXTERNAL_ID,
  )[0];
  const GWP_PRODUCT_VARIANT_ID = GWP_PRODUCT?.variants[0].externalId;
  const IS_GWP_PRODUCT_ON_CART = items.some(
    (product) =>
      (apiType === 'graphql'
        ? convertStorefrontIdToExternalId(product.variant.product.id)
        : product.variant_id) === GWP_PRODUCT_VARIANT_ID,
  );

  const MIN_POINTS_AMOUNT = 2000;

  const totalCart =
    apiType === 'graphql' ? Number(subtotalPrice) : subtotalPrice / 100;

  // const [rewardsPoints, setRewardsPoints] = React.useState(totalCart);
  const setRewardsPoints = () => { }; //mock

  const { id, email, status } = useCustomerState();
  // const { id, isLoggedIn, firstName, email, status } = useCustomerState();

  const addAutoDeliveryItemsToLocalStorage = useCallback(() => {
    if (
      apiType === 'graphql'
        ? isAutoCartGraphQL(cart.items)
        : isAutoCart(cart.items)
    ) {
      const autoDeliveryItems =
        apiType === 'graphql'
          ? items.filter((item) =>
            item.customAttributes.find((el) => el.key === 'selling_plan'),
          )
          : items.filter((item) => item.selling_plan_allocation !== undefined);

      const valuesToStore = autoDeliveryItems.map((item) => ({
        id: apiType === 'graphql' ? item.variant.product.id : item.variant_id,
      }));

      localStorage.setItem('ADItems', JSON.stringify(valuesToStore));
    } else localStorage.removeItem('ADItems');
  }, [items]);

  React.useEffect(() => {
    if (
      apiType === 'graphql'
        ? isAutoCartGraphQL(cart.items)
        : isAutoCart(cart.items)
    ) {
      const autoDeliveryItems =
        apiType === 'graphql'
          ? items.filter((item) =>
            item.customAttributes.find((el) => el.key === 'selling_plan'),
          )
          : items.filter((item) => item.selling_plan_allocation !== undefined);

      let totalCartWithoutDiscount = 0;

      const ADdiscount = Number(cartPageConfig?.autoDeliveryDiscount ?? 0);
      const ADPointsBonus = autoDeliveryItems.length * 300;

      for (let item of items) {
        if (
          apiType === 'graphql'
            ? item.customAttributes.find((el) => el.key === 'selling_plan')
            : item.selling_plan_allocation !== undefined
        ) {
          const itemPrice =
            apiType === 'graphql'
              ? item.variant.price
              : item?.original_line_price / 100;
          const itemDiscount = itemPrice * (ADdiscount / 100);

          const discountedPrice = Math.floor(itemPrice - itemDiscount) * 10;

          totalCartWithoutDiscount += discountedPrice;
        } else {
          totalCartWithoutDiscount +=
            Math.floor(item?.original_line_price / 100) * 10;
        }
      }

      const discountedPrice = totalCartWithoutDiscount + ADPointsBonus;

      setRewardsPoints(Math.floor(discountedPrice));
    } else {
      setRewardsPoints(Math.floor(totalCart) * 10);
    }
  }, [items]);

  React.useEffect(() => {
    if (typeof window.unlockABTasty === 'function') {
      if (inventory.status === 'loaded') {
        window.unlockABTasty();
      }
    }
  }, [inventory.status]);

  React.useEffect(() => {
    const isGWPPromoToggleOn = isFreeGitPromoActivate(cartConfig);

    if (inventory.status === 'loaded' && isGWPPromoToggleOn)
      checkGWPThreshold();
  }, [items, inventory.status]);

  function checkGWPThreshold() {
    const GWP_THRESHOLD = cartConfig.freeGiftPromoThreshold;

    if (getTotalValueOnCart() >= GWP_THRESHOLD) {
      if (!hasOnlyGiftCards()) {
        if (!IS_GWP_PRODUCT_ON_CART)
          addItems([{ id: GWP_PRODUCT_VARIANT_ID, quantity: 1 }]);
      } else {
        if (IS_GWP_PRODUCT_ON_CART) removeItems([GWP_PRODUCT_VARIANT_ID]);
      }
    } else {
      if (IS_GWP_PRODUCT_ON_CART) removeItems([GWP_PRODUCT_VARIANT_ID]);
    }

    function getTotalValueOnCart() {
      const FILTERED_ITEMS = {
        noAD:
          apiType === 'graphql'
            ? items.filter(
              (data) =>
                !data.customAttributes.find(
                  (el) => el.key === 'selling_plan',
                ),
            )
            : items.filter((data) => !data.selling_plan_allocation),
        withAD:
          apiType === 'graphql'
            ? items.filter((data) =>
              data.customAttributes.find((el) => el.key === 'selling_plan'),
            )
            : items.filter((data) => data.selling_plan_allocation),
      };

      const NO_AD_TOTAL_VALUE = getSum(FILTERED_ITEMS.noAD);

      if (cartConfig.freeGiftPromoCombineAD) {
        const AD_TOTAL_VALUE = getADSum(FILTERED_ITEMS.withAD);
        return AD_TOTAL_VALUE + NO_AD_TOTAL_VALUE;
      } else {
        return NO_AD_TOTAL_VALUE;
      }

      function getSum(obj) {
        return parseFloat(
          (
            obj.reduce(
              (accumulator, product) => accumulator + product.final_line_price,
              0,
            ) / 100
          ).toFixed(2),
        );
      }

      function getADSum(obj) {
        const AD_DISCOUNT = Number(cartPageConfig?.autoDeliveryDiscount || 0);
        return parseFloat(
          obj
            .reduce(
              (accumulator, product) =>
                accumulator +
                (product.original_line_price / 100 -
                  (product?.original_line_price / 100) *
                  (parseInt(AD_DISCOUNT) / 100)),
              0,
            )
            .toFixed(2),
        );
      }
    }
  }

  function hasOnlyGiftCards() {
    const GIFT_CARDS_VARIANTS_IDS = getApiKeys().GIFT_CARDS_VARIANTS_IDS;
    const ITEMS_WITH_NO_GWP = items.filter(
      (product) => product.variant_id !== GWP_PRODUCT_VARIANT_ID,
    );

    return ITEMS_WITH_NO_GWP.every((product) =>
      GIFT_CARDS_VARIANTS_IDS.some((id) => id === product.variant_id),
    );
  }

  function getTotalItemsOnCart() {
    const EXCEPTIONS = [carbonOffsetItem, IS_GWP_PRODUCT_ON_CART];
    let total = getCartQuantity(items);

    EXCEPTIONS.forEach((exception) => {
      if (exception) total -= 1;
    });

    return total;
  }

  React.useEffect(() => {
    bindCustomEvent(cartRef, 'data-slider-state', {
      hidden: 'hidden',
      visible: 'visible',
    });

    addAutoDeliveryItemsToLocalStorage();

    return function cleanup() {
      if (
        document.querySelector('html').classList.contains('bodyWrap') &&
        document
          .querySelector('[data-slider-state]')
          .getAttribute('data-slider-state') === 'hide'
      ) {
        document.querySelector('html').classList.remove('bodyWrap');
      }
    };
  }, []);

  productRecList.productList = productRecList.productList.filter((product) => {
    for (let it = 0; it < items.length; it++) {
      if (apiType === 'graphql') {
        if (product.variants[0].storefrontId === items[it].variant.product.id) {
          return false;
        }
      } else {
        if (product.variants[0].externalId === items[it].id) {
          return false;
        }
      }
    }
    return true;
  });

  const handleClick = () => {
    const sliderEvent = createCustomEvent();
    if (cartRef.current.getAttribute('data-slider-state') === 'show') {
      document.querySelector('html').classList.remove('bodyWrap');
      cartRef.current.setAttribute('data-slider-state', 'hide');
      cartRef.current.dispatchEvent(sliderEvent);
    }
  };

  async function getCustomerData() {
    // const env = getApiKeys().CURRENT_ENV;
    const env = 'US_PROD';
    const data = { email, customerId: id, env, useCache: false };

    if (email || id) {
      getLoyaltyCustomerData(data)
        .then((res) => {
          const isAble = res.pointsBalance >= MIN_POINTS_AMOUNT;
          setIsAbleToRedeem(isAble);
        })
        .catch((err) => console.log('Not able to get user data', err));
    }
  }

  React.useEffect(() => {
    // console.log();
    if (status === 'loaded' || status === 'error') {
      getCustomerData();
    }
  }, [status]);

  if (prevState === null && items.length > 0) {
    prevState = items;
    // if (apiType === 'graphql') {
    //   updateListrakCartGraphQL(
    //     items,
    //     cart.id,
    //     cart.checkoutUrl,
    //     isAutoCartGraphQL(items),
    //   );
    // } else {
    //   updateListrakCart(items, cart.id, cart.checkoutUrl, isAutoCart(items));
    // }
  }

  if (prevState !== null && compareItemsState(items, prevState)) {
    if (items.length === 0 && prevState.length > 0) {
      if (typeof _ltk !== 'undefined') {
        // _ltk.SCA.ClearCart();
      }
    } else {
      // if (apiType === 'graphql') {
      //   updateListrakCartGraphQL(
      //     items,
      //     cart.id,
      //     cart.checkoutUrl,
      //     isAutoCartGraphQL(items),
      //   );
      // } else {
      //   updateListrakCart(items, cart.id, cart.checkoutUrl, isAutoCart(items));
      // }
      prevState = items;
    }
  }

  const cartContentProps = {
    cart,
    items,
    cartConfig,
    productRecs,
    carbonOffsetItem,
    quantity: getTotalItemsOnCart(),
    hasOnlyGiftCards: () => hasOnlyGiftCards(),
    handleClick: () => handleClick(),
    setLoading: () => setLoading(),
    isAbleToRedeem,
    products,
    GWP_PRODUCT_VARIANT_ID,
    ...props
  };

  return (
    <div
      className={'sliderCartWrap hidden'}
      data-slider-state="hide"
      ref={cartRef}
      onClick={handleClick}
    >
      <div
        className={'sliderCart'}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {loading ? <SkeletonLoader /> : <CartContent {...cartContentProps} />}
      </div>
    </div>
  );
};

const CartContent = ({ items, cartConfig, productRecs, quantity = 1, hasOnlyGiftCards, cart, handleClick, carbonOffsetItem, isAbleToRedeem, ...props }) => {
  const [showModal, setShowModal] = useState(false);
  const productRecList = productRecs?.productList
    ? productRecs
    : mockProductRecs;
  const { isLoggedIn } = useCustomerState();
  function toggleModal() {
    setShowModal(!showModal);
  }

  const EmptyCart = () => (
    <>
      <div className={'cartHeader'}>
        <div className={'cartHeader_title'}>
          <p>{cartConfig?.emptyCartMessage}</p>
          {/* <RichText source={cartConfig?.emptyCartMessage} /> */}
        </div>
        <div className={'cartClose} onClick={handleClick'}>
          CLOSE
        </div>
      </div>

      <div className={'emptyCart'}>
        {getApiKeys().CURRENT_ENV.includes('US') && (
          isLoggedIn
          // <LoyaltyBanner loggedIn={isLoggedIn} isEmpty />
        )

          /* <SkinQuizCartBanner /> */
        }
      </div>

      <SliderCartRec
        productRecs={productRecList}
        limit={1}
        gwpProductId={cartConfig?.freeGiftPromoProductExternalID}
      />

      <Checkout message="Start Shopping" url="/collections/all" />
    </>
  );

  const itemsListProps = {
    items,
    cartConfig,
    carbonOffsetItem,
    ...props
  };

  return items.length === 0 ? (
    <EmptyCart />
  ) : (
    <>
      <div className={'cartHeader'}>
        <h3>{'My Cart (' + quantity + ')'}</h3>
        <div className={'cartClose'} onClick={handleClick}>
          CLOSE
        </div>
      </div>

      {!hasOnlyGiftCards() && (
        <ProgressBar cart={cart} cartConfig={cartConfig} />
      )}

      {cartConfig?.showTemporaryWarn && (
        <div
          className={'temporaryWarn'}
          style={{ marginTop: hasOnlyGiftCards() ? '20px' : '0' }}
        >
          <GearIcon />
          <span>
            {cartConfig?.cartTemporaryWarn}
            {/* <RichText source={cartConfig?.cartTemporaryWarn} /> */}
          </span>
        </div>
      )}
      {getApiKeys().CURRENT_ENV.includes('US') && (
        'LoyaltyBar'
        // <LoyaltyBanner
        //   loggedIn={isLoggedIn}
        //   points={rewardsPoints}
        //   isAbleToRedeem={isAbleToRedeem}
        //   userName={firstName}
        //   onClick={toggleModal}
        // />
      )}

      <ItemsList {...itemsListProps} />

      <Checkout
        cart={cart}
        valueToSubtract={
          carbonOffsetItem &&
          (apiType === 'graphql'
            ? Number(carbonOffsetItem.variant.price)
            : carbonOffsetItem.line_price / 100)
        }
        message="Checkout"
        url={cart?.checkoutUrl}
      />

      <LoyaltyTooltipModal
        modalState={showModal}
        toggleModal={toggleModal}
        isAbleToRedeem={isAbleToRedeem}
      />
    </>
  );
};

const ItemsList = ({ items, cartConfig, setLoading, products, ...props }) => {
  // const getRecItemsLimit = () => {
  //   if (items.length === 2) return 2;
  //   if (items.length === 3) return 1;
  //   if (items.length > 4) return 0;
  //   return 3;
  // };

  const filteredItems = {
    noAD:
      apiType === 'graphql'
        ? items.filter(
          (data) =>
            !data.customAttributes.find((el) => el.key === 'selling_plan'),
        )
        : items.filter((data) => !data.selling_plan_allocation),
    withAD:
      apiType === 'graphql'
        ? items.filter((data) =>
          data.customAttributes.find((el) => el.key === 'selling_plan'),
        )
        : items.filter((data) => data.selling_plan_allocation),
  };

  // const shouldActivateFreeGift = () => {
  //   let cartTotal =
  //     apiType === 'graphql' ? Number(subtotalPrice) : subtotalPrice / 100;
  //   if (!cartConfig?.freeGiftPromoCombineAD) {
  //     cartTotal =
  //       apiType === 'graphql'
  //         ? cart.items
  //           .filter(
  //             (item) =>
  //               !item.customAttributes.some(
  //                 (el) => el.key === 'selling_plan',
  //               ),
  //           )
  //           .reduce(
  //             (total, value) => (total += Number(value.variant.price)),
  //             0,
  //           )
  //         : cart.items
  //           .filter((item) => item.selling_plan_allocation === undefined)
  //           .reduce(
  //             (total, value) => (total += value.final_line_price / 100),
  //             0,
  //           );
  //   }
  //   return cartTotal >= cartConfig?.freeGiftPromoThreshold;
  // };

  /**
   * this code bellow is the code for Loyalty products
   * TODO => implement a method to add 'loyalty_redeem' at the redeemed product
   */

  const loyaltyProduct =
    apiType === 'graphql'
      ? items.find((item) =>
        item.customAttributes.some((el) => el.key === 'loyalty_redeem'),
      )
      : items.find((item) => item.loyalty_redeem);

  return (
    <div className={'innerContent'}>
      <div className={'itemsList'}>
        <div>
          {loyaltyProduct && <SliderCartProductBox
            item={loyaltyProduct}
            key={loyaltyProduct.id}
            cartPageConfig={cartConfig}
            setSliderCartLoading={setLoading}
            product={
              products?.products?.filter(
                (product) => product.externalId === loyaltyProduct.id,
              )[0]
            }
          />
          }
          {filteredItems.withAD.length > 0 && (
            <p>Your auto-delivery items:</p>
          )}
          {filteredItems.withAD.map((item) => {
            const product =
              apiType === 'graphql'
                ? products?.products?.filter(
                  (product) =>
                    product.storefrontId === item.variant.product.id,
                )[0]
                : products?.products?.filter(
                  (product) => product.externalId === item.product_id,
                )[0];

            const promo =
              product &&
                product.productPromos &&
                product.productPromos.showPromo
                ? product.productPromos
                : false;

            if (
              item.id !== props?.carbonOffsetVariant &&
              item.id !== props?.GWP_PRODUCT_VARIANT_ID
            ) {
              return (<SliderCartProductBox
                item={{
                  ...item,
                  hasSellingPlans: product?.tags?.includes(
                    'subscriptionEligibleTag',
                  ),
                  recommendedSellingPlan: product?.recommendedSellingPlan,
                }}
                key={item.id}
                promo={promo}
                cartPageConfig={cartConfig}
                setSliderCartLoading={setLoading}
                product={
                  products?.products?.filter(
                    (product) => product.externalId === item.product_id,
                  )[0]
                }
              />
              );
            } else {
              return null;
            }
          })}
        </div>
        <div>
          {filteredItems.noAD.length > 0 &&
            filteredItems.withAD.length > 0 && (
            <p>Your one-time purchase items:</p>
          )}
          {filteredItems.noAD.map((item) => {
            const product =
              apiType === 'graphql'
                ? products?.products?.filter(
                  (product) =>
                    product.storefrontId === item.variant.product.id,
                )[0]
                : products?.products?.filter(
                  (product) => product.externalId === item.product_id,
                )[0];

            const promo =
              product &&
                product.productPromos &&
                product.productPromos.showPromo
                ? product.productPromos
                : false;

            if (
              item.id !== props?.carbonOffsetVariant &&
              item.id !== props?.GWP_PRODUCT_VARIANT_ID
            ) {
              return (
                <SliderCartProductBox
                  item={{
                    ...item,
                    hasSellingPlans: product?.tags?.includes(
                      'subscriptionEligibleTag',
                    ),
                    recommendedSellingPlan: product?.recommendedSellingPlan,
                  }}
                  key={item.id}
                  promo={promo}
                  cartPageConfig={cartConfig}
                  setSliderCartLoading={setLoading}
                  product={
                    products?.products?.filter(
                      (product) => product.externalId === item.product_id,
                    )[0]
                  }
                />
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>

      {/* {isFreeGitPromoActivate(cartConfig) &&
          !hasOnlyGiftCards() &&
          products.products
            .filter(
              (product) =>
                product.externalId.toString() ===
                cartConfig?.freeGiftPromoProductExternalID,
            )
            .map((data, index) => (
              <FreeGiftPromoProduct
                key={index}
                product={data}
                isMystery={cartConfig?.freeGiftPromoIsMisteryProductToggle}
                anonymousImageSrc={cartConfig?.freeGiftPromoMysteryImage.src}
                productPrice={cartConfig?.freeGiftPromoProductPrice || '0.00'}
                active={shouldActivateFreeGift()}
              />
            ))}

        <SliderCartRec
          productRecs={productRecList}
          limit={getRecItemsLimit()}
          gwpProductId={cartConfig?.freeGiftPromoProductExternalID}
        />

        {getApiKeys().CURRENT_ENV.includes('US') && (
          <div className={'discount'}>
            *300 rewards points applicable for every new Auto Delivery
            subscription
          </div>
        )} */}
    </div>
  );
};

const SkeletonLoader = () => {
  const ItemLoader = () => (
    <div>
      <LoadingSkeleton width="60px" height="70px" />
      <LoadingSkeleton width="249px" height="36px" />
      <LoadingSkeleton width="200px" height="34px" />
    </div>
  );

  return (
    <div className={'skeletonWrapper'}>
      <div>
        <LoadingSkeleton width="109px" height="28px" />
        <LoadingSkeleton width="38px" height="28px" />
        <LoadingSkeleton width="100%" height="28px" />
      </div>

      <ItemLoader />
      <ItemLoader />
      <ItemLoader />

      <div>
        <LoadingSkeleton width="109px" height="28px" />
        <LoadingSkeleton width="38px" height="28px" />
        <LoadingSkeleton width="100%" height="40px" />
      </div>
    </div>
  );
};

export default SliderCart;
