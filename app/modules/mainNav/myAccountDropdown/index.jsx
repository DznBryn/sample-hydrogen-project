import { useState, useEffect } from 'react';
import LoadingSkeleton, { links as loadingSkeletonStyles } from '../../loadingSkeleton';
import { switchSliderPanelVisibility } from '~/modules/sliderPanel';
import getApiKeys from '~/utils/functions/getApiKeys';
import { Link } from '@remix-run/react';
import { getLoyaltyCustomerData, triggerAnalyticsLoyaltyEvents } from '~/utils/functions/eventFunctions';

import {useCustomerActions, useCustomerState} from '~/hooks/useCostumer';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...loadingSkeletonStyles(),
  ];
};

const MyAccountDropdown = () => {

  
  
  return (

    (getApiKeys().FEATURE_FLAGS.LOYALTY) ? 
      <LoyaltyVersion/> : 
      <CommomVersion/>

  );


};

const CommomVersion = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { firstName, isLoggedIn } = useCustomerState();
  const { logout } = useCustomerActions();

  const Modal = () => {

    function openSliderAccount() {
      setIsModalOpen(false);
      switchSliderPanelVisibility('SliderAccount');
    }

    const Content = {

      LoggedIn: () => <>

        <div className={'content accDropdownloggedIn navAccountMenuOld'}>
          <a href="/account">My Account</a>
          <a href="https://returns.tula.com/">Returns & Exchanges</a>
          <a href="/pages/contact-us">Contact Us</a>
          <a href="/pages/faq">FAQs</a>
          <span className={'signOut'} onClick={async () => {
            await logout();
            window.location.reload();
          }}>
            sign out
          </span>
        </div>

      </>,

      LoggedOut: () => <>

        <div className={'content'}>
          <p>Hey, glowgetter!</p>
          login or create an account to easily manage orders & auto-deliveries
        </div>

        <div className={'cta'} onClick={openSliderAccount.bind(this)}>
          <div>Join now</div>
          <div>Sign in</div>
        </div>

      </>,

    };

    return (

      <div className={'myAccountDropDown_modalContainer noLoyalty'}>

        <div className={'accDropdownCloseButton'}>
          {(!isLoggedIn) && <div onClick={() => setIsModalOpen(!isModalOpen)}><Icons.X /></div>}
        </div>

        <div className={'accDropDowncontainer'}>
          {isLoggedIn ? <Content.LoggedIn /> : <Content.LoggedOut />}
        </div>

      </div>

    );

  };

  return (<>

    <div className={'myAccountButton'} onClick={() => setIsModalOpen(!isModalOpen)}>
      {(isLoggedIn) ? `Hi, ${firstName || '{USER_NAME}'}!` : 'My Account'}
      <div className={!isModalOpen ? 'flipIt' : undefined}><Icons.SimpleArrowDown /></div>
    </div>

    {isModalOpen && <Modal />}

  </>);

};

