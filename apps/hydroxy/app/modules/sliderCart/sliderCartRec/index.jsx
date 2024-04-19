import React from 'react';
import PDPAddToCart, {links as pdpAddToCartStyles} from '../../addToCartButton';
import styles from './styles.css';
import {Image, flattenConnection} from '@shopify/hydrogen';
import {useStore} from '~/hooks/useStore';
import useCurrency from '~/hooks/useCurrency';

//

export const links = () => {
  return [{rel: 'stylesheet', href: styles}, ...pdpAddToCartStyles()];
};

//

const SliderCartRec = ({productRecs, limit, gwpProductId}) => {
  const {getCurrency} = useCurrency();
  const cart = useStore((state) => state.cart.data);
  const items = cart?.lines ? flattenConnection(cart.lines) : [];

  //

  if (limit > 0 && productRecs?.productList.length > 0) {
    return (
      <div className={'sliderCartRec'}>
        <h2>{productRecs?.title ?? 'Boost your TULA routine with'}</h2>
        {productRecs?.productList
          ?.filter((product) => {
            const cartItem =
              items?.find((item) =>
                product.variants?.nodes.find(
                  (variant) => variant.id === item.merchandise.id,
                ),
              ) ?? null;
            return !product?.id?.includes(gwpProductId) && !cartItem;
          })
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
                        aspectRatio="4:5"
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
                      content={{
                        addToCart: '+ ADD',
                      }}
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
