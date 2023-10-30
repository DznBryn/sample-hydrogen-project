import LoadingSkeleton from '../loadingSkeleton';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const ReferralsLoading = () => {
  return (
    <div className={'referralsLoading_container'}>
      <div className={'referralsLoading_sectionOne'}>
        <div className={'referralsLoading_areaOne'}>
          <LoadingSkeleton />
        </div>
      </div>

      <div className={'referralsLoading_sectionTwo'}>
        <div className={'referralsLoading_areaTwo'}>
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>

        <div className={'referralsLoading_areaThree'}>
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>

        <div className={'referralsLoading_areaFour'}>
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      </div>
    </div>
  );
};

export default ReferralsLoading;