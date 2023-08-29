import React from 'react'

import OurStoryBlockOne, { links as ourStoryBlockOneStyles } from '../ourStoryBlockOne';
import OurStoryBlockTwo, { links as ourStoryBlockTwoStyles } from '../ourStoryBlockTwo';
import OurStoryBlockThree, { links as ourStoryBlockThreeStyles } from '../ourStoryBlockThree';

import styles from './styles.css'

export const links = () => {
    return [
        { rel: 'stylesheet', href: styles },
        ...ourStoryBlockOneStyles(),
        ...ourStoryBlockTwoStyles(),
        ...ourStoryBlockThreeStyles(),
    ];
};

const OurStoryAndFounder = ({ourStoryContent}) => {
    return (
      <div>
        <OurStoryBlockOne content={ourStoryContent[0]} />
        <OurStoryBlockTwo content={ourStoryContent[0]} />
        <OurStoryBlockThree content={ourStoryContent[0]} />
      </div>
    )
  }
  export default OurStoryAndFounder