import React from 'react';
import classnames from 'classnames';
import {useRouteLoaderData} from '@remix-run/react';

import styles from './styles.css';
import useCurrency from '~/hooks/useCurrency';

//

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

//

const PLPAfterpay = ({classes}) => {
  const {getCurrency} = useCurrency();

  //

  return (
    <div className={classnames('plpTitle_afterpay_container', classes)}>
      <IconAfterpay />
      <p className={'afterpay_text'}>
        Available for orders over {getCurrency()}35
      </p>
    </div>
  );
};

//

const RightArrow = () => (
  <svg
    width={13}
    height={12}
    viewBox="0 0 13 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.125 1.33331L11.5 5.99998L7.125 10.6666M1.5 5.99998H11.5H1.5Z"
      stroke="#47C6D9"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

//

const EyeQuizLinkBanner = () => (
  <div className={'linkBannerContainer'}>
    <a
      href={'/pages/eyecare-finder'}
      className={'linkBannerText'}
      target="_self"
    >
      find your perfect eye routine <RightArrow />
    </a>
  </div>
);

//

const PLPTitle = ({title, showAfterpay}) => {
  const {ENVS} = useRouteLoaderData('root');
  const showEyeQuizLinkBanner =
    title.title.toLowerCase().includes('eye care') &&
    ENVS?.SITE_NAME.includes('US');
  return (
    <div className={'plpTitleContainer'}>
      <h1 className={'title'}>{title.title}</h1>
      <p className={'subTitle'}>{title.subTitle}</p>
      {showAfterpay && ENVS?.PAYMENT_PLAN_VENDOR === 'afterpay' && (
        <PLPAfterpay />
      )}
      {showEyeQuizLinkBanner && <EyeQuizLinkBanner />}
    </div>
  );
};

export default PLPTitle;

//

const IconAfterpay = () => (
  <svg
    version="1.1"
    id="Afterpay_Logo_Black"
    className={'afterpay_logo'}
    x="0px"
    y="0px"
    viewBox="0 0 1165.5 234.5"
  >
    <g>
      <path
        d="M1139.9,51.5l-34.6-19.8l-35.1-20.1C1047-1.7,1018,15,1018,41.8v4.5c0,2.5,1.3,4.8,3.5,6l16.3,9.3
		c4.5,2.6,10.1-0.7,10.1-5.9V45c0-5.3,5.7-8.6,10.3-6l32,18.4l31.9,18.3c4.6,2.6,4.6,9.3,0,11.9l-31.9,18.3l-32,18.4
		c-4.6,2.6-10.3-0.7-10.3-6V113c0-26.8-29-43.6-52.2-30.2l-35.1,20.1L926,122.7c-23.3,13.4-23.3,47.1,0,60.5l34.6,19.8l35.1,20.1
		c23.2,13.3,52.2-3.4,52.2-30.2v-4.5c0-2.5-1.3-4.8-3.5-6l-16.3-9.3c-4.5-2.6-10.1,0.7-10.1,5.9v10.7c0,5.3-5.7,8.6-10.3,6l-32-18.4
		L943.8,159c-4.6-2.6-4.6-9.3,0-11.9l31.9-18.3l32-18.4c4.6-2.6,10.3,0.7,10.3,6v5.3c0,26.8,29,43.6,52.2,30.2l35.1-20.1l34.6-19.8
		C1163.2,98.5,1163.2,64.9,1139.9,51.5z"
      />
      <g>
        <path d="M912.9,58.1l-81,167.3h-33.6l30.3-62.5L780.9,58.1h34.5l30.6,70.2l33.4-70.2L912.9,58.1L912.9,58.1z" />
      </g>
      <g>
        <g>
          <path
            d="M103,117.5c0-20-14.5-34-32.3-34s-32.3,14.3-32.3,34c0,19.5,14.5,34,32.3,34S103,137.5,103,117.5 M103.3,176.9v-15.4
				c-8.8,10.7-21.9,17.3-37.5,17.3c-32.6,0-57.3-26.1-57.3-61.3c0-34.9,25.7-61.5,58-61.5c15.2,0,28,6.7,36.8,17.1v-15h29.2v118.8
				L103.3,176.9L103.3,176.9z"
          />
          <path
            d="M274.5,150.5c-10.2,0-13.1-3.8-13.1-13.8V84h18.8V58.1h-18.8v-29h-29.9v29h-38.6V46.3c0-10,3.8-13.8,14.3-13.8h6.6v-23
				h-14.4c-24.7,0-36.4,8.1-36.4,32.8v15.9h-16.6V84H163v92.9h29.9V84h38.6v58.2c0,24.2,9.3,34.7,33.5,34.7h15.4v-26.4L274.5,150.5
				L274.5,150.5z"
          />
          <path
            d="M381.9,106.8c-2.1-15.4-14.7-24.7-29.5-24.7c-14.7,0-26.9,9-29.9,24.7H381.9z M322.2,125.3c2.1,17.6,14.7,27.6,30.7,27.6
				c12.6,0,22.3-5.9,28-15.4h30.7c-7.1,25.2-29.7,41.3-59.4,41.3c-35.9,0-61.1-25.2-61.1-61.1s26.6-61.8,61.8-61.8
				c35.4,0,61.1,26.1,61.1,61.8c0,2.6-0.2,5.2-0.7,7.6H322.2z"
          />
          <path
            d="M604.4,117.5c0-19.2-14.5-34-32.3-34s-32.3,14.3-32.3,34c0,19.5,14.5,34,32.3,34S604.4,136.8,604.4,117.5 M510.3,225.4
				V58.1h29.2v15.4c8.8-10.9,21.9-17.6,37.5-17.6c32.1,0,57.3,26.4,57.3,61.3s-25.7,61.5-58,61.5c-15,0-27.3-5.9-35.9-15.9v62.5
				h-30.1V225.4z"
          />
          <path
            d="M739.6,117.5c0-20-14.5-34-32.3-34s-32.3,14.3-32.3,34c0,19.5,14.5,34,32.3,34S739.6,137.5,739.6,117.5 M739.9,176.9
				v-15.4c-8.8,10.7-21.9,17.3-37.5,17.3c-32.6,0-57.3-26.1-57.3-61.3c0-34.9,25.7-61.5,58-61.5c15.2,0,28,6.7,36.8,17.1v-15h29.2
				v118.8L739.9,176.9L739.9,176.9z"
          />
          <path
            d="M457.6,69.7c0,0,7.4-13.8,25.7-13.8c7.8,0,12.8,2.7,12.8,2.7v30.3c0,0-11-6.8-21.1-5.4s-16.5,10.6-16.5,23v70.3h-30.2
				V58.1h29.2L457.6,69.7L457.6,69.7z"
          />
        </g>
      </g>
    </g>
  </svg>
);
