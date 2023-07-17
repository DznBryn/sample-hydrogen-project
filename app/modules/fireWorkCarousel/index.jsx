import React, { useEffect } from 'react';
import { appendScript } from '~/utils/functions/eventFunctions';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const FireWorkCarousel = ({ playlist }) => {
  useEffect(() => {
    /* FireWork Script Call Code */
    appendScript('//asset.fwcdn2.com/js/fwn.js')?.then(() => { });

    /* Products Hydration */
    document.addEventListener('fw:shopping:hydrate-products', async (/*event*/) => {
      // const { products, video, actions } = event.detail;
    });

    /* Cart Hydration */
    document.addEventListener('fw:shopping:hydrate-cart', async (/*event*/) => {
      // const { actions } = event.detail;
    });

    /* Cart Content Has Changed Hydration */
    document.addEventListener('fw:shopping:cart-updated', async (/*event*/) => {
      // const { product, product_unit, quantity } = event.detail;
    });

    window._fwnStoreFront = false;
    document.addEventListener('fw:shopping:hydrate-products', (evt) => {
      const { products, actions } = evt.detail;
      for (const product of products) {
        actions.shopping.hydrateProduct(({ productFactory }) => {
          return productFactory((p) => {
            const newProduct = p
              .ext_id(product.product_ext_id);
            // eslint-disable-next-line
            for (const [i, variant] of product.product_units.entries()) {
              newProduct.variant((v) => {
                const newVariant = v
                  .ext_id(variant.unit_ext_id)
                  .url(variant.unit_url.replace(/https:\/\/([a-z0-9-]*)?.myshopify.com/, window.origin));
                return newVariant;
              });
            }
            return newProduct;
          });
        });
      }
    });

  }, []);

  return (
    <div className={'fwCarouselWrapper'}>
      {
        <fw-embed-feed
          channel="tula135020676"
          playlist={playlist}
          mode="row"
          open_in="default"
          max_videos="0"
          placement="middle"
          branding="false"
          player_placement="bottom-right"
        >
        </fw-embed-feed>
      }
    </div>
  );
};

export default FireWorkCarousel;