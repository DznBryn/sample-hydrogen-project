const PDPYotPoReviews = (product) => {
  return (
    <section className="YotpoProductReviews">
      <div className="yotpo yotpo-main-widget"
        data-currency="USD"
        data-image-url={product.thumbnail?.src.length ? product.thumbnail?.src : ''}
        data-name={product.name}
        data-price={product.maxPrice}
        data-product-id={product.externalId}
        data-url={`/products/${product.slug}`}
      >
      </div>
    </section>
  );
};
export default PDPYotPoReviews;
