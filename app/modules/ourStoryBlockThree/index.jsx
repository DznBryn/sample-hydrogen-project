import { Link } from '@remix-run/react';
import PortableTextCustom from '../portableTextCustom';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const OurStoryBlockThree = ({content}) => {
  return (
    <div className="fixedWidthPage">
      <div className={"contain blockThree"}>
        <div className={"section left"}>
          <blockquote>
            <PortableTextCustom value={content.contentSectionThreeRaw} />
          </blockquote>
          <p className={"signature"}>
            <PortableTextCustom value={content.contentSectionFourRaw} />
          </p>
        </div>
        <div className={"section right"}>
            <img src={content.sectionThreeImage.asset.url} />
        </div>
      </div>
    </div>
  )
}

export default OurStoryBlockThree