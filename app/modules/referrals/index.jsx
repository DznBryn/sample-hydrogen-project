import { useState, useEffect } from 'react';
import ReferralsLoading, { link as referralsLoadingStyles } from '../referralsLoading';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (window && document) {
      window._talkableq = window._talkableq || [];
      // eslint-disable-next-line no-undef
      _talkableq.push(['init', { site_id: 'tula' }]);

      window._talkableq.push(['authenticate_customer', {
        email: '', 
        first_name: '',
        last_name: '', 
        traffic_source: 'TULA Referrals Page' 
      }]);

      window._talkableq.push(['register_affiliate', {}]);

      const script = document.createElement('script');
      script.src = 'https://d2jjzw81hqbuqv.cloudfront.net/integration/clients/tula.min.js';
      const body = document.getElementsByTagName('body')[0];
      body.appendChild(script);
      
      script.addEventListener('load', () => {});
    }

    setInterval(() => setIsLoading(false), 6000);
  }, []);

  return (
    <div className={styles.referrals}>
      {isLoading && (
        <div className={styles.loadingSkeleton}>
          <ReferralsLoading />
        </div>
      )}

      <div id="talkable-offer" className={styles.talkableContainer}></div>
    </div>
  );
};

export default Referrals;