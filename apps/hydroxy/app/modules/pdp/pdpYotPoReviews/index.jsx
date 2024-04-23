const PDPYotPoReviews = ({product, env}) => {
  const productID = product?.id?.replace(/[^0-9]/g, '');
  const instanceIdByEnv = {
    CA_PROD: 706356,
    US_STG: 637693,
    US_PROD: 637693,
    UK_PROD: 706468,
  };

  return (
    <section className="YotpoProductReviews">
      <div
        className="yotpo-widget-instance"
        data-yotpo-instance-id={instanceIdByEnv[env ?? 'US_PROD']}
        data-yotpo-product-id={productID}
        data-yotpo-name={product?.title}
        data-yotpo-url={`/products/${product?.handle}`}
        data-yotpo-image-url={product?.images?.[0]?.url}
        data-yotpo-price={product?.priceRange?.maxVariantPrice?.amount}
        data-yotpo-currency="USD"
        data-yotpo-description={product?.description || ''}
      ></div>
    </section>
  );
};
export default PDPYotPoReviews;
