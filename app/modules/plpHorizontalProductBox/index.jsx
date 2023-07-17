import { useState, useLayoutEffect, useEffect } from 'react';
import { getCurrency } from '~/utils/functions/eventFunctions';
import { Link } from '@remix-run/react';
import PDPAddToCart, { links as pdpAddToCartStyles } from '../pdpAddToCart';
import PLPBadges, { links as plpBadgesStyles } from '../plpBadges';
import Badges, { links as badgesStyles } from '../badges';
import Product, { links as plpProductBoxStyles } from '../plpProductBox';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...pdpAddToCartStyles(),
    ...plpBadgesStyles(),
    ...badgesStyles(),
    ...plpProductBoxStyles(),
  ];
};

const Button = ({ product, ...rest }) => {
  const [forceSoldOut, setForceSoldOut] = useState(false);
  const { variants, tags } = product;

  const outOfStock =
    variants?.length === 1 &&
    (!!tags?.find((tag) => tag?.toUpperCase() === 'OUT_OF_STOCK') ||
      variants[0]?.quantity < 1);
  let addItem = {};
  if (!outOfStock) {
    addItem = {
      variantId: product.variants[0].externalId,
      quantity: 1,
      ['selling_plan_id']: 0,
      product,
    };
  }

  useLayoutEffect(
    () =>
      product && product.tags.includes('force_sold_out')
        ? setForceSoldOut(true)
        : setForceSoldOut(false),
    []
  );

  const button = {
    out: (
      <Link
        to={{
          pathname: `/products/${product.slug}`,
          state: { product: product },
        }}
        {...rest}
        prefetch={false}>
				View Product
      </Link>
    ),

    add: (
      <div className={'addToCartContainer'}>
        <PDPAddToCart 
          addItem={addItem} 
          forceSoldOut={forceSoldOut} 
          exclusiveProductAtcColor={product?.exclusiveAtcColor}
          exclusiveProductTextColor={product?.exclusiveTextColor} 
          isGated={product?.isGated}
          {...rest} 
        />
      </div>
    ),

    view: (
      <Link
        to={{
          pathname: `/products/${product.slug}`,
          state: { product: product },
        }}
        {...rest}
        prefetch={false}>
				Shop Options
      </Link>
    ),
  };

  return outOfStock
    ? button['out']
    : variants?.length > 1
      ? button['view']
      : button['add'];
};

let sitewide = false;

