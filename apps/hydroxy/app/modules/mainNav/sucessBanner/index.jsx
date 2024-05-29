import {useEffect} from 'react';
import {useSuccessBanner} from '~/hooks/useStore';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const SucessBanner = () => {
  const {isVisible, message, closeBanner} = useSuccessBanner();

  useEffect(() => {
    if (!window.location.href.includes('/account')) {
      closeBanner();
    }
  }, []);

  return isVisible ? (
    <section className="successBannerContainer">
      <div className="successBannerContentWrapper">
        <CheckIcon />
        <p className="successBannerMessage">{message}</p>
      </div>
      <p className="successBannerclose" onClick={() => closeBanner()}>
        +
      </p>
    </section>
  ) : null;
};

export default SucessBanner;

const CheckIcon = () => (
  <svg
    width={28}
    height={28}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.4014 0.192383C6.95533 0.192383 0.901367 6.24635 0.901367 13.6924C0.901367 21.1385 6.95533 27.1924 14.4014 27.1924C21.8475 27.1924 27.9014 21.1385 27.9014 13.6924C27.9014 6.24635 21.8475 0.192383 14.4014 0.192383ZM22.2462 10.9068L13.5777 19.5753C13.379 19.7739 13.1225 19.8884 12.8672 19.8884C12.6119 19.8884 12.3554 19.7751 12.1567 19.5753L7.38165 14.8003C6.98421 14.4027 6.98421 13.7488 7.38165 13.3503C7.77909 12.9528 8.433 12.9528 8.83158 13.3503L12.8671 17.3859L20.8249 9.42791C21.2225 9.03047 21.8764 9.03047 22.275 9.42791C22.6434 9.85534 22.6436 10.5094 22.2462 10.9068Z"
      fill="#36BF9F"
    />
  </svg>
);
