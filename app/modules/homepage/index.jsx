import HomepageCarousel, { links as homepageCarouselStyle } from '../homepageCarousel';
import HomepageReccomendations, { links as homepageRecommendationsStyle } from '../homepageRecommendations';
import HomepageShopByConcern, { links as homepageShopByConcernStyles } from '../homepageShopByConcern';
import HomepageWhyProbioticsContent, { links as HomepageWhyProbioticsContentStyles } from '../homepageWhyProbiotics';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...homepageCarouselStyle(),
    ...homepageRecommendationsStyle(),
    ...homepageShopByConcernStyles(),
    ...HomepageWhyProbioticsContentStyles(),
  ];
};

const Homepage = ({ carouselSlidesGroup, hpRecs, concerns, homepageWhyProbioticsContent }) => {
  return (
    <>
      <HomepageCarousel carouselSlidesGroup={carouselSlidesGroup} />
      <HomepageReccomendations hpRecs={hpRecs}/>
      <HomepageShopByConcern concerns={concerns}/>
      <HomepageWhyProbioticsContent homepageWhyProbioticsContent={homepageWhyProbioticsContent}/>
    </>
  );
};

export default Homepage;