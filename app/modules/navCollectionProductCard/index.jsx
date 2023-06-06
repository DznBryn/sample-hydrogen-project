import { Link } from '@remix-run/react';
import { getMetafields } from '~/utils/functions/eventFunctions';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const NavCollectionProductCard = ({ product = {} }) => {
  const thumbnail = product.thumbnail;
  const metafields = getMetafields(product.metafields);
  return (
    <div className={'productWrap'}>
      <Link
        className={'productLink'}
        to={'/products/' + product.slug}
        draggable="false">
        <img
          src={thumbnail?.src}
          alt={thumbnail?.alt}
          className={'productImg'}
          draggable="false" />
      </Link>
      {metafields.alt_title !== undefined &&
        <Link
          className={'productLink'}
          to={'/products/' + product.slug}
          draggable="false">
          <div className={'productAlt'}>
            {metafields.alt_title}
          </div>
        </Link>
      }
      <Link
        className={'productLink'}
        to={'/products/' + product.slug}
        draggable="false">
        <div className={'productName'}>
          {product.name}
        </div>
      </Link>
    </div>
  );
};
export default NavCollectionProductCard;