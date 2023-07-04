import HomepageCarousel, { links as homepageCarouselStyle } from '../homepageCarousel';
import HomepageReccomendations, { links as homepageRecommendationsStyle } from '../homepageRecommendations';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...homepageCarouselStyle(),
    ...homepageRecommendationsStyle(),
  ];
};

const Homepage = ({ carouselSlidesGroup, hpRecs }) => {
  return (
    <>
      <HomepageCarousel carouselSlidesGroup={carouselSlidesGroup} />
      <HomepageReccomendations hpRecs={hpRecs}/>
    </>
  );
};

export default Homepage;