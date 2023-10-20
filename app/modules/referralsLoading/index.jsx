import React from 'react';
import LoadingSkeleton from '../loadingSkeleton';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const ReferralsLoading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sectionOne}>
        <div className={styles.areaOne}>
          <LoadingSkeleton />
        </div>
      </div>

      <div className={styles.sectionTwo}>
        <div className={styles.areaTwo}>
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>

        <div className={styles.areaThree}>
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>

        <div className={styles.areaFour}>
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      </div>
    </div>
  );
};

export default ReferralsLoading;