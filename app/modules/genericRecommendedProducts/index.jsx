import HorizontalProduct, { links as plpHorizontalProductBoxStyles } from '../plpHorizontalProductBox';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...plpHorizontalProductBoxStyles(),
  ];
};

const GenericRecommendedProducts = ({ title, products = []}) => {
  const firstProductsRow = products.slice(0, 2);
  const secondProductsRow = products.slice(2, 4);

  const allProducts = [firstProductsRow, secondProductsRow];

  return(
    <div className={'container'}>
      <div className={'header'}>
        <h2>{title}</h2>
      </div>

      <div className={'content'}>
        {allProducts.map((row, idx) => (
          <div key={idx} className={'productsWrapper'}>
            {row.map((product, idx) => 
              <HorizontalProduct key={idx} is2Columns={true} product={product} />
            )}
          </div>
        ))}       
      </div>
    </div>
  );
};

export default GenericRecommendedProducts;