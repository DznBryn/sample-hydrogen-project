import PDPSliderPanel, { PDPPanelTitle, PDPSliderPanelTitle, links as pdpPanelSliderStyles } from '../pdpPanelSlider';
import SliderPanel, { switchSliderPanelVisibility, links as sliderPanelStyles } from '../sliderPanel';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...pdpPanelSliderStyles(),
    ...sliderPanelStyles(),
  ];
};

const scriptTags = /(<script\b[^>]*>([\s\S]*?)<\/script>)/gm;

const PDPRealResults = ({ data }) => {
  return (
    <PDPSliderPanel data={data} useGradient={data?.useBackgroundGradient ?? false}>
      {
        data?.contentBlock && data.contentBlock.map((content = null) => content && <Content key={content} data={content} />)
      }
      <SliderPanel id={`tab-${data?.tabName.replace(/\s/g, '')}`}>
        <div id={'closeButton'} onClick={() => switchSliderPanelVisibility(`tab-${data?.tabName.replace(/\s/g, '')}`)}><span>close</span></div>
        <div className={'panel_container'}>
          <PDPPanelTitle title={data?.button?.slideContent?.title} />
          <div
            className={'panel_body'}
            dangerouslySetInnerHTML={{
              __html: data?.button?.slideContent?.content?.replace(scriptTags, ''),
            }}
          />
        </div>
      </SliderPanel>
    </PDPSliderPanel>
  );
};

const Content = ({ data }) =>
  Boolean(data?.contents && data?.contents.length > 0) && (
    <>
      <PDPSliderPanelTitle data={{ title: data?.title }} />
      <div className={'content'}>
        {data?.contents.map(ct => (
          <div className={'content_wrapper'} key={ct?.header}>
            <div className={'content_container'}>
              {ct?.header !== '' ? (
                <div
                  className={'content_header'}
                  dangerouslySetInnerHTML={{
                    __html: ct?.header?.replace(scriptTags, ''),
                  }}
                />
              ) : ct?.image?.src !== '' ? (
                <div className={'content_image'}>
                  <img
                    src={ct?.image?.src}
                    alt={ct?.image?.alt}
                    width={ct?.image?.width}
                    height={ct?.image?.height}
                  />
                </div>
              ) : null}
              {
                (ct?.body !== '') ? (
                  <div className={'content_body'}>
                    <p>{ct.body}</p>
                  </div>
                ) : ((ct?.htmlBody !== '' && ct?.htmlBody !== undefined) && (
                  <div className={'content_body'}>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: ct?.htmlBody,
                      }}>
                    </p>
                  </div>
                ))
              }
            </div>
          </div>
        ))}
      </div>
    </>
  );

export default PDPRealResults;
