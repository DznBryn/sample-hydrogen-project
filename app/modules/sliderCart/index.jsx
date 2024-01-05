import React, {useCallback, useEffect, useState} from 'react';
import {
  isAutoCart,
  isAutoCartGraphQL,
  convertStorefrontIdToExternalId,
  getLoyaltyCustomerData,
} from '../../utils/functions/eventFunctions';
import {isFreeGitPromoActivate} from './utils/index';
import {useCartActions} from '../../hooks/useCart';
import {useCustomerState} from '../../hooks/useCostumer';
import {PortableText} from '@portabletext/react';
import getApiKeys from '../../utils/functions/getApiKeys';
import LoadingSkeleton from '../loadingSkeleton';

import styles from './styles.css';

import ProgressBar from './modules/ProgressBar';
import Checkout from './modules/Checkout';
import LoyaltyTooltipModal from './modules/LoyaltyTooltipModal';
import FreeGiftPromoProduct from './modules/FreeGiftPromoProduct';
import {GearIcon} from '../icons/index';
import {mockCartConfig, mockProductRecs} from '../../utils/functions/mocks';
import {useStore} from '~/hooks/useStore';
import SliderCartRec, {links as sliderCartRecStyles} from './sliderCartRec';
import SliderCartProductBox, {
  links as sliderCartProductBoxStyles,
} from './sliderCartProductBox';
import Banner, {
  SkinQuizCartBanner,
  links as loyaltyBannerStyles,
} from '../loyalty/banner';
import {flattenConnection, parseGid} from '@shopify/hydrogen';

export const links = () => {
  return [
    {rel: 'stylesheet', href: styles},
    ...sliderCartRecStyles(),
    ...sliderCartProductBoxStyles(),
    ...loyaltyBannerStyles(),
  ];
};

const apiType = getApiKeys().API_TYPE;

// let prevState = null;

