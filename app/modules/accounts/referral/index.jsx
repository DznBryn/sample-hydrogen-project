import {useEffect} from 'react';
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

  useEffect(() => {
    refreshWidgets();
  }, []);
  return (
    <div className={'container'}>
      <div className={'loadingSkeleton'}>
        <ReferralsLoading />
      </div>
      <div
        className={'yotpo-widget-instance'}
        data-yotpo-instance-id="266415"
      ></div>
    </div>
  );
}

function ReferralsLoading() {
  return (
    <div className={'container'}>
      <div className={'sectionOne'}>
        <div className={'areaOne'}>
          <LoadingSkeleton />
        </div>
      </div>

      <div className={'sectionTwo'}>
        <div className={'areaTwo'}>
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>

        <div className={'areaThree'}>
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>

        <div className={'areaFour'}>
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      </div>
    </div>
  );
}
