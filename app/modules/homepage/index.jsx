import HomepageCarousel, { links as homepageCarouselStyle } from '../homepageCarousel';
import HomepageReccomendations, { links as homepageRecommendationsStyle } from '../homepageRecommendations';
import HomepageShopByConcern, { links as homepageShopByConcernStyles } from '../homepageShopByConcern';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...homepageCarouselStyle(),
    ...homepageRecommendationsStyle(),
    ...homepageShopByConcernStyles(),
  ];
};

const Homepage = ({ carouselSlidesGroup, hpRecs, concerns }) => {
  return (
    <>
      <HomepageCarousel carouselSlidesGroup={carouselSlidesGroup} />
      <HomepageReccomendations hpRecs={hpRecs}/>
      <HomepageShopByConcern concerns={concerns}/>
    </>
  );
};

export default Homepage;