import {useCallback, useEffect, useRef, useState} from 'react';
import {Link, useFetcher, useRouteLoaderData} from '@remix-run/react';
import {Image, parseGid} from '@shopify/hydrogen';
import {useStore} from '~/hooks/useStore';
import {API_METHODS, FETCHER} from '~/utils/constants';
import styles from './styles.css';
import {PortableText} from '@portabletext/react';
import useCurrency from '~/hooks/useCurrency';
import {useCustomer} from '~/hooks/useCustomer';

//

let sitewide = false;

//

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

//
const SliderCartProductBox = ({
  item = {},
  promo,
  cartPageConfig = {},
  product,
}) => {
  const {getCurrency} = useCurrency();
  const inputQtyRef = useRef();
  const [forceChange, setForceChange] = useState(false);
  const toggleCart = useStore((store) => store?.cart?.toggleCart ?? (() => {}));
  let sellingPlanName = '';
  let isSellingPlan = false;
  let isLoyaltyRedeem = false;
  const sellingPlansDropdown = useRef(null);
  const switcherInput = useRef(null);

  if (item?.attributes?.some((atribute) => atribute.key === 'loyalty_redeem')) {
    isLoyaltyRedeem = true;
  }

  if (item?.sellingPlanAllocation?.sellingPlan) {
    isSellingPlan = true;
    for (let it = 0; it < cartPageConfig.sellingPlans.length; it++) {
      if (
        cartPageConfig.sellingPlans[it].sellingPlanID ===
        Number(parseGid(item.sellingPlanAllocation.sellingPlan.id)?.id)
      ) {
        const currentPlan = cartPageConfig.sellingPlans[it];
        sellingPlanName = currentPlan?.name;
      }
    }
  }

  if (item?.sellingPlanAllocation) {
    isSellingPlan = true;
    for (let it = 0; it < cartPageConfig.sellingPlans.length; it++) {
      if (
        cartPageConfig.sellingPlans[it].sellingPlanID ===
        item?.sellingPlanAllocation?.selling_plan?.id
      ) {
        const currentPlan = cartPageConfig.sellingPlans[it];
        sellingPlanName = currentPlan?.name.replace(' (recommended)', '');
      }
    }
  }

  function getSellingPlan() {
    const itemCurrentSellingPlan =
      parseGid(item?.sellingPlanAllocation?.sellingPlan?.id)?.id ?? null;

    const dropdownValue = parseInt(sellingPlansDropdown?.current?.value);

    const defaultSellingPlan = cartPageConfig.sellingPlans.at(2)?.sellingPlanID;

    return itemCurrentSellingPlan
      ? itemCurrentSellingPlan
      : dropdownValue
      ? dropdownValue
      : defaultSellingPlan;
  }

  useEffect(() => {
    if (window.localStorage.getItem('tulaSitewide') !== null) {
      sitewide = JSON.parse(window.localStorage.getItem('tulaSitewide'));
    }
    setForceChange(true);
  }, []);

  const LoyaltyProduct = () => (
    <div className={'sliderCartProduct'}>
      <div className={'PB-productImage'}>
        <Link
          to={{
            pathname: `/products/${item?.merchandise?.product?.handle}`,
            search: `?variant=${parseGid(item?.merchandise?.id)?.id}`,
          }}
          onClick={toggleCart}
          prefetch={true}
        >
          <Image
            className="PB-productImage"
            data={item?.merchandise?.image}
            // sizes="(min-width: 45em) 50vw, 100vw"
          />
        </Link>
      </div>
      <div className={'loyaltyContainer'}>
        <div className={'loyaltyProductInfo'}>
          <div className={'loyaltyBadge'}>
            <LoyaltyBadgeIcon />
            <p className={'loyaltyBadgeText'}>TULA 24-7 REWARD</p>
          </div>
          <h6 className={'loyaltyPrice'}>
            ({getCurrency() + Number(item?.cost?.totalAmount.amount).toFixed(2)}
            )
          </h6>
        </div>
        <div className={'productTitle'}>
          <h6> {item?.merchandise?.product?.title} </h6>
        </div>
      </div>
    </div>
  );

  const productProps = {
    item,
    isSellingPlan,
    sellingPlanName,
    inputQtyRef,
    forceChange,
    promo,
    product,
    cartPageConfig,
    AutoDelivery: {
      sellingPlansDropdown,
      switcherInput,
      cartPageConfig,
      getSellingPlan: useCallback(() => getSellingPlan(), []),
    },
  };

  return isLoyaltyRedeem ? (
    <LoyaltyProduct />
  ) : (
    <RegularProduct {...productProps} />
  );
};

