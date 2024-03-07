import LoadingSkeleton from '~/modules/loadingSkeleton';
import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const CrmPreferenceCenter = () => {
  return (
    <div className={'mainContainer'}>
      <SkeletonLoader />
      <div id={'ltkPrefCenter'}>
        {/* <div id={'ltkPrefCenter'} data-ltk-prefcenter="TULASkincare"> */}
        <iframe
          id="ltkPrefCenter"
          src="http://services.listrak.com/Client/PrefCenter/TULASkincare/index.html?ltkdtn=1709847589457&amp;refUrl=http%3A%2F%2Flocalhost%3A3000"
          style={{
            height: '0px',
            width: '100%',
            overflowY: 'hidden',
            border: '0px',
          }}
        ></iframe>
      </div>
    </div>
  );
};

export default CrmPreferenceCenter;

const SkeletonLoader = () => {
  const Input = () => (
    <>
      <LoadingSkeleton width="80px" height="30px" />
      <LoadingSkeleton width="395px" height="15px" />
      <LoadingSkeleton width="380px" height="48px" />
    </>
  );

  return (
    <div className={'skeletonWrapper'}>
      <LoadingSkeleton width="202px" height="38px" />
      <LoadingSkeleton width="100%" height="38px" />
      <LoadingSkeleton width="100%" height="2px" />
      <div>
        <div>
          <Input />
          <Input />
          <Input />
          <Input />
        </div>
        <div>
          <LoadingSkeleton width="256px" height="486px" />
        </div>
      </div>
    </div>
  );
};
