import { useState, useEffect, useRef } from 'react';
import { triggerAnalyticsProductClick, getCurrency } from '~/utils/functions/eventFunctions';
import PDPAddToCart, {links as pdpAddToCartStyles} from '../pdpAddToCart';
import getApiKeys from '~/utils/functions/getApiKeys';
import { comparisonUtils } from '../comparisonModal';
import { Link } from '@remix-run/react';
import classNames from 'classnames';
import { useComparisonModalStore } from '~/hooks/useStore';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...pdpAddToCartStyles(),
  ];
};

let sitewide = false;

const getLinkToObj = (slug, product) => { return { pathname: `/products/${slug}`, state: { product: product } }; };

const Button = ({ product, opensBlank = false, ...rest }) => {
  const { variants, tags, slug } = product;
  const hasVariants = variants?.length > 1;
  
  // const outOfStock = (!hasVariants) && (!!tags?.find((tag) => tag?.toUpperCase() === 'OUT_OF_STOCK') || variants[0]?.quantityAvailable < 1);
  // const addItem = (outOfStock) ? {} : {variantId: window.btoa(variants[0]?.externalId), quantity: 1, ['selling_plan_id']: 0, product};
  const forceSoldOut = (product && tags.includes('force_sold_out'));
  
  return (hasVariants) 
    ? <Link prefetch={false} target={opensBlank ? '_blank' : '_self'} to={getLinkToObj(slug, product)} {...rest}>Shop Options</Link>
    : <PDPAddToCart 
      addItem={{
        variantId: product.variants?.nodes?.[0].id,
        slug: product.handle,
        action: 'ADD_TO_CART'
      }} 
      forceSoldOut={forceSoldOut}
      exclusiveProductAtcColor={product?.exclusiveAtcColor}
      exclusiveProductTextColor={product?.exclusiveTextColor}
      isGated={product?.isGated}
      fromPLP
      {...rest}/>;
};