//

const YotpoProductPrice = ({points}) => (
  <div className={'yotpoProductPriceContainer'}>
    <LoyaltyBadgeIcon />
    <span>{points}</span>
  </div>
);

//

const RegularProduct = ({
  item,
  sellingPlanName,
  inputQtyRef,
  AutoDelivery,
  forceChange,
  promo,
  product,
  cartPageConfig,
}) => {
  const {getCurrency} = useCurrency();
  const rootData = useRouteLoaderData('root');
  const tulaSiteWide = useRef(null);
  const {id: customerId = ''} = useCustomer();
  const toggleCart = useStore((store) => store?.cart?.toggleCart ?? (() => {}));
  const hasSellingPlans = item?.merchandise?.product?.tags?.find((tag) =>
    tag.includes('subscriptionEligible'),
  );
  const shouldShowYotpoPoints = rootData.ENVS?.SITE_NAME.includes('US');

  if (
    typeof window === 'object' &&
    tulaSiteWide.current === null &&
    window?.localStorage?.getItem('tulaSitewide') !== null
  ) {
    tulaSiteWide.current = JSON.parse(
      window.localStorage.getItem('tulaSitewide'),
    );
  }

  function getPoints() {
    const PRICE = Number(item?.cost?.totalAmount?.amount);
    const SHOW_SITE_WIDE_PROMO =
      tulaSiteWide.current?.promoDiscount &&
      !tulaSiteWide.current?.excludeList?.includes(
        item?.merchandise?.product?.handle,
      );

    if (item.sellingPlanAllocation) {
      return Math.floor(PRICE) * 10 + 300;
    } else if (SHOW_SITE_WIDE_PROMO) {
      const discount = PRICE * (tulaSiteWide.current?.promoDiscount / 100);
      return Math.floor(PRICE - discount) * 10;
    } else {
      return Math.floor(PRICE) * 10;
    }
  }
  //

  return (
    <div className={'sliderCartProduct'}>
      <div className={'PB-productImage'}>
        <Link
          to={{
            pathname: `/products/${item?.merchandise?.product?.handle}`,
            search: `?variant=${parseGid(item?.merchandise?.id)?.id}`,
          }}
          onClick={toggleCart}
          prefetch={true}
        >
          <Image
            className="PB-productImage"
            data={item?.merchandise?.image}
            // sizes="(min-width: 45em) 50vw, 100vw"
          />
        </Link>
      </div>
      <div className={'productInfo'}>
        <div className={'productTitle'}>
          <h6>
            {item?.merchandise?.product?.title}{' '}
            {`${
              !item?.merchandise?.title?.toLowerCase().includes('default')
                ? `- ${item?.merchandise?.title}`
                : ''
            }`}
          </h6>
          {item.sellingPlanAllocation && (
            <h6 className={'autoDeliver'}>
              Auto-Deliver every {sellingPlanName}
            </h6>
          )}

          {!isNaN(Number(item?.cost?.totalAmount?.amount)) &&
            customerId !== '' &&
            shouldShowYotpoPoints && <YotpoProductPrice points={getPoints()} />}
        </div>
        <div className={'productQty'}>
          <div className={'product_input'}>
            <UpdateItemButton
              lineIds={[
                {
                  id: item?.id,
                  quantity:
                    item?.quantity && item.quantity > 1
                      ? Number(Math.max(0, item.quantity - 1).toFixed(0))
                      : 1,
                },
              ]}
            >
              <button type="submit" className={'minus'}>
                <span></span>
                <span
                  style={{display: 'none'}}
                  className="ae-compliance-indent"
                >
                  {' '}
                  Reduce Quantity{' '}
                </span>
                <span
                  style={{display: 'none'}}
                  className="ae-compliance-indent"
                >
                  {' '}
                  {item?.title}{' '}
                </span>
              </button>
            </UpdateItemButton>
            <input
              type="text"
              value={item?.quantity}
              min="0"
              ref={inputQtyRef}
              readOnly="readonly"
              name="updates[33187716673:307c12b24eaffc6df04a594677e63385]"
              className="product-quantity"
              id={`quantity--${item?.merchandise?.id}`}
              aria-label="Quantity"
            />
            <UpdateItemButton
              lineIds={[
                {
                  id: item?.id,
                  quantity: Number((item?.quantity + 1).toFixed(0)),
                },
              ]}
            >
              <button type="submit" className={'plus'}>
                <span></span>
                <span
                  style={{display: 'none'}}
                  className="ae-compliance-indent"
                >
                  {' '}
                  Increase Quantity{' '}
                </span>
                <span
                  style={{display: 'none'}}
                  className="ae-compliance-indent"
                >
                  {' '}
                  {item?.title}{' '}
                </span>
              </button>
            </UpdateItemButton>
          </div>
        </div>
        <div className={'productTotal'}>
          {forceChange ? (
            <Price
              isSellingPlan={item.sellingPlanAllocation}
              item={item}
              promo={promo}
              product={product}
              cartPageConfig={cartPageConfig}
            />
          ) : (
            <h6>
              {getCurrency() +
                Number(item?.cost?.totalAmount?.amount).toFixed(2)}
            </h6>
          )}
        </div>
      </div>
      <RemoveItemButton lineId={item?.id} />
      {hasSellingPlans && <ADSwitcherContent item={item} {...AutoDelivery} />}
    </div>
  );
};

