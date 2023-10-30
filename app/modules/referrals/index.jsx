import { useState, useEffect } from 'react';
import ReferralsLoading, { links as referralsLoadingStyles } from '../referralsLoading';

import styles from './styles.css';

export const links = () => {
  return [
    {
      rel: 'stylesheet', href: styles
    },
    ...referralsLoadingStyles()
  ];
};

const Referrals = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInterval(() => setIsLoading(false), 6000);
  }, []);

  return (
    <div className={'referrals'}>
      {isLoading && (
        <div className={'referrals_loadingSkeleton'}>
          <ReferralsLoading />
        </div>
      )}

      <div className="yotpo-widget-instance" data-yotpo-instance-id="266415"></div>
    </div>
  );
};

export default Referrals;