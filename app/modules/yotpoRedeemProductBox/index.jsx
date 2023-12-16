import {Link} from '@remix-run/react';
import {
  triggerAnalyticsProductClick,
  triggerAnalyticsLoyaltyEvents,
} from '~/utils/functions/eventFunctions';
import AddToCartButton, {
  links as addToCartButtonStyles,
} from '../addToCartButton';
import {mockProduct} from './mock';
import {useStore} from '~/hooks/useStore';
import styles from './styles.css';

const getLinkToObj = (slug, product) => {
  return {pathname: `/products/${slug}`, state: {product: product}};
};

export const links = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
    ...addToCartButtonStyles(),
  ];
};

const YotpoRedeemProductBox = ({yotpoProducts = mockProduct}) => {
  const data = useStore((store) => store?.account?.data ?? null);
  const isLoggedIn = Boolean(data?.id);

  const {
    product,
    yotpoPointsValue,
    widgetId,
    variantId = '',
    variantName = '',
  } = yotpoProducts;
  const {media, alt_title: altTitle, handle: slug, name} = product;

  const yotpoVariant = product?.variants?.length
    ? product.variants.find(
        (variant) => variant.externalId === Number(variantId),
      )
    : null;
  const currentProductName = yotpoVariant ? `${name} - ${variantName}` : name;

  return (
    <div
      className={'redeemProductsSection_plpWrapper'}
      id={`product-${product?.handle ? product.handle : slug}`}
    >
      <div className="redeemProductsSection_container">
        <Link
          className="redeemProductsSection_imageContainer"
          to={getLinkToObj(slug, product)}
          prefetch="false"
          onClick={() => triggerAnalyticsProductClick(null)}
        >
          <img
            className="redeemProductsSection_productImage"
            src={media[0]?.details.src}
            alt={media[0]?.details?.alt}
          />
        </Link>

        <div className="redeemProductsSection_infoContainer">
          <Link
            className="redeemProductsSection_title"
            to={getLinkToObj(slug, product)}
            prefetch="false"
            onClick={() => triggerAnalyticsProductClick(null)}
          >
            {altTitle}
          </Link>

          <Link
            className="redeemProductsSection_subTitle"
            to={getLinkToObj(slug, product)}
            prefetch="false"
            onClick={() => triggerAnalyticsProductClick(null)}
          >
            {currentProductName}
          </Link>
        </div>

        <span className={'redeemProductsSection_yotpoPoints'}>
          <PointsIcon />
          {yotpoPointsValue.toLocaleString()} points
        </span>

        {isLoggedIn && (
          <>
            <span>step one:</span>

            <div className="redeemProductsSection_ctaContainer">
              <Button
                className="redeemProductsSection_productButton"
                product={product}
                analytics={null}
                opensBlank={null}
                yotpoVariant={yotpoVariant}
                onClick={() => {
                  triggerAnalyticsLoyaltyEvents('AddToCart', {source: null});
                }}
              />
            </div>
            <span>step two:</span>
            <div
              className="yotpo-widget-instance"
              data-yotpo-instance-id={widgetId}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default YotpoRedeemProductBox;

const Button = ({product, opensBlank = false, yotpoVariant, ...rest}) => {
  const {variants, tags, slug} = product;
  const hasVariants = variants?.length > 1;
  const hasYotpoVariant = Boolean(yotpoVariant);

  if (hasYotpoVariant) {
    const addYotpoVariantItem = {
      variantId: yotpoVariant.externalId,
      quantity: 1,
      selling_plan_id: 0,
      product,
    };

    return (
      <AddToCartButton
        addItem={addYotpoVariantItem}
        forceSoldOut={forceSoldOut}
        {...rest}
      />
    );
  }

  const outOfStock =
    !hasVariants &&
    (!!tags?.find((tag) => tag?.toUpperCase() === 'OUT_OF_STOCK') ||
      variants[0]?.quantity < 1);
  const addItem = outOfStock
    ? {}
    : {
        variantId: variants[0].externalId,
        quantity: 1,
        selling_plan_id: 0,
        product,
      };
  const forceSoldOut = product && tags.includes('force_sold_out');

  return hasVariants ? (
    <Link
      prefetch={false}
      target={opensBlank ? '_blank' : '_self'}
      to={getLinkToObj(slug, product)}
      {...rest}
    >
      Shop Options
    </Link>
  ) : (
    <AddToCartButton addItem={addItem} forceSoldOut={forceSoldOut} {...rest} />
  );
};

const PointsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} fill="none">
    <path d="M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 1 1 13 0z" fill="#47c6d9" />
    <path
      fillRule="evenodd"
      d="M6.5 12.025c3.051 0 5.525-2.474 5.525-5.525S9.551.975 6.5.975.975 3.449.975 6.5s2.474 5.525 5.525 5.525zm0 .975a6.5 6.5 0 1 0 0-13 6.5 6.5 0 1 0 0 13z"
      fill="#b3e5ed"
    />
    <path
      d="M6.5 2.889l.852 2.759h2.759L7.879 7.353l.852 2.759L6.5 8.406l-2.232 1.705.852-2.759-2.232-1.705h2.759L6.5 2.889z"
      fill="#fff"
    />
  </svg>
);