//

const Price = ({item, promo, product, cartPageConfig}) => {
  const {getCurrency} = useCurrency();
  const hasSitewidePromo =
    sitewide &&
    !sitewide?.excludeList?.includes(item.merchandise.product.handle);

  const selectedVariantID = parseGid(item.merchandise.id).id;

  const isSelectedVariantIncludedAtPromo =
    promo.variantIds?.includes(selectedVariantID);

  const hasPromoDiscount = promo && isSelectedVariantIncludedAtPromo;

  const isGiftCard = item.merchandise.product.title.includes('E-Gift Card');

  if (
    (hasSitewidePromo || hasPromoDiscount) &&
    item.sellingPlanAllocation === null &&
    !isGiftCard
  ) {
    const line_price =
      promo && promo.showPromo
        ? Number(item?.cost?.amountPerQuantity?.amount) *
          Number(item?.quantity) *
          (parseInt(promo.discount) / 100)
        : (
            Number(item?.cost?.amountPerQuantity?.amount) *
            Number(item?.quantity)
          ).toFixed(2);
    const sitewideDiscount = Number(sitewide?.promoDiscount ?? 0) / 100;
    const sitewideLinePrice = line_price - line_price * sitewideDiscount;

    const origPrice =
      Number(item?.cost?.amountPerQuantity?.amount ?? 0) * item?.quantity;

    return origPrice >= item?.cost?.amountPerQuantity?.amount ? (
      <div>
        <h6 className={'strikeThrough'}>
          {getCurrency() + origPrice?.toFixed(2)}
        </h6>
        {sitewide &&
        !sitewide?.excludeList?.includes(item.merchandise.product.handle) ? (
          <h6
            className={
              sitewide &&
              !sitewide?.excludeList?.includes(item.merchandise.product.handle)
                ? 'promo'
                : ''
            }
          >
            {getCurrency() + parseFloat(sitewideLinePrice).toFixed(2)}
          </h6>
        ) : (
          <h6 className={promo ? 'promo' : ''}>
            {getCurrency() + parseFloat(line_price).toFixed(2)}
          </h6>
        )}
      </div>
    ) : (
      <div>
        <h6 className={'strikeThrough'}>
          {getCurrency() + Number(item?.cost?.totalAmount?.amount).toFixed(2)}
        </h6>
        {sitewide &&
        !sitewide?.excludeList?.includes(item.merchandise.product.handle) ? (
          <h6
            className={
              sitewide &&
              !sitewide?.excludeList?.includes(item.merchandise.product.handle)
                ? 'promo'
                : ''
            }
          >
            {getCurrency() + parseFloat(sitewideLinePrice).toFixed(2)}
          </h6>
        ) : (
          <h6 className={promo ? 'promo' : ''}>
            {getCurrency() + parseFloat(line_price).toFixed(2)}
          </h6>
        )}
      </div>
    );
  } else if (item.sellingPlanAllocation !== null) {
    const ADdiscount = Number(cartPageConfig?.autoDeliveryDiscount ?? 0) / 100;
    const pricePerUnit =
      Number(item?.cost?.amountPerQuantity?.amount) * item?.quantity;
    const line_price = Number(pricePerUnit) - Number(pricePerUnit) * ADdiscount;
    return (
      <div>
        <h6 className={'strikeThrough'}>
          {getCurrency() + Number(pricePerUnit).toFixed(2)}
        </h6>
        <h6
          className={
            promo || item.sellingPlanAllocation
              ? 'promo salePrice'
              : 'salePrice'
          }
        >
          {getCurrency() + parseFloat(line_price)?.toFixed(2)}
        </h6>
      </div>
    );
  } else {
    const promoTag = product?.tags.find((tag) => tag.includes('promo:'));
    const promoColor = promoTag?.split(':')[1];

    return (
      <h6 className={`${promoTag && promoColor ? 'promo' : ''}`}>
        {getCurrency() + Number(item?.cost?.totalAmount?.amount).toFixed(2)}
      </h6>
    );
  }
};

