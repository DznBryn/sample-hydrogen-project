import {useEffect, useRef} from 'react';
import {triggerAnalyticsOnScroll} from '~/utils/functions/eventFunctions';
import {useCollection} from '~/hooks/useCollection';
import Product, {links as productStyles} from '../../plp/plpProductBox';
import {getIdFromGid} from '~/utils/functions/eventFunctions';

import styles from './styles.css';
import LoadingSkeleton from '~/modules/global/loadingSkeleton';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}, ...productStyles()];
};

const HomepageRecs = ({active, collection}) => {
  const {state, products} = useCollection(collection.collectionId);

  // Analytics stuff
  const homeRecContainer = useRef(null);
  useEffect(() => {
    if (active && state === 'loaded') {
      triggerAnalyticsOnScroll(
        homeRecContainer.current,
        products,
        collection.name,
      );
    }
  }, [active, state]);

  return (
    <div
      className={active ? 'homepageRecProducts' : 'homepageRecProducts hidden'}
    >
      {state === 'loaded' ? (
        products.slice(0, 4).map((product, index) => {
          return (
            <Product
              product={product}
              key={product?.id}
              className={'product'}
              analytics={{
                click: {
                  actionField: {list: 'Homepage'},
                  products: [
                    {
                      name: product?.title,
                      id: getIdFromGid(product?.id),
                      price: parseInt(
                        product?.priceRange?.minVariantPrice?.amount,
                      )?.toFixed(2),
                      category: product?.productType,
                      variant: '',
                      position: index,
                    },
                  ],
                },
              }}
            />
          );
        })
      ) : (
        <>
          <ProductPlaceholder />
          <ProductPlaceholder />
          <ProductPlaceholder />
          <ProductPlaceholder />
        </>
      )}
    </div>
  );
};

const ProductPlaceholder = () => {
  return (
    <div className={'productPlaceholder'}>
      <LoadingSkeleton />
      <LoadingSkeleton width="119px" height="16px" />
      <LoadingSkeleton height="16px" />
      <LoadingSkeleton height="16px" />
      <LoadingSkeleton width="119px" height="16px" />
      <LoadingSkeleton height="37px" />
    </div>
  );
};

export default HomepageRecs;
