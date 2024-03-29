const PDPYotPoReviews = (product) => {
  const productID = product?.id.replace(/[^0-9]/g, '');
  return (
    <section className="YotpoProductReviews">
      <div
        className="yotpo yotpo-main-widget"
        data-product-id={productID}
        data-currency="USD"
        data-image-url={product?.images?.[0]?.url}
        data-name={product?.title}
        data-price={product?.priceRange?.maxVariantPrice?.amount}
        data-url={`/products/${product?.handle}`}
      ></div>
    </section>
  );
};
export default PDPYotPoReviews;