const PLPHorizontalProductBox = ({ is2Columns, product, analytics, compareButtonConfig, ...rest }) => {
  const [forceChange, setForceChange] = useState(false);
  const { media = [], name, variants = [] } = product;

  is2Columns = is2Columns || false;

  const title = product.altTitle || '';
  const price =
    getCurrency() + (variants.length > 1 ? getRangePrice(variants) : variants[0].price);

  function getRangePrice(variants) {
    let allPrices = variants.map((variant) => variant.price);
    return allPrices[0] === allPrices[variants.length - 1]
      ? getCurrency() + (allPrices[0])
      : `${getCurrency() + (allPrices[0])} - ${getCurrency() + (allPrices[variants.length - 1])}`;
  }

  const getPromoPrice = (product, sitewide) => {
    let startPrice = 0;
    let endPrice = 0;
    let price = 0;
    if (
      product.variants.length > 1 &&
      product.variants[0].price !== product.variants[variants.length - 1].price
    ) {
      if (product.productPromos?.name && product.productPromos.showPromo) {
        startPrice = product.variants[0].originalPrice
          ? Number(product.variants[0].price)
          : Number(product.variants[0].price) -
            (Number(product.productPromos.discount) / 100) *
              Number(product.variants[0].price);

        endPrice = product.variants[product.variants.length - 1].originalPrice
          ? Number(product.variants[product.variants.length - 1].price)
          : Number(product.variants[product.variants.length - 1].price) -
            (Number(product.productPromos.discount) / 100) *
              Number(product.variants[product.variants.length - 1].price);

        return `${
          getCurrency() + (startPrice % 1 !== 0 ? startPrice.toFixed(2) : startPrice)
        } - ${getCurrency() + (endPrice % 1 !== 0 ? endPrice.toFixed(2) : endPrice)}`;
      }
      if (sitewide && !sitewide?.excludeList?.includes(product.externalId)) {
        startPrice =
          product.productPromos && product.productPromos.showPromo
            ? product.variants[0].price
            : Number(product.variants[0].price) -
              (Number(sitewide.promoDiscount) / 100) *
                Number(product.variants[0].price);
        endPrice =
          product.productPromos && product.productPromos.showPromo
            ? Number(variants[product.variants.length - 1].price)
            : Number(variants[product.variants.length - 1].price) -
              (Number(sitewide.promoDiscount) / 100) *
                Number(variants[product.variants.length - 1].price);
      }

      return `${
        getCurrency() + (startPrice % 1 !== 0 ? startPrice.toFixed(2) : startPrice)
      } - ${getCurrency() + (endPrice % 1 !== 0 ? endPrice.toFixed(2) : endPrice)}`;
    } else {
      if (product.productPromos && product.productPromos.showPromo) {
        price = product.variants[0].originalPrice
          ? Number(product.variants[0].price)
          : Number(product.variants[0].price) -
            (Number(product.productPromos.discount) / 100) *
              Number(product.variants[0].price);

        return getCurrency() + (price % 1 !== 0 ? price.toFixed(2) : price);
      }

      if (sitewide && !sitewide?.excludeList?.includes(product.externalId)) {
        price =
          product.productPromos && product.productPromos.showPromo
            ? product.variants[0].price
            : Number(product.variants[0].price) -
              (Number(sitewide.promoDiscount) / 100) *
                Number(product.variants[0].price);
      }

      return getCurrency() + (price % 1 !== 0 ? price.toFixed(2) : price);
    }
  };

  const getStrikethroughPrice = (product, sitewide) => {
    let startPrice = 0;
    let endPrice = 0;
    let price = 0;
    if (
      product.variants.length > 1 &&
      product.variants[0].price !== product.variants[variants.length - 1].price
    ) {
      if (product.productPromos && product.productPromos.showPromo) {
        startPrice = product.variants[0].originalPrice
          ? product.variants[0].originalPrice
          : product.variants[0].price;

        endPrice = product.variants[product.variants.length - 1].originalPrice
          ? product.variants[product.variants.length - 1].originalPrice
          : product.variants[product.variants.length - 1].price;

        return `${
          getCurrency() + (startPrice % 1 !== 0 ? startPrice.toFixed(2) : startPrice)
        } - ${getCurrency() + (endPrice % 1 !== 0 ? endPrice.toFixed(2) : endPrice)}`;
      }

      if (sitewide && !sitewide?.excludeList?.includes(product.externalId)) {
        startPrice = Number(product.variants[0].price);
        endPrice = Number(variants[product.variants.length - 1].price);
        return `${
          getCurrency() + (startPrice % 1 !== 0 ? startPrice.toFixed(2) : startPrice)
        } - ${getCurrency() + (endPrice % 1 !== 0 ? endPrice.toFixed(2) : endPrice)}`;
      }
    } else {
      if (product.productPromos && product.productPromos.showPromo) {
        price = product.variants[0].originalPrice
          ? product.variants[0].originalPrice
          : product.variants[0].price;

        return getCurrency() + (price % 1 !== 0 ? price.toFixed(2) : price);
      }

      if (sitewide && !sitewide?.excludeList?.includes(product.externalId)) {
        return getCurrency() + (product.variants[0].price);
      }
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem('tulaSitewide') !== null) {
      sitewide = JSON.parse(window.localStorage.getItem('tulaSitewide'));
    }
    setForceChange(true);
  });

  const noPromo = product?.tags.find((tag) => tag.toLowerCase() === 'no-promo');

  const PriceComp = ({ product, price, sitewide }) => {
    if ((sitewide === false && !product?.productPromos?.showPromo) || noPromo ) {
      return product?.variants[0] ? (
        product.variants[0].originalPrice > variants[0].price ? (
          <p className={'compared_price'}>
            <strong className="value">{price}</strong>
            <span>{` (${getCurrency() + product.variants[0].originalPrice} value)`}</span>
          </p>
        ) : (
          <strong className="value">{price}</strong>
        )
      ) : (
        <strong className="value">{price}</strong>
      );
    } else {
      return product?.variants[0] ? (
        product.variants[0].originalPrice > variants[0].price &&
        !product?.productPromos?.showPromo ? (
            <p className={'compared_price'}>
              <strong className="value strikethrough">
                {getStrikethroughPrice(product, sitewide)}
              </strong>
              <strong className="value promo">
                {getPromoPrice(product, sitewide)}
              </strong>
              <span>{` (${getCurrency() + product.variants[0].originalPrice} value)`}</span>
            </p>
          ) : (
            <p className={'compared_price'}>
              <strong className="value strikethrough">
                {getStrikethroughPrice(product, sitewide)}
              </strong>
              <strong className="value promo">
                {getPromoPrice(product, sitewide)}
              </strong>
            </p>
          )
      ) : (
        <p className={'compared_price'}>
          <strong className="value strikethrough">
            {getStrikethroughPrice(product, sitewide)}
          </strong>
          <strong className="value promo">
            {getPromoPrice(product, sitewide)}
          </strong>
        </p>
      );
    }
  };

  const PromoComp = ({ product, sitewide }) => {
    if (!noPromo) {
      if(!sitewide?.excludeList?.includes(product.externalId)){
        return (
          <span className="value promoMessage promo">
            {product?.productPromos && product.productPromos.showPromo
              ? product.productPromos?.promoMessage
              : sitewide.promoDiscountMessage}
          </span>
        );
      }
    } else {
      return null;
    }
  };

  // const mainImg = getResponsiveImageSrc(media[0]?.details.src, {
  //   width: media[0]?.details.width,
  // });
  // const secImg = getResponsiveImageSrc(media[1]?.details.src, {
  //   width: media[1]?.details.width,
  // });
  const mainImg = media[0]?.details.asset.url;
  const secImg = media[1]?.details.asset.url;

  const triggerAnalyticsProductClick = (analytics) => {
    if (window?.dataLayer) {
      window.dataLayer.push({
        event: 'productClick',
        ecommerce: analytics,
      });
    }
  };

  return is2Columns || window?.innerWidth > 500 ? (
    <div
      className={'plpWrapper'}
      id={`product-${product?.handle ? product.handle : product.slug}`}
    >
      <Product product={product} analytics={analytics} key={product._id} compareButtonConfig={compareButtonConfig}/>
    </div>
  ) : (
    <div
      className={'plpWrapper'}
      id={`product-${product?.handle ? product.handle : product.slug}`}
    >
      <div {...rest} className="horizontal_container">
        <div className="horizontal_sub__container">
          <div className="horizontal_image__side">
            <PLPBadges product={product} />
            <Link
              to={{
                pathname: `/products/${product.slug}`,
                state: { product: product },
              }}
              className="horizontal_imageContainer"
              prefetch="false"
              onClick={() => triggerAnalyticsProductClick(analytics)}
            >
              <img
                className="horizontal_productImage"
                src={mainImg}
                alt={media[0]?.details.alt}
                width={media[0]?.details.width}
                height={media[0]?.details.height}
              />
              <img
                className="horizontal_productImage horizontal_dinamicImage"
                src={secImg}
                alt={media[1]?.details.alt}
                width={media[1]?.details.width}
                height={media[1]?.details.height}
              />
            </Link>
          </div>
          <div className="horizontal_details__side">
            {product.variants[0].originalPrice > variants[0].price &&
              !sitewide && (
              <div className={'badge'}>
                <Badges
                  message={`Save ${Math.round(
                    (1 -
                        variants[0].price / product.variants[0].originalPrice) *
                        100
                  )}%`}
                />
              </div>
            )}
            <Link
              to={{
                pathname: `/products/${product.slug}`,
                state: { product: product },
              }}
              className="horizontal_title"
              prefetch="false"
              onClick={() => triggerAnalyticsProductClick(analytics)}
            >
              {title}
              <p className="horizontal_subTitle">{name}</p>
            </Link>
            {forceChange && (
              <PriceComp product={product} price={price} sitewide={sitewide} />
            )}
            <PromoComp product={product} sitewide={sitewide} />
            <Button
              className="horizontal_productButton"
              product={product}
              onClick={() => triggerAnalyticsProductClick(analytics)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default PLPHorizontalProductBox;