const LoyaltyVersion = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [points, setPoints] = useState(null);
  const { firstName, email, id, isLoggedIn } = useCustomerState();
  const { logout } = useCustomerActions();

  useEffect(() => {

    getCustomerData();

  }, []);

  async function getCustomerData() {

    // const env = getApiKeys().CURRENT_ENV;
    const env = 'US_PROD';
    const data = { email, customerId: id, env, useCache: false };

    if (email || id) {

      getLoyaltyCustomerData(data)
        .then((res) => {
          setPoints(res.pointsBalance);
        })
        .catch((err) => err);

    }

  }

  function openSliderAccount() {
    setIsModalOpen(false);
    switchSliderPanelVisibility('SliderAccount');
  }

  const LoyaltyModal = () => {

    const Content = {

      LoggedIn: () => <>

        <div className={'content accDropdownloggedIn'}>
          <p>Hi, {firstName}!</p>
          you have <b><SwellPointBalance /></b> points
        </div>

        <div className={'cta accDropdownloggedIn'}>
          <Link to={'/account?c=rewards'}>Redeem Points</Link>
          <Link to={'/pages/upload-receipt'}>Upload a Receipt & Earn</Link>
          <div className={'signOut'} onClick={async () => {
            await logout();
            window.location.reload();
          }}>
            sign out
          </div>
        </div>

      </>,

      LoggedOut: () => <>

        <div className={'content'}>
          <p>Hey, glowgetter!</p>
          login or create an account to manage your <b>TULA 24-7 Rewards</b>
        </div>

        <div className={'cta'} onClick={openSliderAccount.bind(this)}>
          <div onClick={() => triggerAnalyticsLoyaltyEvents('SignupBtnClick', { source: 'desktopBanner' })}>Join now</div>
          <div onClick={() => triggerAnalyticsLoyaltyEvents('LoginBtnClick', { source: 'desktopBanner' })}>Sign in</div>
        </div>

        <Link className={'extraButton'} to={'/rewards'} onClick={() => triggerAnalyticsLoyaltyEvents('LearnMoreBtnClick', { source: 'desktopBanner' })}>
          learn more
        </Link>

      </>,

    };

    return (

      <div className={'myAccountDropDown_modalContainer'}>

        <div className={'banner'}>
          <div onClick={() => setIsModalOpen(!isModalOpen)}><Icons.X /></div>
        </div>

        <div className={'accDropDowncontainer'}>
          {isLoggedIn ? <Content.LoggedIn /> : <Content.LoggedOut />}
        </div>

      </div>

    );

  };

  const MyAccountButton = {

    MyRewards: () => <>

      <Icons.Star />
      My Rewards
      <div className={isModalOpen ? 'flipIt' : undefined}><Icons.ArrowDown /></div>

    </>,

    Greetings: () => <>

      Hi, {firstName || '{USER_NAME}'}!
      <div className={'pill'}>
        <Icons.RoundedStar />
        <SwellPointBalance /> pts
      </div>
      <div className={isModalOpen ? 'flipIt' : undefined}><Icons.ArrowDown /></div>

    </>,

  };

  const SwellPointBalance = () => {

    return (

      <div className={'pointsDisplay'}>
        {
          (points !== null && points !== undefined)
            ? points.toLocaleString()
            : <LoadingSkeleton width="13px" height="10px" style={{ borderRadius: '6px', marginTop: '2px' }} />
        }
      </div>

    );

  };

  return (<>

    <div className={'myAccountButton'} onClick={() => setIsModalOpen(!isModalOpen)}>
      {isLoggedIn ? <MyAccountButton.Greetings /> : <MyAccountButton.MyRewards />}
    </div>

    {isModalOpen && <LoyaltyModal />}

  </>);

};

