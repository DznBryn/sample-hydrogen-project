import PDPSliderPanel, { PDPPanelTitle, PDPSliderPanelTitle, links as pdpPanelSliderStyles } from '../pdpPanelSlider';
import SliderPanel, { switchSliderPanelVisibility, links as sliderPanelStyles } from '../sliderPanel';
import PortableTextCustom from '../portableTextCustom';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...pdpPanelSliderStyles(),
    ...sliderPanelStyles(),
  ];
};

const PDPRealResults = ({ data }) => {  
  return (
    <PDPSliderPanel data={data} useGradient={data?.useBackgroundGradient ?? false}>
      {
        data?.contentBlock && data.contentBlock.map((content = null) => content && <Content key={content?.name} data={content} />)
      }
      <SliderPanel id={`tab-${data?.tabName.replace(/\s/g, '')}`}>
        <div id={'closeButton'} onClick={() => switchSliderPanelVisibility(`tab-${data?.tabName.replace(/\s/g, '')}`)}><span>close</span></div>
        <div className={'panel_container'}>
          <PDPPanelTitle title={data?.button?.slideContent?.title} />
          <div className={'panel_body'}>
            <PortableTextCustom value={data?.button?.slideContent?.contentRaw}/>
          </div>
        </div>
      </SliderPanel>
    </PDPSliderPanel>
  );
};
const Content = ({ data }) =>
  Boolean(data?.contents && data?.contents.length > 0) && (
    <>
      <PDPSliderPanelTitle data={{ title: data?.title }} />
      <div className={'realResultsContent'}>
        {data?.contents.map(ct => (
          <div className={'realResultsContent_wrapper'} key={ct?.name}>
            <div className={'realResultsContent_container'}>
              {ct?.header !== '' ? (
                <div className={'content_header'}>
                  <PortableTextCustom value={ct?.headerRaw}/>
                </div>
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
                  <div className={'realResultsContent_body'}>
                    <p>{ct.body}</p>
                  </div>
                ) : ((ct?.htmlBody !== '' && ct?.htmlBody !== undefined) && (
                  <div className={'realResultsContent_body'}>
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
