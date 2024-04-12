import React, {useEffect} from 'react';
import {
  bindCustomEvent,
  createCustomEvent,
} from '~/utils/functions/eventFunctions';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

export const openedStateID = 'tl-sp-o';

const SliderPanel = ({children, id, overlayOn = true}) => {
  const sliderRef = React.useRef(null);

  useEffect(() => {
    bindCustomEvent(sliderRef, 'data-slider-state', {
      hidden: 'hiddenPanel',
      visible: 'visiblePanel',
    });
  }, [sliderRef]);

  const handleClose = () => {
    const sliderEvent = createCustomEvent();
    const dataSliderState = sliderRef.current.getAttribute('data-slider-state');

    if (dataSliderState === 'show') {
      document.querySelector('body').classList.remove('bodyWrap');
      sliderRef.current.setAttribute('data-slider-state', 'hide');
      sliderRef.current.dispatchEvent(sliderEvent);
      sessionStorage.setItem(openedStateID, '0');
    }
  };

  return (
    <>
      <div
        id={id}
        className="sliderWrap hiddenPanel"
        data-slider-state="hide"
        ref={sliderRef}
      >
        <div className={overlayOn && 'overlay'} onClick={handleClose}></div>
        <div className="slider">{children}</div>
      </div>
    </>
  );
};

export const switchSliderPanelVisibility = (dataId) => {
  const sliderEvent = createCustomEvent();
  const dataSliderState = document.querySelector(`#${dataId}`);

  if (dataSliderState.getAttribute('data-slider-state') === 'show') {
    document.querySelector('body').classList.remove('bodyWrap');
    dataSliderState.setAttribute('data-slider-state', 'hide');
    dataSliderState.dispatchEvent(sliderEvent);
    sessionStorage.setItem(openedStateID, '0');
  } else {
    document.querySelector('body').classList.add('bodyWrap');
    dataSliderState.setAttribute('data-slider-state', 'show');
    dataSliderState.dispatchEvent(sliderEvent);
  }
};

export default SliderPanel;
