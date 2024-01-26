import {Link} from '@remix-run/react';
import {
  triggerAnalyticsProductClick,
  triggerAnalyticsLoyaltyEvents,
} from '~/utils/functions/eventFunctions';
import AddToCartButton, {
  links as addToCartButtonStyles,
} from '../addToCartButton';
import styles from './styles.css';
import {useCustomerState} from '~/hooks/useCostumer';

const getLinkToObj = (slug, product) => {
  return {pathname: `/products/${slug}`, state: {product: product}};
};

const stringToBeReplacedOnProductVariant = 'gid://shopify/ProductVariant/';

export const links = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
    ...addToCartButtonStyles(),
  ];
};

const YotpoRedeemProductBox = ({yotpoProduct = {}}) => {
  const {isLoggedIn} = useCustomerState();

  const {product, yotpo_points_value, variant_id, variant_name, widget_id} =
    yotpoProduct;

  const {
    images = {},
    alt_title = '',
    handle: slug = '',
    name = '',
  } = product || {};

  const yotpoVariant = product?.variants?.nodes.length
    ? product?.variants.nodes.find((variant) => {
        const externalId = variant?.id.replace(
          stringToBeReplacedOnProductVariant,
          '',
        );

        return externalId === variant_id;
      })
    : null;
  const currentProductName = yotpoVariant ? `${name} - ${variant_name}` : name;

  return (
    <div className={'redeemProductsSection_plpWrapper'} id={`product-${slug}`}>
      <div className="redeemProductsSection_container">
        <Link
          className="redeemProductsSection_imageContainer"
          to={getLinkToObj(slug, product)}
          prefetch="false"
          onClick={() => triggerAnalyticsProductClick(null)}
        >
          {images?.nodes ? (
            <>
              <img
                className="redeemProductsSection_productImage"
                src={images?.nodes[0]?.url}
                alt={images?.nodes[0]?.altText}
              />

              <img
                className="redeemProductsSection_productImage dinamicImage"
                src={images?.nodes[1]?.url}
                alt={images?.nodes[1]?.altText}
              />
            </>
          ) : null}
        </Link>

        <div className="redeemProductsSection_infoContainer">
          <Link
            className="redeemProductsSection_title"
            to={getLinkToObj(slug, product)}
            prefetch="false"
            onClick={() => triggerAnalyticsProductClick(null)}
          >
            {alt_title}
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
          {yotpo_points_value?.toLocaleString()} points
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
                availableForSale={product?.totalInventory > 0}
              />
            </div>
            <span>step two:</span>
            <div
              className="yotpo-widget-instance"
              data-yotpo-instance-id={widget_id?.toString()}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default YotpoRedeemProductBox;

const Button = ({product, opensBlank = false, yotpoVariant, ...rest}) => {
  const {variants, tags, handle: slug} = product || {};

  const hasVariants = variants?.nodes?.length > 1;
  const hasYotpoVariant = Boolean(yotpoVariant);
  const forceSoldOut = product && tags.includes('force_sold_out');

  if (hasYotpoVariant) {
    const addYotpoVariantItem = {
      variantId: Number(
        yotpoVariant.id.replace(stringToBeReplacedOnProductVariant, ''),
      ),
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
    !!tags?.find((tag) => tag?.toUpperCase() === 'OUT_OF_STOCK');

  const addItem = outOfStock
    ? {}
    : {
        variantId: Number(
          variants?.nodes[0]?.id.replace(
            stringToBeReplacedOnProductVariant,
            '',
          ),
        ),
        quantity: 1,
        selling_plan_id: 0,
        product,
      };

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
