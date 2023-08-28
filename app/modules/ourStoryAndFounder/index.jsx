import React from 'react'

import OurStoryBlockOne, { links as ourStoryBlockOne } from '../ourStoryBlockOne';

import styles from './styles.css'

export const links = () => {
    return [
        { rel: 'stylesheet', href: styles },
        ...ourStoryBlockOne(),
    ];
};


const OurStoryAndFounder = ({ourStoryText, ourStoryImgs}) => {
    console.log("devdrew outStoryObj", ourStoryText)
    return (
      <div>
        <OurStoryBlockOne content={ourStoryText} images={ourStoryImgs} />
      </div>
    )
  }
  export default OurStoryAndFounder