import {memo} from 'react';
import SliderPanel, {
  switchSliderPanelVisibility,
  // openedStateID,
  links as sliderPanelStyles,
} from '../../sliderPanel';

import ShadeFinder, {
  links as shadeFinderStyles,
} from '~/modules/quiz/shadeFinder';

import styles from './styles.css';

export const links = () => {
  return [
    {rel: 'stylesheet', href: styles},
    ...sliderPanelStyles(),
    ...shadeFinderStyles(),
  ];
};

const ShadeFinderSlider = () => {
  return (
    <>
      <div
        onClick={() => switchSliderPanelVisibility('ShadeFinderSlider')}
      ></div>
      <SliderPanel id={'ShadeFinderSlider'}>
        <div id={styles.sliderAccWraper}>
          <div
            id={styles.closeButton}
            onClick={() => switchSliderPanelVisibility('ShadeFinderSlider')}
          ></div>
          <ShadeFinder />
        </div>
      </SliderPanel>
    </>
  );
};

export default memo(ShadeFinderSlider);
