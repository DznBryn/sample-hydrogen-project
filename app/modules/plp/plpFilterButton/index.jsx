import React from 'react';
import { useWindowSize } from '~/utils/functions/eventFunctions';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const FilterButton = ({ title, mobileTitle = '', action }) => {
  title = title || 'Clear All';
  const { width } = useWindowSize();

  return (
    <div onClick={action} className={mobileTitle && width < 500 ?
      'button__container button__container--full' :
      'button__container'}>
      {(width < 500 && title === 'apply' && mobileTitle) ? mobileTitle : title}
    </div>
  );
};

export default FilterButton;