//

const ADSwitcherContent = ({
  item,
  switcherInput,
  sellingPlansDropdown,
  cartPageConfig,
  getSellingPlan,
}) => {
  const fetcher = useFetcher();
  const {updateCart: updateItemData = () => {}} = useStore(
    (store) => store?.cart ?? {},
  );

  useEffect(() => {
    if (fetcher.type === FETCHER.TYPE.ACTION_RELOAD) {
      if (fetcher?.data?.cart?.totalQuantity) {
        updateItemData(fetcher.data.cart);
      }
    }
  }, [fetcher.type]);

  async function switchProductAD() {
    const changeToAD = switcherInput.current.checked;
    const sellingPlanId = sellingPlansDropdown.current
      ? sellingPlansDropdown?.current?.value
      : getSellingPlan();

    const lineItem = {
      id: item?.id,
      quantity: item?.quantity ?? 1,
      sellingPlanId: changeToAD
        ? `gid://shopify/SellingPlan/${sellingPlanId}`
        : null,
    };

    const formData = new FormData();
    formData.append('cartAction', 'UPDATE_CART');
    formData.append('lines', JSON.stringify([lineItem]));

    try {
      // Using fetcher.submit() for form submission
      return await fetcher.submit(formData, {
        method: API_METHODS.POST,
        action: '/api/cart',
      });
    } catch (error) {
      // Handle errors
      return console.error('Auto-delivery Request Failed', error);
    }
  }

  return (
    <div className={'switcherContainer'}>
      <label className={'switcher'}>
        <input
          type="checkbox"
          onChange={switchProductAD}
          checked={
            item.sellingPlanAllocation !== null && item.sellingPlanAllocation
          }
          ref={switcherInput}
        />
        <span className={'slider'}></span>
      </label>
      {item.sellingPlanAllocation !== null ? (
        <div className={'selectContainer'}>
          <label htmlFor="adOptions">ship every </label>
          <select
            ref={sellingPlansDropdown}
            id="adOptions"
            onChange={switchProductAD}
            value={sellingPlansDropdown?.current?.value}
            defaultValue={getSellingPlan()}
          >
            {cartPageConfig?.sellingPlans?.map((plan) => (
              <option key={plan.sellingPlanID} value={plan.sellingPlanID}>
                {plan.name}
                {plan.sellingPlanID ===
                  cartPageConfig.sellingPlans[item?.recommendedSellingPlan - 1]
                    ?.sellingPlanID && ' (recommended)'}
              </option>
            ))}
          </select>
        </div>
      ) : cartPageConfig?.switchAutoDeliveryMessageRaw?.[0] ? (
        <PortableText value={cartPageConfig.switchAutoDeliveryMessageRaw[0]} />
      ) : (
        <span>
          Switch to Auto Delivery:{' '}
          <b>
            {'get 15% off & free shipping'} + <span>300 rewards points!*</span>
          </b>
        </span>
      )}
    </div>
  );
};

//

