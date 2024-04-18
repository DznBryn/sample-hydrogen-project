import FireWorkCarousel, { links as fireWorkCarouselStyle } from '../../fireWorkCarousel';
import { PDPSliderPanelTitle } from '../pdpPanelSlider';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...fireWorkCarouselStyle(),
  ];
};

const FireWorkPDPCarousel = ({ playlist }) => {
  return (
    <div>
      <div className={'fireWorkPDPCarouselHeader'}>
        <PDPSliderPanelTitle data={{ title: 'Hear from our glow-getters' }} />
      </div>
      <div className={'fireWorkPDPCarouselWrapper'}>
        <FireWorkCarousel playlist={playlist} />
      </div>
    </div>
  );
};

export default FireWorkPDPCarousel;
