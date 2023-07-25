import { /*useEffect,*/ useRef/*, useState*/ } from 'react';
import { Link/*, useFetcher*/ } from '@remix-run/react';
import { useCartActions/*, useCartState*/ } from '../../../hooks/useCart';
import { getCurrency } from '../../../utils/functions/eventFunctions';
// import getApiKeys from '../../../utils/functions/getApiKeys';

import styles from './styles.css';
// import { UpdateCartButton } from '~/routes/($lang)/cart';

// let sitewide = false;
export const links = () => {
  return [
    { rel: 'stylesheet', href: styles }
  ];
};
const SliderCartProductBox = ({ item = {}, /*promo,*/ cartPageConfig = {}/*, setSliderCartLoading, product*/ }) => {

  const inputQtyRef = useRef();
  // const { items } = useCartState();
  // const updateCartItem = useFetcher();
  // const updateCartItemRef = useRef(null);
  const { updateItems, removeItems/*, addItems*/ } = useCartActions();
  // const [forceChange, setForceChange] = useState(false);
  // const carbonOffsetVariant = getApiKeys().CLOVERLY_ID;
  // const carbonOffsetIsOnCart = items.filter(item => convertStorefrontIdToExternalId(item?.variant?.product?.id) === carbonOffsetVariant)[0]; 
  let sellingPlanName = '';
  let isSellingPlan = false;
  // let isLoyaltyRedeem = false;
  // const sellingPlansDropdown = React.useRef(null);
  // const switcherInput = React.useRef(null);

  const changeCartQty = async (qty) => {
    try {
      await updateItems({ id: item.line_item_id, quantity: qty });
    } catch (e) {
      console.log(e);
    }
  };
  const handleAdd = () => {
    const curQty = parseInt(inputQtyRef.current.value);
    if (curQty < 5) {
      inputQtyRef.current.value = curQty + 1;
      return changeCartQty(curQty + 1);
    }
  };
  const handleSub = () => {
    const curQty = parseInt(inputQtyRef.current.value);
    if (curQty !== 1) {
      inputQtyRef.current.value = curQty - 1;
      return changeCartQty(curQty - 1);
    }
  };
  const handleDelete = async () => {

    const itemsToRemove = [item.line_item_id];
    // if (carbonOffsetIsOnCart && items.length === 2){
    //   itemsToRemove.push(carbonOffsetVariant);
    // }

    await removeItems(itemsToRemove);

  };

  if (item?.customAttributes?.some((atribute) => atribute.key === 'loyalty_redeem')) {
    // isLoyaltyRedeem = true;
  }

  if (item?.customAttributes?.some((atribute) => atribute.key === 'selling_plan')) {
    isSellingPlan = true;
    for (let it = 0; it < cartPageConfig.sellingPlans.length; it++) {
      if (cartPageConfig.sellingPlans[it].sellingPlanID === Number(item?.customAttributes.find((el) => el.key === 'selling_plan').value)) {
        const currentPlan = cartPageConfig.sellingPlans[it];
        sellingPlanName = currentPlan?.name;

      }
    }
  }

  // async function switchProductAD(e) {

  //   const changeToAD = switcherInput.current.checked;

  //   const itemToAdd = {
  //     id: item.variant.id,
  //     quantity: parseInt(inputQtyRef.current.value),
  //   };

  //   if (changeToAD) itemToAdd.customAttributes = [{ key: 'selling_plan', value: String(getCurSellingPlan()) }];

  //   setSliderCartLoading(true);

  //   await handleDelete();
  //   await addItems(itemToAdd);

  //   setSliderCartLoading(false);

  // }

  // function getCurSellingPlan() {

  //   const recommendedSellingPlan = item?.customAttributes.find((el) => el?.key === 'selling_plan') && Number(item?.customAttributes.find((el) => el?.key === 'selling_plan')?.value); // ###
  //   const hasRecommendedSellingPlan = (recommendedSellingPlan !== undefined) && (recommendedSellingPlan !== 0);

  //   const itemCurrentSellingPlan = Number(item?.customAttributes.find((el) => el?.key === 'selling_plan')?.value);
  //   const dropdownValue = parseInt(sellingPlansDropdown?.current?.value);

  //   const defaultSellingPlan = cartPageConfig.sellingPlans[(hasRecommendedSellingPlan) ? (recommendedSellingPlan) : 0]?.sellingPlanID;

  //   return dropdownValue || (itemCurrentSellingPlan || defaultSellingPlan);

  // }

  // useEffect(() => {
  //   if (window.localStorage.getItem('tulaSitewide') !== null) {
  //     sitewide = JSON.parse(window.localStorage.getItem('tulaSitewide'));
  //   }
  //   setForceChange(true);
  // }, []);

  // const Price = ({ isSellingPlan, item, promo }) => {

  //   if (isSellingPlan || (sitewide && !sitewide?.excludeList?.includes(product.externalId)) || promo) {
  //     const origPrice = (promo && promo.showPromo) ? (Number(item.variant.compareAtPrice).toFixed(2) / ((parseInt(promo.productDiscount) / 100).toFixed(2) - 1)) : Number(item?.variant?.price).toFixed(2);

  //     return (<div>
  //       <h6 className={'strikeThrough'}>{getCurrency() + parseFloat(origPrice).toFixed(2)}</h6>
  //       <h6 className={((sitewide && !sitewide?.excludeList?.includes(product.externalId)) || promo) ? 'promo' : ''}>{getCurrency() + Number(item?.variant?.price).toFixed(2)}</h6>
  //     </div>);
  //   }
  //   else {
  //     return <h6>{getCurrency() + Number(item?.variant?.price).toFixed(2)}</h6>;
  //   }
  // };

  // const ADSwitcherContent = () => {

  //   return (

  //     <div className={'switcherContainer'}>

  //       <label className={'switcher'}>
  //         <input type="checkbox" onChange={switchProductAD} checked={isSellingPlan} ref={switcherInput} />
  //         <span className={'slider'}></span>
  //       </label>

  //       {
  //         (isSellingPlan) ? (

  //           <div className={'selectContainer'}>
  //             <label htmlFor="adOptions">ship every </label>
  //             <select ref={sellingPlansDropdown} id="adOptions" onChange={switchProductAD}>
  //               {
  //                 cartPageConfig.sellingPlans.map(plan =>
  //                   <option key={plan._id} value={plan.sellingPlanID} selected={plan.sellingPlanID === getCurSellingPlan()}>
  //                     {plan.name}
  //                     {(plan.sellingPlanID === cartPageConfig.sellingPlans[item?.recommendedSellingPlan - 1]?.sellingPlanID) && ' (recommended)'}
  //                   </option>
  //                 )
  //               }
  //             </select>
  //           </div>

  //         ) : (


  //           <span>Switch to Auto Delivery & <b>get 15% off & free shipping + <span>300 rewards points!*</span></b></span>

  //         )
  //       }

  //     </div>

  //   );

  // };


  const YotpoProductPrice = ({ price }) => (
    <div className={'yotpoProductPriceContainer'}>
      <LoyaltyBadgeIcon />
      <span>{isSellingPlan ? price + 300 : price}</span>
    </div>
  );

  const RegularProduct = () => (
    <div className={'sliderCartProduct'}>
      <div className={'productImage'}>
        <Link to={`products/${item?.handle}?variant=${item?.variant_id}`}>
          <img className='productImage' src={item?.image?.url} alt={item?.image?.altText} />
        </Link>
      </div>
      <div className={'productInfo'}>
        <div className={'productTitle'}>
          <h6> {item?.title} </h6>
          {isSellingPlan && <h6 className={'autoDeliver'}>Auto-Deliver every {sellingPlanName}</h6>}

          <YotpoProductPrice price={Number(item?.variant?.price) * 10} />

        </div>
        <div className={'productQty'}>
          <div className={'product_input'}>
            <button type="button" className={'minus'} onClick={handleSub}>
              <span></span><span style={{ display: 'none' }} className="ae-compliance-indent"> Reduce Quantity </span>
              <span style={{ display: 'none' }} className="ae-compliance-indent"> {item?.title}  </span>
            </button>
            <input type="text" value={item?.quantity} min="0" ref={inputQtyRef} readOnly="readonly" name="updates[33187716673:307c12b24eaffc6df04a594677e63385]" className="product-quantity" id={`quantity--${item.id}`} aria-label="Quantity" />
            <button type="button" className={'plus'} onClick={handleAdd}>
              <span></span><span style={{ display: 'none' }} className="ae-compliance-indent"> Increase Quantity </span>
              <span style={{ display: 'none' }} className="ae-compliance-indent"> {item?.title}  </span>
            </button>
            <div className={'productTotal'}>
              <h6>{getCurrency() + Number(item?.cost?.totalAmount?.amount).toFixed(2)}</h6>
              {/* {forceChange && (<></>
                // <Price
                //   isSellingPlan={isSellingPlan}
                //   item={item}
                //   promo={promo} />
              )} */}
            </div>
          </div>
        </div>
      </div>
      <div className={'productDelete'} onClick={handleDelete}>
        <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.641509 4.16981H1.8055L2.72767 18.0049C2.75022 18.342 3.02963 18.6038 3.36792 18.6038H13.6321C13.9704 18.6038 14.2498 18.342 14.2723 18.0049L15.1945 4.16981H16.3585C16.7131 4.16981 17 3.88289 17 3.5283C17 3.17372 16.7131 2.88679 16.3585 2.88679H12.0283V0.64151C12.0283 0.286915 11.7414 0 11.3868 0H5.61321C5.25861 0 4.9717 0.286925 4.9717 0.64151V2.88679H0.641509C0.286915 2.88679 0 3.17372 0 3.5283C0 3.88289 0.286925 4.16981 0.641509 4.16981ZM11.5196 13.0182C11.7702 13.2687 11.7702 13.6747 11.5196 13.9253C11.3943 14.0506 11.2302 14.1132 11.066 14.1132C10.9019 14.1132 10.7377 14.0506 10.6124 13.9253L8.49997 11.8128L6.38751 13.9253C6.26222 14.0506 6.09808 14.1132 5.93393 14.1132C5.76978 14.1132 5.60567 14.0506 5.48035 13.9253C5.22976 13.6747 5.22976 13.2687 5.48035 13.0182L7.59281 10.9057L5.48035 8.79323C5.22976 8.54265 5.22976 8.13668 5.48035 7.88611C5.73094 7.63554 6.1369 7.63552 6.38748 7.88611L8.49994 9.99857L10.6124 7.88611C10.863 7.63552 11.2689 7.63552 11.5195 7.88611C11.7701 8.1367 11.7701 8.54266 11.5195 8.79323L9.40706 10.9057L11.5196 13.0182ZM6.25472 1.28302H10.7453V2.88679H6.25472V1.28302Z" fill="black" fillOpacity="0.3" />
        </svg>
      </div>
      {/* {
        item.hasSellingPlans && <ADSwitcherContent />
      } */}
    </div>
  );

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

  // const LoyaltyProduct = () => (
  //   <div className={'sliderCartProduct'}>
  //     <div className={'productImage'}>
  //       <Link to={`products/${item?.variant?.product?.handle}?variant=${item?.variant?.product?.id}`}>
  //         {/* <ResponsiveImage src={item.variant.image.src} alt={item.variant.image.altText} /> */}
  //       </Link>
  //     </div>
  //     <div className={'loyaltyContainer'}>
  //       <div className={'loyaltyProductInfo'}>
  //         <div className={'loyaltyBadge'}>
  //           <LoyaltyBadgeIcon />
  //           <p className={'loyaltyBadgeText'}>TULA 24-7 REWARD</p>
  //         </div>
  //         <h6 className={'loyaltyPrice'}>({getCurrency() + Number(item?.variant?.price).toFixed(2)})</h6>
  //       </div>
  //       <div className={'productTitle'}>
  //         <h6> {item?.title} </h6>
  //       </div>
  //     </div>
  //   </div>
  // );

  return <RegularProduct />;
};


export default SliderCartProductBox;
