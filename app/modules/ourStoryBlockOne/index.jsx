import React from 'react'
import classnames from 'classnames';
import styles from './styles.css'

export const links = () => {
    return [
      { rel: 'stylesheet', href: styles },
    ];
  };

const OurStoryBlockOne = ({content, images}) => {
  return (
    <div className="fixedWidthPage">
     <p>Our Story Block One</p>
    </div>
  )
}

export default OurStoryBlockOne