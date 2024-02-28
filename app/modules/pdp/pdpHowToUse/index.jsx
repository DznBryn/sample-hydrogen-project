import React from 'react';
import PDPSliderPanel, {
  PDPPanelTitle,
  PDPSliderPanelTitle,
} from '../pdpPanelSlider';
import SliderPanel, {switchSliderPanelVisibility} from '../../sliderPanel';
import classnames from 'classnames';

import styles from './styles.css';
import PortableTextCustom from '~/modules/portableTextCustom';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const PDPHowToUse = ({data}) => {
  return (
    <PDPSliderPanel
      data={data}
      useGradient={data?.useBackgroundGradient ?? false}
    >
      {data?.contentBlock &&
        data.contentBlock.map(
          (content = null) =>
            content && <Content data={content} key={content?.title} />,
        )}
      {data?.button?.slideContent && (
        <SliderPanel id={`tab-${data?.tabName.replace(/\s/g, '')}`}>
          <div
            id={'pdpHowtoUse_closeButton'}
            onClick={() =>
              switchSliderPanelVisibility(
                `tab-${data?.tabName.replace(/\s/g, '')}`,
              )
            }
          >
            <span>close</span>
          </div>
          <div className={'pdpHowtoUse_panel_container'}>
            <PDPPanelTitle title={data?.button?.slideContent?.title} />
            <div className={'pdpHowtoUse_panel_body'}>
              <PortableTextCustom
                value={data?.button?.slideContent?.contentRaw}
              />
            </div>
          </div>
        </SliderPanel>
      )}
    </PDPSliderPanel>
  );
};

const Content = ({data}) =>
  Boolean(data?.contents && data?.contents.length > 0) && (
    <>
      <PDPSliderPanelTitle data={{title: data?.title}} />
      <div className={'pdpHowtoUse_content'}>
        {data?.contents.map((ct) => (
          <React.Fragment key={data?.title}>
            <div
              className={
                data?.contents.length !== 1
                  ? 'pdpHowtoUse_content_wrapper'
                  : 'pdpHowtoUse_content_wrapper_center'
              }
            >
              <div
                className={
                  data?.contents.length === 1
                    ? classnames(
                        'pdpHowtoUse_content_container',
                        'pdpHowtoUse_mWidth_100',
                      )
                    : 'pdpHowtoUse_content_container'
                }
              >
                {ct?.headerRaw && ct?.headerRaw[0].children[0].text !== '' ? (
                  <div className={'pdpHowtoUse_content_header'}>
                    <PortableTextCustom value={ct?.headerRaw} />
                  </div>
                ) : ct?.image ? (
                  <div className={'pdpHowtoUse_content_image'}>
                    <img
                      src={ct?.image?.src}
                      alt={ct?.image?.alt}
                      width={ct?.image?.width}
                      height={ct?.image?.height}
                    />
                  </div>
                ) : null}
                {ct?.body && (
                  <div className={'pdpHowtoUse_content_body'}>
                    <p
                      className={
                        data?.contents.length === 1
                          ? classnames(
                              'pdpHowtoUse_text_wTablet',
                              'pdpHowtoUse_text_center',
                            )
                          : undefined
                      }
                    >
                      {ct.body}
                    </p>
                  </div>
                )}
              </div>
            </div>
            {ct?.htmlBodyRaw && ct?.htmlBodyRaw[0].children[0].text !== '' && (
              <div className={'pdpHowtoUse_content_htmlbody'}>
                <PortableTextCustom value={ct?.htmlBodyRaw} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );

export default PDPHowToUse;
