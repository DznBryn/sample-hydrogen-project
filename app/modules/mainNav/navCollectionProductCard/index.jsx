import {Link} from '@remix-run/react';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const NavCollectionProductCard = ({product = {}}) => {
  const thumbnail = product.images.nodes[0];
  // const thumbnail = product.thumbnail;
  return (
    <div className={'productWrap'}>
      <Link
        reloadDocument
        className={'productLink'}
        to={'/products/' + product.handle}
        draggable="false"
      >
        <img
          src={thumbnail?.url + '&width=100'}
          alt={thumbnail?.altText}
          className={'productImg'}
          draggable="false"
        />
      </Link>
      {/* {product.alt_title !== undefined &&
        <Link
          reloadDocument
          className={'productLink'}
          to={'/products/' + product.handle}
          draggable="false">
          <div className={'productAlt'}>
            {product.alt_title}
          </div>
        </Link>
      } */}
      <Link
        reloadDocument
        className={'productLink'}
        to={'/products/' + product.handle}
        draggable="false"
      >
        <div className={'navCollectionProductCardProductName'}>
          {product.title}
        </div>
      </Link>
    </div>
  );
};
export default NavCollectionProductCard;
