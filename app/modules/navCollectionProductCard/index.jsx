import { Link } from '@remix-run/react';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const NavCollectionProductCard = ({ product = {} }) => {
  const thumbnail = product.images.nodes[0];
  // const thumbnail = product.thumbnail;
  return (
    <div className={'productWrap'}>
      <Link
        className={'productLink'}
        to={'/products/' + product.handle}
        draggable="false">
        <img
          src={thumbnail?.url}
          alt={thumbnail?.altText}
          // src={thumbnail?.src}
          // alt={thumbnail?.alt}
          className={'productImg'}
          draggable="false" />
      </Link>
      {product.alt_title !== undefined &&
        <Link
          className={'productLink'}
          to={'/products/' + product.handle}
          draggable="false">
          <div className={'productAlt'}>
            {product.alt_title}
          </div>
        </Link>
      }
      <Link
        className={'productLink'}
        to={'/products/' + product.handle}
        draggable="false">
        <div className={'productName'}>
          {product.title}
        </div>
      </Link>
    </div>
  );
};
export default NavCollectionProductCard;