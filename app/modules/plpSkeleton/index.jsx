import React, { useEffect } from 'react';
import LoadingSkeleton from '~/modules/loadingSkeleton';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const PLPSkeleton = () => {
  
  useEffect(() => {

    const handlePLP = () => {

      document.querySelector('.PLPSkeleton').style.display = 'flex';

      setTimeout(() => {
        document.querySelector('.PLPSkeleton').style.display = 'none';
      }, 1500);

    };

    window.location.href.includes('collections') === true ?
      handlePLP()
      : document.querySelector('.PLPSkeleton').style.display = 'none';

  }, []);

  return (

    <div className={'PLPSkeleton'}>
      <div className={'productPlaceholder'}>
        <LoadingSkeleton width="205px" height="255px" />
        <LoadingSkeleton width="119px" height="16px" />
        <LoadingSkeleton width="205px" height="16px" />
        <LoadingSkeleton width="205px" height="16px" />
        <LoadingSkeleton width="119px" height="16px" />
        <LoadingSkeleton width="130px" height="38px" />
      </div>

      <div className={'productPlaceholder'}>
        <LoadingSkeleton width="205px" height="255px" />
        <LoadingSkeleton width="119px" height="16px" />
        <LoadingSkeleton width="205px" height="16px" />
        <LoadingSkeleton width="205px" height="16px" />
        <LoadingSkeleton width="119px" height="16px" />
        <LoadingSkeleton width="130px" height="38px" />
      </div>

      <div className={'bigPlaceholder'}>
        <LoadingSkeleton width="510px" height="420px" />
      </div>

      <div className={'productPlaceholder'}>
        <LoadingSkeleton width="205px" height="255px" />
        <LoadingSkeleton width="119px" height="16px" />
        <LoadingSkeleton width="205px" height="16px" />
        <LoadingSkeleton width="205px" height="16px" />
        <LoadingSkeleton width="119px" height="16px" />
        <LoadingSkeleton width="130px" height="38px" />
      </div>

      <div className={'productPlaceholder'}>
        <LoadingSkeleton width="205px" height="255px" />
        <LoadingSkeleton width="119px" height="16px" />
        <LoadingSkeleton width="205px" height="16px" />
        <LoadingSkeleton width="205px" height="16px" />
        <LoadingSkeleton width="119px" height="16px" />
        <LoadingSkeleton width="130px" height="38px" />
      </div>

      <div className={'productPlaceholder'}>
        <LoadingSkeleton width="205px" height="255px" />
        <LoadingSkeleton width="119px" height="16px" />
        <LoadingSkeleton width="205px" height="16px" />
        <LoadingSkeleton width="205px" height="16px" />
        <LoadingSkeleton width="119px" height="16px" />
        <LoadingSkeleton width="130px" height="38px" />
      </div>

      <div className={'productPlaceholder'}>
        <LoadingSkeleton width="205px" height="255px" />
        <LoadingSkeleton width="119px" height="16px" />
        <LoadingSkeleton width="205px" height="16px" />
        <LoadingSkeleton width="205px" height="16px" />
        <LoadingSkeleton width="119px" height="16px" />
        <LoadingSkeleton width="130px" height="38px" />
      </div>

      <div className={'bigPlaceholder'}>
        <LoadingSkeleton width="510px" height="420px" />
      </div>

      <div className={'productPlaceholder'}>
        <LoadingSkeleton width="205px" height="255px" />
        <LoadingSkeleton width="119px" height="16px" />
        <LoadingSkeleton width="205px" height="16px" />
        <LoadingSkeleton width="205px" height="16px" />
        <LoadingSkeleton width="119px" height="16px" />
        <LoadingSkeleton width="130px" height="38px" />
      </div>

      <div className={'productPlaceholder'}>
        <LoadingSkeleton width="205px" height="255px" />
        <LoadingSkeleton width="119px" height="16px" />
        <LoadingSkeleton width="205px" height="16px" />
        <LoadingSkeleton width="205px" height="16px" />
        <LoadingSkeleton width="119px" height="16px" />
        <LoadingSkeleton width="130px" height="38px" />
      </div>

    </div>
  );
};

export default PLPSkeleton;
