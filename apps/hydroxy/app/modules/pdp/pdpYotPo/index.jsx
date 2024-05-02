import PDPYotPoReviews from '../pdpYotPoReviews';
import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const PDPYotPo = ({product, YotpoRef, env}) => {
  let curProduct;
  curProduct = product;

  return (
    <div ref={YotpoRef} id={'yotpoWrapper'} className={'yotpoWrapper'}>
      <PDPYotPoReviews product={curProduct} env={env} />
    </div>
  );
};

export default PDPYotPo;
