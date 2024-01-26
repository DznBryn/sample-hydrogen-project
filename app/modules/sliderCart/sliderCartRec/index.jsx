import React from 'react';
import PDPAddToCart, {links as pdpAddToCartStyles} from '../../addToCartButton';
// import ResponsiveImage from 'frontend-ui/ResponsiveImage';
import {getCurrency} from '../../../utils/functions/eventFunctions';
import styles from './styles.css';
import {Image, flattenConnection} from '@shopify/hydrogen';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}, ...pdpAddToCartStyles()];
};

const SliderCartRec = ({productRecs, limit, gwpProductId}) => {
  if (limit > 0 && productRecs?.productList.length > 0) {
    return (
      <div className={'sliderCartRec'}>
        <h2>{productRecs?.title ?? 'Boost your TULA routine with'}</h2>
        {productRecs?.productList
          ?.filter((product) => !product?.id?.includes(gwpProductId))
          .map((product, index) => {
            const variants = product?.variants
              ? flattenConnection(product.variants)
              : [];
            if (index < limit) {
              const addItem = {
                variantId: variants?.[0]?.id,
                quantity: 1,
                product,
              };
              return (
                <div key={index} className={'product'}>
                  <a href={'/products/' + product.handle}>
                    <div className="imageContainer">
                      <Image
                        className="productImage"
                        data={variants?.[0]?.image}
                        sizes="(min-width: 45em) 50vw, 100vw"
                        aspectRatio="1/1"
                      />
                    </div>
                  </a>
                  <div className={'productInfo'}>
                    <a
                      href={'/products/' + product.handle}
                      className={'productName'}
                    >
                      {product.title}
                    </a>
                    <div className={'productPrice'}>
                      {getCurrency() +
                        parseFloat(variants?.[0]?.price?.amount).toFixed(2)}
                    </div>
                  </div>
                  <div className={'addToCartContainer'}>
                    <PDPAddToCart
                      addItem={addItem}
                      classes={['addToCart']}
                      availableForSale={addItem?.product?.totalInventory > 0}
                    />
                  </div>
                </div>
              );
            }
            return null;
          })}
      </div>
    );
  } else {
    return null;
  }
};
export default SliderCartRec;