const Icons = {
  X: () => <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.41496 1.21073C0.362661 1.15843 0.321176 1.09634 0.292872 1.02801C0.264568 0.959678 0.25 0.88644 0.25 0.812478C0.25 0.738516 0.264568 0.665279 0.292872 0.596947C0.321176 0.528615 0.362661 0.466527 0.41496 0.414228C0.467259 0.361929 0.529347 0.320443 0.597679 0.292139C0.666011 0.263835 0.739249 0.249268 0.81321 0.249268C0.887172 0.249268 0.96041 0.263835 1.02874 0.292139C1.09707 0.320443 1.15916 0.361929 1.21146 0.414228L7.00071 6.2046L12.79 0.414228C12.8423 0.361929 12.9043 0.320443 12.9727 0.292139C13.041 0.263835 13.1142 0.249268 13.1882 0.249268C13.2622 0.249268 13.3354 0.263835 13.4037 0.292139C13.4721 0.320443 13.5342 0.361929 13.5865 0.414228C13.6388 0.466527 13.6802 0.528615 13.7085 0.596947C13.7369 0.665279 13.7514 0.738516 13.7514 0.812478C13.7514 0.88644 13.7369 0.959678 13.7085 1.02801C13.6802 1.09634 13.6388 1.15843 13.5865 1.21073L7.79608 6.99998L13.5865 12.7892C13.6388 12.8415 13.6802 12.9036 13.7085 12.9719C13.7369 13.0403 13.7514 13.1135 13.7514 13.1875C13.7514 13.2614 13.7369 13.3347 13.7085 13.403C13.6802 13.4713 13.6388 13.5334 13.5865 13.5857C13.5342 13.638 13.4721 13.6795 13.4037 13.7078C13.3354 13.7361 13.2622 13.7507 13.1882 13.7507C13.1142 13.7507 13.041 13.7361 12.9727 13.7078C12.9043 13.6795 12.8423 13.638 12.79 13.5857L7.00071 7.79535L1.21146 13.5857C1.15916 13.638 1.09707 13.6795 1.02874 13.7078C0.96041 13.7361 0.887172 13.7507 0.81321 13.7507C0.739249 13.7507 0.666011 13.7361 0.597679 13.7078C0.529347 13.6795 0.467259 13.638 0.41496 13.5857C0.362661 13.5334 0.321176 13.4713 0.292872 13.403C0.264568 13.3347 0.25 13.2614 0.25 13.1875C0.25 13.1135 0.264568 13.0403 0.292872 12.9719C0.321176 12.9036 0.362661 12.8415 0.41496 12.7892L6.20534 6.99998L0.41496 1.21073Z" fill="white" /></svg>,
  Star: () => <svg width={11} height={11} viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.81246 11L5.44578 8.41543L2.01408 10.9045L3.32168 6.75379L0 4.10616L4.17483 4.12542L5.55361 0L6.82619 4.16266L11 4.26063L7.61168 6.81403L8.81246 11Z" fill="white" /></svg>,
  ArrowDown: () => <svg width={11} height={7} viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.896116 1.32736C0.968671 1.25649 1.06607 1.21682 1.16749 1.21682C1.26891 1.21682 1.36631 1.25649 1.43887 1.32736M0.896116 1.32736L10.1034 1.32655C10.0308 1.25568 9.93341 1.216 9.83199 1.216C9.73057 1.216 9.63317 1.25568 9.56062 1.32655V1.32736M0.896116 1.32736C0.860986 1.36178 0.833076 1.40286 0.814023 1.44821C0.79497 1.49355 0.785156 1.54224 0.785156 1.59142C0.785156 1.6406 0.79497 1.68929 0.814023 1.73464C0.833076 1.77998 0.860986 1.82106 0.896116 1.85548V1.32736ZM1.43887 1.32736L5.49974 5.28586M1.43887 1.32736L1.52612 1.23785L1.52617 1.2379C1.43027 1.14425 1.30154 1.09182 1.16749 1.09182C1.03343 1.09182 0.904679 1.14426 0.808773 1.23794L0.808635 1.23807C0.761626 1.28413 0.72428 1.33911 0.698784 1.39978C0.673288 1.46046 0.660156 1.52561 0.660156 1.59142C0.660156 1.65723 0.673288 1.72239 0.698784 1.78306C0.724279 1.84373 0.761626 1.89871 0.808634 1.94477L0.808855 1.94498L5.12892 6.15698L5.12893 6.157C5.22814 6.2537 5.3612 6.30782 5.49974 6.30782C5.63828 6.30782 5.77134 6.2537 5.87055 6.157L5.87056 6.15699L10.1906 1.94586M1.43887 1.32736L1.52621 1.23794L5.49974 5.1113M5.49974 5.28586L9.56062 1.32736M5.49974 5.28586L5.41249 5.19635L5.49974 5.1113M5.49974 5.28586L5.58699 5.19635L5.49974 5.1113M9.56062 1.32736H9.43562V1.32655V1.27465M9.56062 1.32736L9.55982 1.32655L9.47336 1.23785L9.43562 1.27465M10.1906 1.94586L9.43562 1.27465M10.1906 1.94586C10.1906 1.94584 10.1906 1.94582 10.1906 1.94581L10.1906 1.94586ZM5.49974 5.1113L9.43562 1.27465" fill="white" stroke="white" strokeWidth={0.25} /></svg>,
  RoundedStar: () => <svg width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6Z" fill="#47C6D9" /><path fillRule="evenodd" clipRule="evenodd" d="M6 11.1C8.81665 11.1 11.1 8.81665 11.1 6C11.1 3.18335 8.81665 0.9 6 0.9C3.18335 0.9 0.9 3.18335 0.9 6C0.9 8.81665 3.18335 11.1 6 11.1ZM6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z" fill="#B3E5ED" /><path d="M5.99935 2.66687L6.78624 5.21331H9.33268L7.27257 6.7871L8.05946 9.33354L5.99935 7.75975L3.93924 9.33354L4.72613 6.7871L2.66602 5.21331H5.21246L5.99935 2.66687Z" fill="white" /></svg>,
  SimpleArrowDown: () => <svg width={11} height={7} viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.8578 0.421066C3.72932 0.424113 3.60592 0.474894 3.51249 0.56326L0.262493 3.68326C0.0563258 3.88334 0.0502284 4.2124 0.249289 4.41959C0.448865 4.62679 0.777921 4.63338 0.985623 4.43483L3.87409 1.66011L6.76256 4.43483C6.97026 4.63338 7.29983 4.62679 7.49889 4.41959C7.69796 4.2124 7.69237 3.88334 7.48569 3.68326L4.23569 0.56326C4.13413 0.466775 3.99804 0.415489 3.85789 0.421066L3.8578 0.421066Z" fill={'white'} /></svg>,
};

export default MyAccountDropdown;