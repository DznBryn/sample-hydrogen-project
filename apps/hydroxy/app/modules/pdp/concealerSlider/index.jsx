import {memo} from 'react';
import SliderPanel, {
  switchSliderPanelVisibility,
  // openedStateID,
  links as sliderPanelStyles,
} from '../../sliderPanel';

import Concealer, {links as concealerStyles} from '~/modules/quiz/concealer';

import styles from './styles.css';

export const links = () => {
  return [
    {rel: 'stylesheet', href: styles},
    ...sliderPanelStyles(),
    ...concealerStyles(),
  ];
};

const ConcealerSlider = () => {
  return (
    <>
      <div onClick={() => switchSliderPanelVisibility('ConcealerSlider')}></div>
      <SliderPanel id={'ConcealerSlider'}>
        <div id={styles.sliderAccWraper}>
          <div
            id={styles.closeButton}
            onClick={() => switchSliderPanelVisibility('ConcealerSlider')}
          ></div>
          <Concealer />
        </div>
      </SliderPanel>
    </>
  );
};

export default memo(ConcealerSlider);
