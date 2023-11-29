import classnames from 'classnames';
import {switchSliderPanelVisibility} from '../../sliderPanel';
import Button, {links as buttonStyles} from '../../button';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}, ...buttonStyles()];
};

export const PDPPanelTitle = ({title = ''}) =>
  title !== '' && <h3 className={'pdpPanelslider_panel_title'}>{title}</h3>;

export const PDPSliderPanelTitle = ({data}) =>
  data?.title !== '' && (
    <div className={'pdpPanelslider_header'}>
      <h2 className={'pdpPanelslider_title'}>
        {data?.title && data.title !== '' && data.title}
      </h2>
    </div>
  );

const PDPSliderPanel = ({data, children, useGradient = false}) => {
  return (
    <div
      id={`tabSection-${data?.tabName.replace(/\s/g, '')}`}
      className={
        useGradient
          ? classnames('pdpPanelslider_wrapper', 'pdpPanelslider_gradient')
          : 'pdpPanelslider_wrapper'
      }
    >
      <div className={'pdpPanelslider_container'}>
        <div className={'pdpPanelslider_body'}>{children}</div>
        {data?.button?.showButton && data?.button?.slideContent && (
          <div className={'pdpPanelslider_footer'}>
            {data?.button?.text !== '' && (
              <Button
                type={data?.button?.buttonOutlineStyle ? 'outline' : ''}
                classes={'pdpPanelslider_btn'}
                onClick={() =>
                  switchSliderPanelVisibility(
                    `tab-${data?.tabName.replace(/\s/g, '')}`,
                  )
                }
              >
                {data?.button?.text}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PDPSliderPanel;
