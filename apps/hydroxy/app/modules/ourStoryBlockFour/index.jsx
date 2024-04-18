import PortableTextCustom from '../portableTextCustom';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const OurStoryBlockFour = ({content}) => {
  return (
    <div className="fixedWidthPage">
      <div className={'contain blockFour'}>
        <div className={'section left'}>
          <img src={content.sectionFourImage.asset.url + '?auto=format'} />
        </div>
        <div className={'section right'}>
          <PortableTextCustom value={content.contentSectionFiveRaw} />
        </div>
      </div>
    </div>
  );
};

export default OurStoryBlockFour;