const SliderCart = ({cartPageConfig, productRecs, products, ...props}) => {
  const cartConfig = cartPageConfig?.emptyCartMessage
    ? cartPageConfig
    : mockCartConfig;
  const productRecList = productRecs?.productList
    ? productRecs
    : mockProductRecs;

  const cart = useStore((store) => store?.cart?.data ?? {});
  const [items, setItems] = useState(null);
  const toggleCart = useStore((store) => store?.cart?.toggleCart ?? (() => {}));
  const isSliderCartOpen = useStore(
    (store) => store?.cart?.isSliderCartOpen ?? false,
  );
  const {addItems, removeItems} = useCartActions();
  const carbonOffsetVariant = getApiKeys().CLOVERLY_ID;
  const carbonOffsetItem = items?.filter(
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
  const IS_GWP_PRODUCT_ON_CART = items?.some(
    (product) =>
      (apiType === 'graphql'
        ? convertStorefrontIdToExternalId(product.variant.product.id)
        : product.variant_id) === GWP_PRODUCT_VARIANT_ID,
  );

  const MIN_POINTS_AMOUNT = 2000;

  const totalCart = Number(cart?.cost?.subtotalAmount?.amount ?? 0);

  const setRewardsPoints = () => {}; //mock

  const {id, email, status} = useCustomerState();

  const addAutoDeliveryItemsToLocalStorage = useCallback(() => {
    if (
      apiType === 'graphql'
        ? isAutoCartGraphQL(cart.items)
        : isAutoCart(cart.items)
    ) {
      const autoDeliveryItems = items?.filter((item) => {
        return item?.sellingPlanAllocation?.sellingPlan;
      });

      const valuesToStore = autoDeliveryItems?.map((item) => ({
        id: item?.merchandise?.product?.id,
      }));

      localStorage.setItem('ADItems', JSON.stringify(valuesToStore));
    } else localStorage.removeItem('ADItems');
  }, [items?.length]);

  useEffect(() => {
    if (cart?.totalQuantity) {
      const items = flattenConnection(cart.lines).map((item) => item);
      setItems(items);
    }

    if (typeof window.unlockABTasty === 'function') {
      if (cart?.totalQuantity) {
        window.unlockABTasty();
      }
    }

    const isGWPPromoToggleOn = isFreeGitPromoActivate(cartConfig);

    if (cart?.totalQuantity && isGWPPromoToggleOn) checkGWPThreshold();
  }, [cart?.totalQuantity]);

  React.useEffect(() => {
    if (
      items?.some((item) => {
        return item?.sellingPlanAllocation?.sellingPlan;
      })
    ) {
      const autoDeliveryItems = items?.filter((item) => {
        return item?.sellingPlanAllocation?.sellingPlan;
      });

      let totalCartWithoutDiscount = 0;

      const ADdiscount = Number(cartPageConfig?.autoDeliveryDiscount ?? 0);
      const ADPointsBonus = autoDeliveryItems?.length * 300;

      for (let item of items) {
        if (item?.sellingPlanAllocation?.sellingPlan) {
          const itemPrice = item?.cost?.amountPerQuantity?.amount / 100;
          const itemDiscount = itemPrice * (ADdiscount / 100);

          const discountedPrice = Math.floor(itemPrice - itemDiscount) * 10;

          totalCartWithoutDiscount += discountedPrice;
        } else {
          totalCartWithoutDiscount +=
            Math.floor(item?.cost?.amountPerQuantity?.amount / 100) * 10;
        }
      }

      const discountedPrice = totalCartWithoutDiscount + ADPointsBonus;

      setRewardsPoints(Math.floor(discountedPrice));
    } else {
      setRewardsPoints(Math.floor(totalCart) * 10);
    }
  }, [cart?.totalQuantity]);

  function checkGWPThreshold() {
    const GWP_THRESHOLD = cartConfig.freeGiftPromoThreshold;

    if (getTotalValueOnCart() >= GWP_THRESHOLD) {
      if (!hasOnlyGiftCards()) {
        if (!IS_GWP_PRODUCT_ON_CART)
          addItems([{id: GWP_PRODUCT_VARIANT_ID, quantity: 1}]);
      } else {
        if (IS_GWP_PRODUCT_ON_CART) removeItems([GWP_PRODUCT_VARIANT_ID]);
      }
    } else {
      if (IS_GWP_PRODUCT_ON_CART) removeItems([GWP_PRODUCT_VARIANT_ID]);
    }

    function getTotalValueOnCart() {
      const FILTERED_ITEMS = {
        noAD: items?.filter((item) => {
          return !item?.sellingPlanAllocation?.sellingPlan;
        }),
        withAD: items?.filter((item) => {
          return item?.sellingPlanAllocation?.sellingPlan;
        }),
      };

      const NO_AD_TOTAL_VALUE = getSum(FILTERED_ITEMS?.noAD);

      if (cartConfig.freeGiftPromoCombineAD) {
        const AD_TOTAL_VALUE = getADSum(FILTERED_ITEMS?.withAD);
        return AD_TOTAL_VALUE + NO_AD_TOTAL_VALUE;
      } else {
        return NO_AD_TOTAL_VALUE;
      }

      function getSum(obj) {
        return parseFloat(
          (
            obj.reduce(
              (accumulator, product) =>
                accumulator + Number(product?.cost?.totalAmount?.amount),
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
                (product?.cost?.totalAmount?.amount -
                  product?.cost?.totalAmount?.amount *
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
    const ITEMS_WITH_NO_GWP = items?.filter(
      (item) => parseGid(item?.merchandise?.id)?.id !== GWP_PRODUCT_VARIANT_ID,
    );

    return ITEMS_WITH_NO_GWP?.every((item) =>
      GIFT_CARDS_VARIANTS_IDS.some(
        (id) => id === parseGid(item?.merchandise?.id)?.id,
      ),
    );
  }

  function getTotalItemsOnCart() {
    const EXCEPTIONS = [carbonOffsetItem, IS_GWP_PRODUCT_ON_CART];
    let total = cart?.totalQuantity ?? 0;

    EXCEPTIONS.forEach((exception) => {
      if (exception) total -= 1;
    });

    return total;
  }

  React.useEffect(() => {
    addAutoDeliveryItemsToLocalStorage();

    return function cleanup() {};
  }, []);

  productRecList.productList = productRecList.productList.filter((product) => {
    for (let it = 0; it < items?.length; it++) {
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

  async function getCustomerData() {
    const env = getApiKeys().CURRENT_ENV;
    const data = {email, customerId: id, env, useCache: false};

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
    if (status === 'loaded' || status === 'error') {
      getCustomerData();
    }
  }, [status]);

  // if (prevState === null && items?.length > 0) {
  //   prevState = items;

  //   updateListrakCartGraphQL(cart.id, cart.checkoutUrl);
  // }

  // if (items?.length !== 0) {
  //   if (prevState !== null) {
  //     if (items?.length === 0 && prevState.length > 0) {
  //       if (typeof _ltk !== 'undefined') {
  //         _ltk?.SCA?.ClearCart();
  //       }
  //     } else {
  //       updateListrakCartGraphQL(cart.id, cart.checkoutUrl);

  //       prevState = items;
  //     }
  //   }
  // }

  useEffect(() => {}, [isSliderCartOpen]);
  const cartContentProps = {
    cart,
    items,
    cartConfig,
    productRecs,
    carbonOffsetItem,
    quantity: getTotalItemsOnCart(),
    hasOnlyGiftCards: () => hasOnlyGiftCards(),
    handleClick: toggleCart,
    setLoading: () => setLoading(),
    isAbleToRedeem,
    products,
    GWP_PRODUCT_VARIANT_ID,
    ...props,
  };

  return (
    <div
      className={`sliderCartWrap ${
        isSliderCartOpen ? 'show-cart' : 'hide-cart'
      }`}
      onClick={toggleCart}
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

const CartContent = ({
  items,
  cartConfig,
  productRecs,
  hasOnlyGiftCards,
  handleClick,
  carbonOffsetItem,
  isAbleToRedeem,
  ...props
}) => {
  const [showModal, setShowModal] = useState(false);
  const account = useStore((store) => store?.account?.data ?? {});
  const cart = useStore((store) => store?.cart?.data ?? {});
  const totalCart = Number(cart?.cost?.subtotalAmount?.amount ?? 0);
  const productRecList = productRecs?.productList
    ? productRecs
    : mockProductRecs;
  const {isLoggedIn} = useCustomerState();
  function toggleModal() {
    setShowModal(!showModal);
  }

  const itemsListProps = {
    items,
    cartConfig,
    carbonOffsetItem,
    hasOnlyGiftCards: () => hasOnlyGiftCards(),
    ...props,
  };

  const emptyCartProps = {
    cartConfig,
    handleClick,
    isLoggedIn,
    productRecList,
  };

  return items?.length === 0 || !items || cart?.totalQuantity === 0 ? (
    <EmptyCart {...emptyCartProps} />
  ) : (
    <>
      <div className={'cartHeader'}>
        <h3>{'My Cart (' + cart?.totalQuantity + ')'}</h3>
        <div className={'cartClose'} onClick={handleClick}>
          CLOSE
        </div>
      </div>

      {!hasOnlyGiftCards() && (
        <ProgressBar cart={cart} items={items} cartConfig={cartConfig} />
      )}

      {cartConfig?.showTemporaryWarn && (
        <div
          className={'temporaryWarn'}
          style={{marginTop: hasOnlyGiftCards() ? '20px' : '0'}}
        >
          <GearIcon />
          <span>
            <PortableText value={cartConfig?.cartTemporaryWarnRaw} />
          </span>
        </div>
      )}
      {getApiKeys().CURRENT_ENV.includes('US') && (
        <Banner
          loggedIn={account?.id !== ''}
          points={Math.floor(totalCart) * 10}
          isAbleToRedeem={isAbleToRedeem}
          userName={account?.firstName !== '' ? account?.firstName : 'Jane'}
          onClick={toggleModal}
        />
      )}

      <ItemsList {...itemsListProps} />

      <Checkout
        cartConfig={cartConfig}
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

const EmptyCart = ({cartConfig, handleClick, isLoggedIn, productRecList}) => (
  <>
    <div className={'cartHeader'}>
      <div className={'cartHeader_title'}>
        {cartConfig?.emptyCartMessageRaw?.[0] ? (
          <PortableText value={[cartConfig?.emptyCartMessageRaw?.[0]]} />
        ) : (
          <p>Your Cart Is Currently Empty</p>
        )}
      </div>
      <div className={'cartClose'} onClick={handleClick}>
        CLOSE
      </div>
    </div>

    <div className={'emptyCart'}>
      {getApiKeys().CURRENT_ENV.includes('US') && (
        <Banner loggedIn={isLoggedIn} isEmpty />
      )}
      <SkinQuizCartBanner />
    </div>

    <SliderCartRec
      productRecs={productRecList}
      limit={1}
      gwpProductId={cartConfig?.freeGiftPromoProductExternalID}
    />

    <Checkout message="Start Shopping" url="/collections/all" />
  </>
);

const ItemsList = ({cartConfig, setLoading, products, ...props}) => {
  const cart = useStore((store) => store?.cart?.data ?? {});
  const items = cart?.lines ? flattenConnection(cart?.lines) : [];
  const getRecItemsLimit = () => {
    if (items?.length === 2) return 2;
    if (items?.length === 3) return 1;
    if (items?.length > 4) return 0;
    return 3;
  };

  const filteredItems = {
    noAD: items?.filter((data) => !data?.sellingPlanAllocation?.sellingPlan),
    withAD: items?.filter((data) => data?.sellingPlanAllocation?.sellingPlan),
  };

  const shouldActivateFreeGift = () => {
    let cartTotal = Number(cart?.cost?.subtotalAmount?.amount ?? '0.00');
    if (!cartConfig?.freeGiftPromoCombineAD) {
      cartTotal = items
        .filter((item) => !item?.sellingPlanAllocation?.sellingPlan)
        .reduce((total, value) => {
          return (total += Number(value?.cost?.amountPerQuantity?.amount ?? 0));
        }, 0);
    }
    return cartTotal >= cartConfig?.freeGiftPromoThreshold;
  };

  /**
   * this code bellow is the code for Loyalty products
   * TODO => implement a method to add 'loyalty_redeem' at the redeemed product
   */

  const loyaltyProduct = items?.find((item) =>
    item?.customAttributes?.some((el) => el.key === 'loyalty_redeem'),
  );

  return (
    <div className={'innerContent'}>
      <div className={'itemsList'}>
        <div>
          {loyaltyProduct && (
            <SliderCartProductBox
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
          )}
          {filteredItems?.withAD?.length > 0 && (
            <p>Your auto-delivery items:</p>
          )}
          {filteredItems?.withAD?.map((item) => {
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
        <div>
          {filteredItems?.noAD?.length > 0 &&
            filteredItems?.withAD?.length > 0 && (
              <p>Your one-time purchase items:</p>
            )}
          {filteredItems?.noAD?.map((item) => {
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

      {isFreeGitPromoActivate(cartConfig) &&
        !props?.hasOnlyGiftCards() &&
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
        productRecs={props?.productRecList}
        limit={getRecItemsLimit()}
        gwpProductId={cartConfig?.freeGiftPromoProductExternalID}
      />

      {getApiKeys().CURRENT_ENV.includes('US') && (
        <div className={'discount'}>
          *300 rewards points applicable for every new Auto Delivery
          subscription
        </div>
      )}
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
