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
        <p>Hello Module</p>
      </div>
    )
  }
  export default OurStoryAndFounder