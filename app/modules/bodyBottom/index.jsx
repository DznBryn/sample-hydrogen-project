import {useEffect } from 'react';
import { useOutletContext } from '@remix-run/react';
// import { useYotpoReviewsRefresh } from '@frontend-sdk/yotpo';
import Listrack from '~/modules/listrack';
import GladlySidekick from '~/modules/gladlySidekick';
import { SiteSwitcherPopUp } from '~/modules/siteSwitcher';
import PLPSkeleton, { links as PLPSkeletonStyles } from '~/modules/plpSkeleton';
import PDPSkeleton, { links as PDPSkeletonStyles } from '~/modules/pdpSkeleton';
import EmailSmsSignup, { links as EmailSmsSignupStyles } from '~/modules/emailSmsSignup';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...PLPSkeletonStyles(),
    ...PDPSkeletonStyles(),
    ...EmailSmsSignupStyles(),
  ];
};

const BodyBottom = ({emailSmsSignupContent, productList}) => {

  const { customer } = useOutletContext();
  const { id, email, phone } = customer;

  // useYotpoReviewsRefresh();

  useEffect(() => {
      
    /* Push Customer ID, Email, Phone */
    localStorage.setItem('customerId', JSON.stringify(id));
    localStorage.setItem('customerEmail', JSON.stringify(email));
    localStorage.setItem('customerPhone', JSON.stringify(phone));

    if(window.Gladly.navigate){
      let Gladly = window.Gladly;
      Gladly.navigate();
    }

  }, []);

  return (

    <div className={'bodyBottom'}>
      <PLPSkeleton />
      <PDPSkeleton />
      <Listrack productList={productList}/>
      <EmailSmsSignup emailSmsSignupContent={emailSmsSignupContent} />
      <GladlySidekick />
      <SiteSwitcherPopUp />
    </div>

  );

};

export default BodyBottom;
