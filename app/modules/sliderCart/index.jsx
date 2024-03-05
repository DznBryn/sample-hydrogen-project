import React, {useEffect, useState} from 'react';
import {
  convertStorefrontIdToExternalId,
  getLoyaltyCustomerData,
  isAutoDeliveryInCart,
  updateListrakCart,
} from '../../utils/functions/eventFunctions';
import {compareItemsState, isFreeGitPromoActivate} from './utils/index';

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
import {useFetcher} from '@remix-run/react';
import {API_METHODS, FETCHER} from '~/utils/constants';

export const links = () => {
  return [
    {rel: 'stylesheet', href: styles},
    ...sliderCartRecStyles(),
    ...sliderCartProductBoxStyles(),
    ...loyaltyBannerStyles(),
  ];
};

const apiType = getApiKeys().API_TYPE;

let prevState = null;

const SliderCart = ({cartConfig, recommendations, products, ...props}) => {
  const productRecList = recommendations;
  const {
    data: cart,
    updateCart: removeItemData = () => {},
    setData: setCartData = () => {},
  } = useStore((store) => store?.cart ?? {});

  const [items, setItems] = useState(null);
  const toggleCart = useStore((store) => store?.cart?.toggleCart ?? (() => {}));
  const isSliderCartOpen = useStore(
    (store) => store?.cart?.isSliderCartOpen ?? false,
  );

  const fetcher = useFetcher();
  const carbonOffsetVariant = getApiKeys().CLOVERLY_ID;
  const carbonOffsetItem = items?.filter(
    (item) =>
      (apiType === 'graphql'
        ? convertStorefrontIdToExternalId(item.variant.product.id)
        : item.id) === carbonOffsetVariant,
  )[0];
  const [loading, setLoading] = React.useState(false);
  const [isAbleToRedeem, setIsAbleToRedeem] = React.useState(false);

  const GWP_PRODUCT_EXTERNAL_ID = cartConfig.freeGiftPromoProductExternalID;
  const GIFT_CARDS_VARIANTS_IDS = getApiKeys().GIFT_CARDS_VARIANTS_IDS;

  const GWP_PRODUCT = products?.products?.find((product) => {
    return product?.id?.includes(GWP_PRODUCT_EXTERNAL_ID);
  });
  const GWP_PRODUCT_VARIANT_ID = parseGid(GWP_PRODUCT?.variants.nodes[0].id).id;

  function checkIfIsGWPProductOnCart() {
    const items = cart?.lines ? flattenConnection(cart.lines) : [];
    const variant = items?.find((product) =>
      product?.merchandise?.id?.includes(GWP_PRODUCT_VARIANT_ID),
    );
    return variant ? true : false;
  }

  const IS_GWP_PRODUCT_ON_CART = checkIfIsGWPProductOnCart();

  const MIN_POINTS_AMOUNT = 2000;

  const totalCart = Number(cart?.cost?.subtotalAmount?.amount ?? 0);

  const setRewardsPoints = () => {}; //mock

  const {id, email, status} = useCustomerState();

  useEffect(() => {
    if (cart?.totalQuantity) {
      const items = flattenConnection(cart.lines).map((item) => item);
      setItems(items);
      addAutoDeliveryItemsToLocalStorage();
    }

    if (typeof window.unlockABTasty === 'function') {
      if (cart?.totalQuantity) {
        window.unlockABTasty();
      }
    }
  }, [cart?.totalQuantity]);

  useEffect(() => {
    const isGWPPromoToggleOn = isFreeGitPromoActivate(cartConfig);
    if (cart?.totalQuantity && isGWPPromoToggleOn) checkGWPThreshold();
  }, [JSON.stringify(cart?.lines)]);

  useEffect(() => {
    if (
      items?.some((item) => {
        return item?.sellingPlanAllocation?.sellingPlan;
      })
    ) {
      const autoDeliveryItems = items?.filter((item) => {
        return item?.sellingPlanAllocation?.sellingPlan;
      });

      let totalCartWithoutDiscount = 0;

      const ADdiscount = Number(cartConfig?.autoDeliveryDiscount ?? 0);
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

  useEffect(() => {
    if (
      fetcher.type === FETCHER.TYPE.ACTION_RELOAD &&
      fetcher?.data?.cart?.totalQuantity >= 0
    ) {
      if (fetcher?.data?.cart?.buyerIdentity) {
        setCartData(fetcher.data.cart);
      } else {
        removeItemData(fetcher.data.cart);
      }
    }
  }, [fetcher.type]);

  async function checkGWPThreshold() {
    const items = cart?.lines ? flattenConnection(cart.lines) : [];
    const GWP_THRESHOLD = cartConfig.freeGiftPromoThreshold;

    if (getTotalValueOnCart() >= GWP_THRESHOLD) {
      if (items.length === 1 && IS_GWP_PRODUCT_ON_CART) {
        // @TODO: TECH DEBT - Convert duplicated logic into a function
        const cartLineItem = items.find(
          (item) =>
            item.merchandise.id ===
            `gid://shopify/ProductVariant/${GWP_PRODUCT_VARIANT_ID}`,
        );
        const linesIds = [cartLineItem.id];
        const formData = new FormData();
        formData.append('cartAction', 'REMOVE_FROM_CART');
        formData.append('linesIds', JSON.stringify(linesIds));
        try {
          // Using fetcher.submit() for form submission
          await fetcher.submit(formData, {
            method: API_METHODS.POST,
            action: '/cart',
          });
        } catch (error) {
          // Handle errors
          return console.error('GWP fail to add to cart', error);
        }
      }
      if (!hasOnlyGiftCards()) {
        if (!IS_GWP_PRODUCT_ON_CART) {
          const lineItem = {
            merchandiseId: `gid://shopify/ProductVariant/${GWP_PRODUCT_VARIANT_ID}`,
            quantity: 1,
          };

          const formData = new FormData();
          formData.append('cartAction', 'ADD_TO_CART');
          formData.append('lines', JSON.stringify([lineItem]));

          try {
            // Using fetcher.submit() for form submission
            await fetcher.submit(formData, {
              method: API_METHODS.POST,
              action: '/cart',
            });
          } catch (error) {
            // Handle errors
            return console.error('GWP fail to add to cart', error);
          }
        }
      } else {
        if (IS_GWP_PRODUCT_ON_CART) {
          // @TODO: ADD error handling here if cartLineItem is undefined
          // @TODO: TECH DEBT - Convert duplicated logic into a function
          const cartLineItem = items.find(
            (item) =>
              item.merchandise.id ===
              `gid://shopify/ProductVariant/${GWP_PRODUCT_VARIANT_ID}`,
          );
          const linesIds = [cartLineItem.id];
          const formData = new FormData();
          formData.append('cartAction', 'REMOVE_FROM_CART');
          formData.append('linesIds', JSON.stringify(linesIds));
          try {
            // Using fetcher.submit() for form submission
            await fetcher.submit(formData, {
              method: API_METHODS.POST,
              action: '/cart',
            });
          } catch (error) {
            // Handle errors
            return console.error('GWP fail to remove from cart', error);
          }
        }
      }
    } else {
      if (IS_GWP_PRODUCT_ON_CART) {
        // @TODO: TECH DEBT - Convert duplicated logic into a function
        const cartLineItem = items.find(
          (item) =>
            item.merchandise.id ===
            `gid://shopify/ProductVariant/${GWP_PRODUCT_VARIANT_ID}`,
        );
        const linesIds = [cartLineItem.id];
        const formData = new FormData();
        formData.append('cartAction', 'REMOVE_FROM_CART');
        formData.append('linesIds', JSON.stringify(linesIds));
        try {
          // Using fetcher.submit() for form submission
          await fetcher.submit(formData, {
            method: API_METHODS.POST,
            action: '/cart',
          });
        } catch (error) {
          // Handle errors
          return console.error('GWP fail to remove from cart', error);
        }
      }
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
        const AD_DISCOUNT = Number(cartConfig?.autoDeliveryDiscount || 0);
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
    const ITEMS_WITH_NO_GWP = items?.filter(
      (item) => parseGid(item?.merchandise?.id)?.id !== GWP_PRODUCT_VARIANT_ID,
    );

    return ITEMS_WITH_NO_GWP?.every((item) =>
      GIFT_CARDS_VARIANTS_IDS.includes(+parseGid(item?.merchandise?.id)?.id),
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

  const addAutoDeliveryItemsToLocalStorage = () => {
    if (cart?.lines) {
      const items = flattenConnection(cart.lines);
      const autoDeliveryItems = items?.filter((item) => {
        return item?.sellingPlanAllocation?.sellingPlan;
      });

      const valuesToStore = autoDeliveryItems?.map((item) => ({
        id: item?.merchandise?.product?.id,
      }));

      localStorage.setItem('ADItems', JSON.stringify(valuesToStore));
    } else localStorage.removeItem('ADItems');
  };

  productRecList.productList = productRecList.productList.filter((product) => {
    const variants = product?.variants
      ? flattenConnection(product.variants)
      : [];
    for (let it = 0; it < items?.length; it++) {
      if (variants?.[0]?.id === items[it].id) {
        return false;
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

  useEffect(() => {
    if (status === 'loaded' || status === 'error') {
      getCustomerData();
    }
  }, [status]);

  useEffect(() => {
    setupListrakCart();
  }, [cart.lines]);

  function setupListrakCart() {
    const {lines, id, checkoutUrl} = cart;

    const cartProducts = flattenConnection(lines);
    const isCartEmpty = cartProducts?.length === 0;
    const isCartUpdated = compareItemsState(cartProducts, prevState);

    if (prevState === null && !isCartEmpty) {
      prevState = cartProducts;
      updateListrakCart(
        cartProducts,
        id,
        checkoutUrl,
        isAutoDeliveryInCart(cartProducts),
      );
    } else if (prevState !== null && isCartUpdated) {
      if (isCartEmpty && prevState?.length > 0) {
        if (typeof window !== 'undefined') {
          window._ltk?.SCA?.ClearCart();
        }
      } else {
        updateListrakCart(
          cartProducts,
          id,
          checkoutUrl,
          isAutoDeliveryInCart(cartProducts),
        );
      }
      prevState = cartProducts;
    }
  }

  const cartContentProps = {
    cart,
    items,
    cartConfig,
    productRecs: recommendations,
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
  const productRecList = productRecs;

  function toggleModal() {
    setShowModal(!showModal);
  }

  const itemsListProps = {
    items,
    cartConfig,
    carbonOffsetItem,
    productRecList,
    hasOnlyGiftCards: () => hasOnlyGiftCards(),
    ...props,
  };

  const emptyCartProps = {
    cartConfig,
    handleClick,
    isLoggedIn: account?.id !== '',
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
        <ProgressBar cart={cart} cartConfig={cartConfig} />
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

const ItemsList = ({
  cartConfig,
  setLoading,
  products,
  productRecList,
  ...props
}) => {
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
          return (total += Number(
            value?.cost?.amountPerQuantity?.amount * value.quantity ?? 0,
          ));
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

  const shouldRenderGiftProduct =
    isFreeGitPromoActivate(cartConfig) &&
    !props?.hasOnlyGiftCards() &&
    products.products.find((product) =>
      product.id.includes(cartConfig.freeGiftPromoProductExternalID),
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
            const product = products?.products?.filter(
              (product) =>
                parseGid(product.variants.nodes[0].id).id ===
                parseGid(item.merchandise.id).id,
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
                  product={product}
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
            const product = products?.products?.filter(
              (product) =>
                parseGid(product.variants.nodes[0].id).id ===
                parseGid(item.merchandise.id).id,
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
                  product={product}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>

      {shouldRenderGiftProduct && (
        <FreeGiftPromoProduct
          product={products.products.find((product) =>
            product.id.includes(cartConfig.freeGiftPromoProductExternalID),
          )}
          isMystery={cartConfig?.freeGiftPromoIsMisteryProductToggle}
          anonymousImageSrc={cartConfig?.freeGiftPromoMysteryImage}
          productPrice={cartConfig?.freeGiftPromoProductPrice || '0.00'}
          active={shouldActivateFreeGift()}
        />
      )}
      <SliderCartRec
        productRecs={productRecList}
        limit={getRecItemsLimit()}
        items={items}
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

export default SliderCart;

const ItemLoader = () => (
  <div>
    <LoadingSkeleton width="60px" height="70px" />
    <LoadingSkeleton width="249px" height="36px" />
    <LoadingSkeleton width="200px" height="34px" />
  </div>
);

const SkeletonLoader = () => {
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
