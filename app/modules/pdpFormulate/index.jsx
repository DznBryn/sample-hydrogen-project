import PDPSliderPanel, { PDPPanelTitle, PDPSliderPanelTitle } from '../pdpPanelSlider';
import SliderPanel, { switchSliderPanelVisibility } from '../sliderPanel';
import classnames from 'classnames';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const scriptTags = /(<script\b[^>]*>([\s\S]*?)<\/script>)/gm;

const PDPFormulate = ({ data }) => {
  return (
    <PDPSliderPanel data={data} useGradient={data?.useBackgroundGradient ?? false}>
      {
        data?.contentBlock && data.contentBlock.map((content = null) => content && <Content data={content} key={content?.title}/>)
      }
      <SliderPanel id={`tab-${data?.tabName.replace(/\s/g, '')}`}>
        <div id={'pdpFormulate_closeButton'} onClick={() => switchSliderPanelVisibility(`tab-${data?.tabName.replace(/\s/g, '')}`)}><span>close</span></div>
        <div className={'pdpFormulate_panel_container'}>
          <PDPPanelTitle title={data?.button?.slideContent?.title} />
          <div
            className={'pdpFormulate_panel_body'}
            dangerouslySetInnerHTML={{
              __html: data?.button?.slideContent?.content?.replace(scriptTags, ''),
            }}
          />
        </div>
      </SliderPanel>
    </PDPSliderPanel>
  );
};

const Content = ({ data }) => {
  return Boolean(data?.contents && data?.contents.length > 0) && (
    <>
      <PDPSliderPanelTitle data={{ title: data?.title }} />
      <div className={'pdpFormulate_content'}>
        {data?.contents.map(ct => (
          <div className={data?.contents.length !== 1 ? 'pdpFormulate_content_wrapper' : undefined} key={ct?.name}>
            <div className={data?.contents.length === 1 ? classnames('pdpFormulate_content_container', 'pdpFormulate_mWidth_100') : 'pdpFormulate_content_container'}>
              {ct?.header !== '' ? (
                <div
                  className={'pdpFormulate_content_header'}
                  dangerouslySetInnerHTML={{
                    __html: ct?.header?.replace(scriptTags, ''),
                  }}
                />
              ) : ct?.image ? (
                <div className={'pdpFormulate_content_image'}>
                  <img
                    src={ct?.image?.src}
                    alt={ct?.image?.alt}
                    width={70}
                    height={70}
                  />
                </div>
              ) : null}
              {ct?.body !== '' && (
                <div className={'pdpFormulate_content_body'}>
                  {ct?.htmlSubtitle
                    ?
                    <div
                      className={'pdpFormulate_subtitle'}
                      dangerouslySetInnerHTML={{
                        __html: ct?.htmlSubtitle?.replace(scriptTags, ''),
                      }}
                    />
                    : <span>{ct.subtitle}</span>}
                  <p className={data?.contents.length === 1 ? classnames('pdpFormulate_text_wTablet', 'pdpFormulate_text_center') : undefined}>{ct.body}</p>
                </div>
              )}
              {ct?.htmlBody !== '' && (
                <div
                  className={'pdpFormulate_content_htmlbody'}
                  dangerouslySetInnerHTML={{
                    __html: ct?.htmlBody?.replace(scriptTags, ''),
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PDPFormulate;
