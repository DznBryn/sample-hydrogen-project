import HorizontalProduct, { links as plpHorizontalProductBoxStyles } from '../plpHorizontalProductBox';
import { useCollection } from '~/hooks/useCollection';

import styles from './styles.css';
import { useEffect, useState } from 'react';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...plpHorizontalProductBoxStyles(),
  ];
};

const GenericRecommendedProducts = ({ title, productsSlugs = [] }) => {

  const { state, products } = useCollection('all');
  const [recProducts, setRecProducts] = useState([]);

  useEffect(() => {

    if (state === 'loaded') {

      const allProducts = productsSlugs.map((slug) => {
        return products.filter(product => product.handle === slug)[0];
      });

      setRecProducts([allProducts.slice(0, 2), allProducts.slice(2, 4)]);

    }


  }, [state]);

  return (
    (recProducts.length > 0) ? (
      <div className={'container'}>
        <div className={'header'}>
          <h2>{title}</h2>
        </div>
        <div className={'content'}>
          {recProducts.map((row, idx) => (
            <div key={idx} className={'productsWrapper'}>
              {row.map((product, idx) =>
                <HorizontalProduct key={idx} is2Columns={true} product={product} />
              )}
            </div>
          ))}
        </div>
      </div>
    ) : <></>
  );
};

export default GenericRecommendedProducts;