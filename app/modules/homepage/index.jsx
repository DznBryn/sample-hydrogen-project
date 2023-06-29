import HomepageCarousel, { links as homepageCarouselStyle } from '../homepageCarousel';
import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...homepageCarouselStyle(),
  ];
};

const Homepage = ({ carouselSlidesGroup }) => {
  return (
    <>
      <HomepageCarousel carouselSlidesGroup={carouselSlidesGroup} />
    </>
  );
};

export default Homepage;