import { useState, useEffect, useRef } from 'react';
import { triggerAnalyticsProductClick, getCurrency } from '~/utils/functions/eventFunctions';
import PDPAddToCart, {links as pdpAddToCartStyles} from '../pdpAddToCart';
import getApiKeys from '~/utils/functions/getApiKeys';
import { comparisonUtils } from '../comparisonModal';
import { Link } from '@remix-run/react';
import classNames from 'classnames';
// import useStore from 'frontend-store'; TODO

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...pdpAddToCartStyles(),
  ];
};

let sitewide = false;

const mockProduct = {
  altTitle: 'ageless skin begins here',
  _id: 'd94285b4-fc7e-488a-918a-cfe57e155a94',
  availableForSale: true,
  descriptionHtml:
		'<meta charset="utf-8"><meta charset="utf-8"><span>This effective yet gentle foam cleanser is where clear skin begins. 2% salicylic acid provides major acne-clearing power, while superfood licorice helps brighten the look of past blemish marks. Alcohol and fragrance-free, this cleanser treats regular or occasional breakouts, leaving skin looking soft &amp; glowing.</span>',
  maxPrice: 34,
  media: [
    {
      Type: 'MediaImage',
      _id: '9d390549-1f28-4850-9f86-1fbfc3233f2d',
      details: {
        _type: 'image',
        alt: 'Acne Foam Cleanser - tula-devstore',
        height: 1272,
        mimeType: 'image/png',
        name: 'tula-skincare-pdp-keepItClear_01.png',
        size: 198530,
        src: 'https://cdn.shopify.com/s/files/1/1736/9637/files/1_24-7-Moisture_Regular_TulaUS_PackagingSwatch.jpg?v=1651726771',
        storageID: 'a6668e41-ecf6-448b-ace1-005ee92ca7de',
        width: 1024,
      },
      externalId: 2917078958139,
      fileName: 'tula-skincare-pdp-keepItClear_01.png',
      storefrontId: 'gid://shopify/MediaImage/2917078958139',
    },
    {
      Type: 'MediaImage',
      _id: 'a4732691-b805-4e52-83df-65afa20bcbc2',
      details: {
        _type: 'image',
        alt: 'Acne Foam Cleanser - tula-devstore',
        height: 1272,
        mimeType: 'image/png',
        name: 'tula-skincare-pdp-keepItClear_02.png',
        size: 249410,
        src: 'https://f.shgcdn.com/8722ee95-6b8d-4c69-9276-b611fb371985/',
        storageID: '8722ee95-6b8d-4c69-9276-b611fb371985',
        width: 1024,
      },
      externalId: 2917078990907,
      fileName: 'tula-skincare-pdp-keepItClear_02.png',
      storefrontId: 'gid://shopify/MediaImage/2917078990907',
    },
    {
      Type: 'MediaImage',
      _id: '88bc6dc0-e952-4fc3-8e4e-b985907c11c0',
      details: {
        _type: 'image',
        alt: 'Acne Foam Cleanser - tula-devstore',
        height: 1272,
        mimeType: 'image/jpeg',
        name: 'tula_skincare-pdp-keepItClear_06-min.jpg',
        size: 82132,
        src: 'https://f.shgcdn.com/058edb43-624f-48cf-be0d-c47d4c055628/',
        storageID: '058edb43-624f-48cf-be0d-c47d4c055628',
        width: 1024,
      },
      externalId: 2917079023675,
      fileName: 'tula_skincare-pdp-keepItClear_06-min.jpg',
      storefrontId: 'gid://shopify/MediaImage/2917079023675',
    },
    {
      Type: 'MediaImage',
      _id: '854dc882-a5b4-4fe5-a48a-269357bd36a8',
      details: {
        _type: 'image',
        alt: 'Acne Foam Cleanser - tula-devstore',
        height: 1272,
        mimeType: 'image/jpeg',
        name: 'tula_skincare-pdp-keepItClear_04-min.jpg',
        size: 70669,
        src: 'https://f.shgcdn.com/72293855-a1c9-44f1-8939-45cdbe4c727a/',
        storageID: '72293855-a1c9-44f1-8939-45cdbe4c727a',
        width: 1024,
      },
      externalId: 2917079056443,
      fileName: 'tula_skincare-pdp-keepItClear_04-min.jpg',
      storefrontId: 'gid://shopify/MediaImage/2917079056443',
    },
    {
      Type: 'MediaImage',
      _id: '8de0526d-8ddd-4427-b9c1-38c53a452dd7',
      details: {
        _type: 'image',
        alt: 'Acne Foam Cleanser - tula-devstore',
        height: 1272,
        mimeType: 'image/jpeg',
        name: 'tula_skincare-pdp-keepItClear_03-min.jpg',
        size: 140127,
        src: 'https://f.shgcdn.com/6c59a7b7-1605-418f-a4e0-386e6caa4e1c/',
        storageID: '6c59a7b7-1605-418f-a4e0-386e6caa4e1c',
        width: 1024,
      },
      externalId: 2917079089211,
      fileName: 'tula_skincare-pdp-keepItClear_03-min.jpg',
      storefrontId: 'gid://shopify/MediaImage/2917079089211',
    },
  ],
  minPrice: 34,
  name: 'Level 1 Firming & Smoothing Discovery Kit (trial size)',
  options: [
    {
      _id: '50407bff-825e-4065-929f-b9545da1f25f',
      externalId: 5440486178875,
      name: 'Size',
      position: 1,
      storefrontId: 'gid://shopify/ProductOption/5440486178875',
      values: [
        {
          _id: '40221d1e-a409-4677-910b-932e1cfbdd72',
          name: 'Size',
          storefrontId: 'gid://shopify/ProductOption/5440486178875/1.5 oz',
          value: '1.5 oz',
        },
        {
          _id: 'db876249-a983-4379-a68a-7b29943539e8',
          name: 'Size',
          storefrontId: 'gid://shopify/ProductOption/5440486178875/3.7 oz',
          value: '3.7 oz',
        },
      ],
    },
  ],
  slug: 'acne-foam-cleanser',
  tags: [
    'Badge:new',
    'Concern - Acne',
    'concern - acne & blemish control',
    'Concern - Blemish Control',
    'new',
    'oily-skin',
    'Type - Cleansers',
    'Type - Normal',
    'Type - Oily',
    'no-promo',
    'Badge:holiday'
  ],
  variants: [
    {
      _id: 'd239f96a-233d-4b58-a582-d95cd3413aab',
      availableForSale: true,
      externalId: 31508852277294,
      name: '1.5 oz',
      originalPrice: 0,
      position: 1,
      price: 44,
      quantity: 41395,
      selectedOptions: [
        {
          _id: '40221d1e-a409-4677-910b-932e1cfbdd72',
          name: 'Size',
          storefrontId: 'gid://shopify/ProductOption/5440486178875/1.5 oz',
          value: '1.5 oz',
        },
      ],
      sku: '1031-1',
      storefrontId:
				'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMTUwODg1MjI3NzI5NA==',
      tracksInventory: true,
    },
    {
      _id: '98310e4b-ca31-47c8-9916-5244f98a0a33',
      availableForSale: false,
      externalId: 31508852310062,
      name: '3.7 oz',
      originalPrice: 0,
      position: 2,
      price: 34,
      quantity: 1,
      selectedOptions: [
        {
          _id: 'db876249-a983-4379-a68a-7b29943539e8',
          name: 'Size',
          storefrontId: 'gid://shopify/ProductOption/5440486178875/3.7 oz',
          value: '3.7 oz',
        },
      ],
      sku: '1031-2',
      storefrontId:
				'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMTUwODg1MjMxMDA2Mg==',
      tracksInventory: true,
    },
  ],

  productPromos: {
    name: 'Product promo A',
    productPromoMessage: 'Product-level promo A (40%)',
    showPromo: true,
    discount: 40,
    _id: 'f9389806-e9f1-4cef-b020-839655bef2c9',
  },
};

const getLinkToObj = (slug, product) => { return { pathname: `/products/${slug}`, state: { product: product } }; };

const Button = ({ product, opensBlank = false, ...rest }) => {
  const { variants, tags, slug } = product;
  const hasVariants = variants?.length > 1;
  
  const outOfStock = (!hasVariants) && (!!tags?.find((tag) => tag?.toUpperCase() === 'OUT_OF_STOCK') || variants[0]?.quantityAvailable < 1);
  const addItem = (outOfStock) ? {} : {variantId: window.btoa(variants[0]?.externalId), quantity: 1, ['selling_plan_id']: 0, product};
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

const PLPProductBox2 = ({ product = mockProduct, analytics, compareButtonConfig = {showIt: false}, ctaOpensBlank = false }) => {

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


const PLPBadges = ({ product = mockProduct }) => {

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

  const [store] = {store: {}};
  // const [store] = useStore(); //TODO
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