const LoyaltyBadgeIcon = () => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6Z"
      fill="#47C6D9"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 11.1C8.81665 11.1 11.1 8.81665 11.1 6C11.1 3.18335 8.81665 0.9 6 0.9C3.18335 0.9 0.9 3.18335 0.9 6C0.9 8.81665 3.18335 11.1 6 11.1ZM6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z"
      fill="#B3E5ED"
    />
    <path
      d="M5.99935 2.66687L6.78624 5.21331H9.33268L7.27257 6.7871L8.05946 9.33354L5.99935 7.75975L3.93924 9.33354L4.72613 6.7871L2.66602 5.21331H5.21246L5.99935 2.66687Z"
      fill="white"
    />
  </svg>
);

//

function RemoveItemButton({lineId}) {
  const fetcher = useFetcher();
  const {updateCart: removeItemData = () => {}} = useStore(
    (store) => store?.cart ?? {},
  );

  const linesIds = JSON.stringify([lineId]);

  useEffect(() => {
    if (fetcher.type === FETCHER.TYPE.ACTION_RELOAD) {
      if (fetcher?.data?.cart?.totalQuantity >= 0) {
        removeItemData(fetcher.data.cart);
      }
    }
  }, [fetcher.type]);

  return (
    <fetcher.Form
      action="/api/cart"
      className={'removeButton'}
      method={API_METHODS.POST}
    >
      <input type="hidden" name="cartAction" value={'REMOVE_FROM_CART'} />
      <input type="hidden" name="linesIds" value={linesIds} required />
      <button
        type="submit"
        className="productDelete"
        disabled={
          fetcher.state === FETCHER.STATE.SUBMIT ||
          fetcher.state === FETCHER.STATE.LOADING
        }
      >
        <svg
          width="17"
          height="19"
          viewBox="0 0 17 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.641509 4.16981H1.8055L2.72767 18.0049C2.75022 18.342 3.02963 18.6038 3.36792 18.6038H13.6321C13.9704 18.6038 14.2498 18.342 14.2723 18.0049L15.1945 4.16981H16.3585C16.7131 4.16981 17 3.88289 17 3.5283C17 3.17372 16.7131 2.88679 16.3585 2.88679H12.0283V0.64151C12.0283 0.286915 11.7414 0 11.3868 0H5.61321C5.25861 0 4.9717 0.286925 4.9717 0.64151V2.88679H0.641509C0.286915 2.88679 0 3.17372 0 3.5283C0 3.88289 0.286925 4.16981 0.641509 4.16981ZM11.5196 13.0182C11.7702 13.2687 11.7702 13.6747 11.5196 13.9253C11.3943 14.0506 11.2302 14.1132 11.066 14.1132C10.9019 14.1132 10.7377 14.0506 10.6124 13.9253L8.49997 11.8128L6.38751 13.9253C6.26222 14.0506 6.09808 14.1132 5.93393 14.1132C5.76978 14.1132 5.60567 14.0506 5.48035 13.9253C5.22976 13.6747 5.22976 13.2687 5.48035 13.0182L7.59281 10.9057L5.48035 8.79323C5.22976 8.54265 5.22976 8.13668 5.48035 7.88611C5.73094 7.63554 6.1369 7.63552 6.38748 7.88611L8.49994 9.99857L10.6124 7.88611C10.863 7.63552 11.2689 7.63552 11.5195 7.88611C11.7701 8.1367 11.7701 8.54266 11.5195 8.79323L9.40706 10.9057L11.5196 13.0182ZM6.25472 1.28302H10.7453V2.88679H6.25472V1.28302Z"
            fill="black"
            fillOpacity="0.3"
          />
        </svg>
      </button>
    </fetcher.Form>
  );
}

//

function UpdateItemButton({lineIds, children}) {
  const fetcher = useFetcher();
  const {updateCart: updateItemData = () => {}, data = null} = useStore(
    (store) => store?.cart ?? {},
  );
  const lines = JSON.stringify(lineIds);
  useEffect(() => {
    if (fetcher.type === FETCHER.TYPE.ACTION_RELOAD) {
      if (
        fetcher?.data?.cart?.totalQuantity &&
        fetcher?.data?.cart?.totalQuantity !== data?.totalQuantity
      ) {
        updateItemData(fetcher.data.cart);
      }
    }
  }, [fetcher.type]);
  return (
    <fetcher.Form action="/api/cart" method={API_METHODS.POST}>
      <input type="hidden" name="cartAction" value={'UPDATE_CART'} />
      <input type="hidden" name="lines" value={lines} />
      {children}
    </fetcher.Form>
  );
}

//

export default SliderCartProductBox;
