import FireWorkCarousel, { links as fireWorkCarouselStyles } from '../fireWorkCarousel';
import getApiKeys from '~/utils/functions/getApiKeys';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...fireWorkCarouselStyles(),
  ];
};

const FireWorkPLPCarousel = ({ collectionSlug }) => {
  return (
    (getApiKeys().SHOW_FIREWORK) && (
      <div className={'fireWorkPLPCarousel'}>
        {collectionSlug === 'all' ? <FireWorkCarousel playlist="o8WXX5" /> : null}
        {collectionSlug === 'kits-gifts' ? <FireWorkCarousel playlist="o3nkZ5" /> : null}
        {collectionSlug === 'acne-prone-skin' ? <FireWorkCarousel playlist="5xmweo" /> : null}
        {collectionSlug === 'skincare-moisturizers' ? <FireWorkCarousel playlist="oj1WM5" /> : null}
        {collectionSlug === 'best-sellers' ? <FireWorkCarousel playlist="o9WOWv" /> : null}
        {collectionSlug === 'eye-care' ? <FireWorkCarousel playlist="5zPz7g" /> : null}
        {collectionSlug === 'facial-cleanser' ? <FireWorkCarousel playlist="v6bLPv" /> : null}
        {collectionSlug === 'celebrate-these-tula-faves' ? <FireWorkCarousel playlist="gXKRLo" /> : null}
        {collectionSlug === 'sunscreen' ? <FireWorkCarousel playlist="oWeemv" /> : null}
        {collectionSlug === 'serums' ? <FireWorkCarousel playlist="gKrrJo" /> : null}
      </div>
    )
  );
};

export default FireWorkPLPCarousel;