const PLPProductBox2 = ({ product, analytics, compareButtonConfig = {showIt: false}, ctaOpensBlank = false }) => {

  const { images, variants = [], title, productPromos = null, slug, name} = product;
  const media = images.nodes;
  const altTitle = title;

  const [forceChange, setForceChange] = useState(false);
  const noPromo = product?.tags.find((tag) => tag.toLowerCase() === 'no-promo');

  // const mainImg = getResponsiveImageSrc(media[0]?.details.src, { width: media[0]?.details.width });
  // const secImg = getResponsiveImageSrc(media[1]?.details.src, { width: media[1]?.details.width });
  const mainImg = media[0]?.url;
  const secImg = media[1]?.url;

  useEffect(() => { 

    if (window.localStorage.getItem('tulaSitewide') !== null) {

      sitewide = JSON.parse(window.localStorage.getItem('tulaSitewide'));

    }

    setForceChange(true);
  });

  function getPrice(){

    const hasVariants = variants.length > 1;
    const price = variants[0].price.amount;
    const gotDifferentPrices = !(variants.every((value) => value.price.amount === price));
    const productPrice = price.toString().includes('.') ? price.toFixed(2) : price;

    return getCurrency() + ((hasVariants && gotDifferentPrices) ? getRangePrice() : productPrice);

  }

  function getRangePrice() { 
		
    return `${Math.min(...variants.map((variant) => variant.price))}+`;

  }

  const getPromoPrice = () => {

    let newPrice = 0;
    const price = parseInt(variants.nodes[0]?.price?.amount);
    const originalPrice = parseInt(variants.nodes[0]?.compareAtPrice?.amount);
    const getPriceToShow = () => getCurrency() + (newPrice % 1 !== 0 ? newPrice.toFixed(2) : newPrice);
    const getPriceWithDiscounts = (from) => ( Number(price) - (Number(from) / 100) * Number(price) );

    if (variants.length > 1 && price !== variants[variants.length - 1].price) {

      if (productPromos && productPromos?.name && productPromos.showPromo) {

        newPrice = originalPrice ? Number(price) : getPriceWithDiscounts(productPromos.discount);
        return `${getPriceToShow()}+`;

      }

      if (sitewide && !sitewide?.excludeList?.includes(product.externalId)) newPrice = productPromos && productPromos.showPromo ? price : getPriceWithDiscounts(sitewide.promoDiscount);

      return `${getPriceToShow()}+`;

    } else {

      if (productPromos && productPromos.showPromo) {

        newPrice = originalPrice ? Number(price) : getPriceWithDiscounts(productPromos.discount);
        return `${getPriceToShow()}`;

      }

      if (sitewide && !sitewide?.excludeList?.includes(product.externalId)) newPrice = productPromos && productPromos.showPromo ? price : getPriceWithDiscounts(sitewide.promoDiscount);

      return `${getPriceToShow()}`;

    }

  };

  const getStrikethroughPrice = () => {

    let newPrice = 0;
    const price = parseInt(variants.nodes[0]?.price?.amount);
    const originalPrice = parseInt(variants.nodes[0]?.compareAtPrice?.amount);
    const getPriceToShow = () => getCurrency() + (newPrice % 1 !== 0 ? newPrice.toFixed(2) : newPrice);

    if (variants.length > 1 && price !== variants[variants.length - 1].price) {

      if (productPromos && productPromos.showPromo) {

        newPrice = originalPrice ? originalPrice : price;
        return `${getPriceToShow()}+`;

      }

      if (sitewide && !sitewide?.excludeList?.includes(product.externalId)) newPrice = Number(price);

      return `${getPriceToShow()}+`;

    } else {

      if (productPromos && productPromos.showPromo) {

        newPrice = originalPrice ? originalPrice : price;
        return `${getPriceToShow()}`;

      }

      if (sitewide && !sitewide?.excludeList?.includes(product.externalId)) return getCurrency() + (price);
			
    }
		
  };

  const PriceComp = () => {

    const price = parseInt(variants.nodes[0]?.price?.amount);
    const originalPrice = parseInt(variants.nodes[0]?.compareAtPrice?.amount);

    const originalPriceHigher = originalPrice > price;
    const noPromoPrice = (sitewide === false && !product?.productPromos?.showPromo) || noPromo || (sitewide?.excludeList?.includes(product.externalId)) ;
    if (noPromoPrice ) {

      return originalPriceHigher ? (

        <p className={'compared_price'}>
          <strong className='value'>{getPrice()}</strong>
          <span>{` (${getCurrency() + (originalPrice)} value)`}</span>
        </p>

      ) : (

        <strong className='value'>{getPrice()}</strong>

      );
			
    } else {

      return (

        <p className={'compared_price'}>
          <strong className='value strikethrough'>{getStrikethroughPrice()}</strong>{' '}
          <strong className='value promo'>{getPromoPrice()}</strong>
          { (originalPriceHigher && !product?.productPromos?.showPromo) && (<span>{` (${getCurrency() + (originalPrice)} value)`}</span>) }
        </p>

      );

    }
  };

  const PromoComp = ({ product, sitewide }) => {
    if (!noPromo) {
      if(!sitewide?.excludeList?.includes(product.externalId)){
        return (
          <span className='promoText'>
            {product?.productPromos && productPromos.showPromo
              ? productPromos?.promoMessage
              : sitewide.promoDiscountMessage}
          </span>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  return (

    <div className={'plpWrapper'} id={`product-${product?.handle ? product.handle : slug}`}>

      <div className='container'>

        <PLPBadges product={product} sitewide={sitewide} noPromo={noPromo}/>

        <Link className='imageContainer' to={getLinkToObj(slug, product)} prefetch='false' onClick={() => triggerAnalyticsProductClick(analytics)}>
          <img className='productImage' src={mainImg} alt={media[0]?.altText} />
          <img className='productImage dinamicImage' src={secImg} alt={media[1]?.altText}/>
        </Link>

        <div className='infoContainer'>

          <Link className='title' to={getLinkToObj(slug, product)} prefetch='false' onClick={() => triggerAnalyticsProductClick(analytics)}>
            {altTitle}
          </Link>

          <Link className='subTitle' to={getLinkToObj(slug, product)} prefetch='false' onClick={() => triggerAnalyticsProductClick(analytics)}>
            {name}
          </Link>

          <div className='reviewRates2'>
            <div className='yotpo bottomLine' style={{ pointerEvents: 'none' }} data-product-id={product?.externalId}></div>
          </div>

          { forceChange && <PriceComp /> }

          <PromoComp product={product} sitewide={sitewide} /> 

        </div>

        <div className='ctaContainer'>
          <Button
            className='productButton'
            product={product}
            analytics={analytics}
            opensBlank={ctaOpensBlank}
            onClick={() => triggerAnalyticsProductClick(analytics)}
          />
        </div>

        { 
          (compareButtonConfig.showIt) && <ComparisonCheckbox slug={slug}/>
        }

      </div>
    </div>
  );
};

export default PLPProductBox2;

/**
 * 





 */


const PLPBadges = ({ product }) => {

  const { variants, tags } = product;

  const price = parseInt(variants.nodes[0]?.price?.amount);
  const originalPrice = parseInt(variants.nodes[0]?.compareAtPrice?.amount);

  if (product?.exclusiveTextColor) {
    return null;
  }

  const showSaveBadge = (originalPrice > price);
  const savePorcentage = Math.round((1 - price / originalPrice) * 100);

  const showHolidayBadge = tags.some(tag => (tag.toLowerCase().split('badge:')[1]?.match(/^holiday$/) || tag.toLowerCase().match(/^holiday$/)));

  function chooseBadgeTagStyle(tag, customClass) {
    const sanitizedTag = tag.toLowerCase();

    const roseGlowTags = ['badge-chrome:limited edition', 'badge-chrome:new'];

    if (roseGlowTags.find(tag => tag === sanitizedTag.trim()) && getApiKeys().CURRENT_ENV.includes('US')) {
      return classNames.bind(styles)('roseGlowBadgeContainer', customClass);
    }

    return classNames.bind(styles)('tag', customClass);
  }
	
  const Badge = () => {

    let customBadge;
    const MAXIMUM_TAGS_PER_BADGE = 2;
    const doubleTags = [];
    const buildCustomClass = (tag = '') => tag ? tag.toLowerCase().replace(' ', '-') : '';

    if (tags) {

      for (let tag of tags) {
        if (tag?.includes('badge:') && !tag?.includes('pdp') && !tag?.includes('holiday')) {

          if ((tag?.split('badge:')[1].toLocaleLowerCase() === 'limited edition' || tag?.split('badge:')[1].toLocaleLowerCase() === 'new') && doubleTags.length <= MAXIMUM_TAGS_PER_BADGE) {
            doubleTags.push(tag?.split('badge:')[1]);
          }
          customBadge = tag.split('badge:')[1];

        } else if (tag?.includes('Badge:') && !tag?.includes('holiday')) {

          customBadge = tag.split('Badge:')[1];

        } else if (tag?.includes('badge-chrome:')) {
          doubleTags.push(tag);
        }

      }

      const sortedTags = doubleTags?.sort()?.reverse();

      if (sortedTags.length > 0) {
        return (<>
          {sortedTags.map(tag => {
            let customClass = buildCustomClass(tag);
            let badge = tag?.includes('badge-chrome:') ? tag?.split('badge-chrome:')[1] : tag;

            return <span key={tag} className={chooseBadgeTagStyle(tag, customClass)}>{badge}</span>;
          })}</>);
      }

      let customClass = buildCustomClass(customBadge);

      return customBadge ? <span className={`tag ${customClass}`}>{customBadge}</span> : null;

    }

    return null;
  };

  const HolidayBadge = () => {
    const HolidayIcon = () => (
      <svg
        width={12}
        height={12}
        viewBox="0 0 9 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.0937 0C3.0937 2.3751 1.81017 4.5 0 4.5C1.81017 4.5 3.0937 6.62505 3.0937 9C3.0937 6.62505 4.37723 4.5 6.1874 4.5C4.37723 4.5 3.0937 2.3751 3.0937 0ZM6.74989 4.5C6.74989 5.6877 6.10835 6.75 5.20296 6.75C6.10835 6.75 6.74989 7.8126 6.74989 9C6.74989 7.8126 7.39143 6.75 8.29681 6.75C7.39143 6.75 6.74989 5.6877 6.74989 4.5ZM7.45308 0C7.45308 1.18755 6.81154 2.25 5.90615 2.25C6.81139 2.25 7.45308 3.3126 7.45308 4.5C7.45308 3.3126 8.09461 2.25 9 2.25C8.09461 2.25 7.45308 1.18755 7.45308 0Z"
          fill="white"
        />
      </svg>
    );

    return (
      <div className={'tag holidayBadgeContainer'}>
        <HolidayIcon/>
        <span>Holiday</span>
      </div>
    );
  };

  return (

    <div className={'badgeContainer'}>

      { (showSaveBadge) && <span className={'tag saveTag'}>{`save ${savePorcentage}%`}</span> }
      {showHolidayBadge ? <HolidayBadge /> : <Badge product={product} />}

    </div>

  );
};

const ComparisonCheckbox = ({slug}) => {

  const {store} = useComparisonModalStore();
  const checkInputRef = useRef(null);

  useEffect(() => {

    const itsAdded = comparisonUtils.getSavedData().includes(slug);
    checkInputRef.current.checked = itsAdded;

  }, [store]);

  function handleCompareButtonOnChange() {

    const itsChecked = checkInputRef.current.checked;
    (itsChecked) ? comparisonUtils.addItem(slug) : comparisonUtils.removeItem(slug);

  }

  function isClickDisabled(){
		
    const disableAllCheckbox = store?.PLP?.disableAllCheckbox;
    const itsNotChecked = !(checkInputRef?.current?.checked);

    return disableAllCheckbox && itsNotChecked;

  }

  return (

    <div className='compareButton'>

      <label className={`compareCheckbox ${isClickDisabled() ? 'disabled' : ''}`} onChange={handleCompareButtonOnChange}>

        <input ref={checkInputRef} type='checkbox' disabled={isClickDisabled()}/>
        <span className='checkmark'></span> 
        {'compare'}

      </label>

    </div>
  );

};