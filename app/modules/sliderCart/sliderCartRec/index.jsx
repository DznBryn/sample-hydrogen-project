import React from 'react';
import PDPAddToCart, { links as pdpAddToCartStyles } from '../../addToCartButton';
// import ResponsiveImage from 'frontend-ui/ResponsiveImage';
import { getCurrency } from '../../../utils/functions/eventFunctions';
import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...pdpAddToCartStyles(),
  ];
};

const SliderCartRec = ({ productRecs, limit, gwpProductId }) => {
  if (limit > 0 && productRecs?.productList.length > 0) {
    return (
      <div className={styles.sliderCartRec}>
        <h2>Boost your TULA routine with</h2>
        {productRecs?.productList?.filter((product) => (product.externalId !== gwpProductId))
          .map((product, index) => {
            if (index < limit) {
              const addItem = { variantId: product.variants[0].externalId, quantity: 1, /*selling_plan_id: 0,*/ product };
              return (
                <div key={index} className={styles.product}>
                  <a href={'/products/' + product.slug}>
                    {/* <ResponsiveImage className={styles.productImage} src={product.media[0]?.details.src} /> */}
                  </a>
                  <div className={styles.productInfo}>
                    <a href={'/products/' + product.slug} className={styles.productName}>
                      {product.name}
                    </a>
                    <div className={styles.productPrice}>
                      {getCurrency() + parseFloat(product.variants[0].price).toFixed(2)}
                    </div>
                  </div>
                  <div className={styles.addToCartContainer} >
                    <PDPAddToCart addItem={addItem} />
                  </div>
                </div>
              );
            }
            return null;
          })}
      </div>
    );
  } else { return null; }
};
export default SliderCartRec;