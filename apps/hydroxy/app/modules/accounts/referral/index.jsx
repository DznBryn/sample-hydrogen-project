import {useEffect, useState} from 'react';
import LoadingSkeleton, {
  links as loadingSkeletonStyles,
} from '~/modules/loadingSkeleton';
import {useYotpo} from '~/hooks/useYotpo';
import styles from './styles.css';

export function links() {
  return [...loadingSkeletonStyles(), {rel: 'stylesheet', href: styles}];
}

export default function ReferralWidget() {
  const {refreshWidgets} = useYotpo();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
    refreshWidgets();
  }, []);

  return (
    <div className={'container_referral'}>
      {isLoading && (
        <div className={'referrals_loadingSkeleton'}>
          <LoadingSkeleton />
        </div>
      )}
      <div
        className={'yotpo-widget-instance'}
        data-yotpo-instance-id="266415"
      ></div>
    </div>
  );
}
