import PDPSliderPanel, { PDPPanelTitle, PDPSliderPanelTitle } from '../pdpPanelSlider';
import SliderPanel, { switchSliderPanelVisibility } from '../sliderPanel';
import PortableTextCustom from '../portableTextCustom';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const PDPBenefits = ({ data }) => {
  return (
    <PDPSliderPanel data={data} useGradient={data?.useBackgroundGradient ?? false}>
      {
        data?.contentBlock && data.contentBlock.map((content = null) => content && <Content data={content} key={content.title} />)
      }
      <SliderPanel id={`tab-${data?.tabName.replace(/\s/g, '')}`}>
        <div id={'pdpBenefits_closeButton'} onClick={() => switchSliderPanelVisibility(`tab-${data?.tabName.replace(/\s/g, '')}`)}><span>close</span></div>
        <div className={'pdpBenefits_panel_container'}>
          <PDPPanelTitle title={data?.button?.slideContent?.title} />
          <div className={'pdpBenefits_panel_body'}>
            <PortableTextCustom value={data?.button?.slideContent?.contentRaw} />
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
      <div className={'pdpBenefits_content'}>
        {data?.contents.map(ct => (
          <div className={'pdpBenefits_content_wrapper'} key={ct.name}>
            <div className={'pdpBenefits_content_container'}>
              {ct?.header !== undefined ? (
                <div className={'pdpBenefits_content_header'}>
                  <PortableTextCustom value={ct?.headerRaw} />
                </div>
              ) : ct?.image?.asset.url !== '' ? (
                <div className={'pdpBenefits_content_image'}>
                  <img
                    src={ct?.image?.asset.url}
                    alt={ct?.image?.alt}
                    width={ct?.image?.width}
                    height={ct?.image?.height}
                  />
                </div>
              ) : null}
              {
                (ct?.body !== '') ? (
                  <div className={'pdpBenefits_content_body'}>
                    <p>{ct.body}</p>
                  </div>
                ) : ((ct?.htmlBody !== '' && ct?.htmlBody !== undefined) && (
                  <div className={'pdpBenefits_content_body'}>
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

export default PDPBenefits;
