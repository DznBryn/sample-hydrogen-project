import PortableTextCustom from '../portableTextCustom';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const OurStoryBlockOne = ({content}) => {
  return (
    <div className="fixedWidthPage">
      <div className="contain blockOne">
        <div className="section left">
          <PortableTextCustom value={content.contentSectionOneRaw} />
          <img
            src={content.sectionOneImageLeft.asset.url + '?auto=format'}
            className={'image1'}
          />
        </div>
        <div className="section right">
          <img
            src={content.sectionOneImageRight.asset.url + '?auto=format'}
            className={'image2'}
          />
        </div>
      </div>
    </div>
  );
};

export default OurStoryBlockOne;
