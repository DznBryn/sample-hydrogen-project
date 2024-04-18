import PortableTextCustom from '../portableTextCustom';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const OurStoryBlockTwo = ({content}) => {
  return (
    <div className="fixedWidthPage">
      <div className={'contain blockTwo'}>
        <div className={'section left'}></div>
        <div className={'section right'}>
            <PortableTextCustom value={content.contentSectionTwoRaw} />
        </div>
      </div>
    </div>
  );
};

export default OurStoryBlockTwo;