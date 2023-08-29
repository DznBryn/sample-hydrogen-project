import React from 'react'

import OurStoryBlockOne, { links as ourStoryBlockOneStyles } from '../ourStoryBlockOne';

import styles from './styles.css'

export const links = () => {
    return [
        { rel: 'stylesheet', href: styles },
        ...ourStoryBlockOneStyles(),
    ];
};


const OurStoryAndFounder = ({ourStoryContent}) => {
    console.log("devdrew outStoryObj", ourStoryContent)
    return (
      <div>
        <OurStoryBlockOne content={ourStoryContent[0]} />
      </div>
    )
  }
  export default OurStoryAndFounder