import {useEffect} from 'react';
import Listrack from '~/modules/bodyBottom/listrack';
import GladlySidekick from '~/modules/bodyBottom/gladlySidekick';
import {SiteSwitcherPopUp} from '~/modules/footer/siteSwitcher';
import PDPSkeleton, {
  links as PDPSkeletonStyles,
} from '~/modules/pdp/pdpSkeleton';
import EmailSmsSignup, {
  links as EmailSmsSignupStyles,
} from '~/modules/bodyBottom/emailSmsSignup';

import styles from './styles.css';
import {useCustomerState} from '~/hooks/useCostumer';

export const links = () => {
  return [
    {rel: 'stylesheet', href: styles},
    ...PDPSkeletonStyles(),
    ...EmailSmsSignupStyles(),
  ];
};

const BodyBottom = ({emailSmsSignupContent}) => {
  const {id, email, phone} = useCustomerState;

  useEffect(() => {
    /* Push Customer ID, Email, Phone */
    localStorage.setItem('customerId', JSON.stringify(id));
    localStorage.setItem('customerEmail', JSON.stringify(email));
    localStorage.setItem('customerPhone', JSON.stringify(phone));

    if (window.Gladly.navigate) {
      let Gladly = window.Gladly;
      Gladly.navigate();
    }
  }, []);

  return (
    <div className={'bodyBottom'}>
      <PDPSkeleton />
      <Listrack />
      <EmailSmsSignup emailSmsSignupContent={emailSmsSignupContent} />
      <GladlySidekick />
      <SiteSwitcherPopUp />
    </div>
  );
};

export default BodyBottom;
