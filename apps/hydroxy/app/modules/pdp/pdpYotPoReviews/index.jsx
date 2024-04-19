const PDPYotPoReviews = (product) => {
  const productID = product?.id.replace(/[^0-9]/g, '');
  return (
    <section className="YotpoProductReviews">
      <div
        className="yotpo-widget-instance"
        data-yotpo-instance-id="637693"
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
