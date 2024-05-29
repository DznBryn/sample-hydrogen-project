import HorizontalProduct, {
  links as plpHorizontalProductBoxStyles,
} from '../plpHorizontalProductBox';
import {useCollection} from '~/hooks/useCollection';

import styles from './styles.css';
import {useEffect, useState} from 'react';
import {getIdFromGid} from '~/utils/functions/eventFunctions';

export const links = () => {
  return [
    {rel: 'stylesheet', href: styles},
    ...plpHorizontalProductBoxStyles(),
  ];
};

const GenericRecommendedProducts = ({title, productsSlugs = []}) => {
  const {state, products} = useCollection('all');
  const [recProducts, setRecProducts] = useState([]);

  useEffect(() => {
    if (state === 'loaded') {
      const allProducts = productsSlugs.map((slug) => {
        return products.filter((product) => product.handle === slug)[0];
      });

      setRecProducts([allProducts.slice(0, 2), allProducts.slice(2, 4)]);
    }
  }, [state]);

  return recProducts.length > 0 ? (
    <div className={'container'}>
      <div className={'header'}>
        <h2>{title}</h2>
      </div>
      <div className={'content'}>
        {recProducts.map((row, idx) => (
          <div key={idx} className={'productsWrapper'}>
            {row.map((product, idx) => (
              <HorizontalProduct
                key={idx}
                is2Columns={true}
                product={product}
                analytics={{
                  click: {
                    actionField: {list: `${title}`},
                    products: [
                      {
                        name: product?.title,
                        id: getIdFromGid(product?.id),
                        price: parseFloat(
                          product?.priceRange?.minVariantPrice?.amount,
                        )?.toFixed(2),
                        category: product?.productType,
                        variant: '',
                        position: idx,
                      },
                    ],
                  },
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default GenericRecommendedProducts;
