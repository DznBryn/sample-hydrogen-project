import React, { useState, useRef, useEffect } from 'react';
import GetApiKeys from '~/utils/functions/getApiKeys';
import classNames from 'classnames/bind';
import {
  getCookie,
  isInfluencerLink,
  createCookie,
} from '~/utils/functions/eventFunctions';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const SiteSwitcher = ({ isMobile }) => {
  const currentSite = useRef(getCurrentSite());
  const [isOptionsOpened, setIsOptionsOpened] = useState(false);

  const arrowFlipStyle = classNames.bind(styles)(
    'arrowSiteSwitcher',
    isOptionsOpened && 'flipArrow'
  );
  const responsiveStyle = classNames.bind(styles)(
    'siteSwitcherContainer',
    isMobile ? 'switcherOnMobile' : 'switcherOnDesktop'
  );

  const options = {
    canada: {
      label: 'Canada',
      url: 'https://www.tulaskincare.ca/',
      icon: () => (
        <img src='https://cdn.shopify.com/s/files/1/1736/9637/files/CAN-icon.png' />
      ),
    },
    unitedStates: {
      label: 'United States',
      url: 'https://tula.com/',
      icon: () => (
        <img src='https://cdn.shopify.com/s/files/1/1736/9637/files/US-icon.png' />
      ),
    },
    unitedKingdom: {
      label: 'United Kingdom',
      url: 'http://tulaskincare.co.uk/',
      icon: () => (
        <img src='https://cdn.shopify.com/s/files/1/1736/9637/files/UK_icon_2x-png.png' />
      ),
    },
  };

  function getCurrentSite() {
    const curEnv = GetApiKeys().CURRENT_ENV;

    if (curEnv.includes('CA')) return 'canada';
    if (curEnv.includes('US')) return 'unitedStates';
    if (curEnv.includes('UK')) return 'unitedKingdom';
  }

  const handleOpenSelect = () => {
    setIsOptionsOpened(!isOptionsOpened);
  };

  const handleSelectOption = (curSelection) => {
    const userChoseTheSameCurrentSite = currentSite.current === curSelection;

    if (userChoseTheSameCurrentSite) {
      setIsOptionsOpened(false);
    } else {
      window.location.href = options[curSelection].url;
    }
  };

  const OptionCustomized = ({ Icon, label }) => {
    return (
      <div className={'optionCustomized'}>
        <Icon />
        <div>{label}</div>
      </div>
    );
  };

  const CurrentOption = () => (
    <div className={'optionSelected'} onClick={handleOpenSelect}>
      <div>
        <OptionCustomized
          label={options[currentSite.current].label}
          Icon={options[currentSite.current].icon}
        />
      </div>
      <div className={arrowFlipStyle}>▼</div>
    </div>
  );

  const Options = () => {
    return (
      <div className={'optionsContainer'}>
        {Object.keys(options).map((key) => (
          <div onClick={() => handleSelectOption(key)} key={key}>
            <OptionCustomized
              label={options[key].label}
              Icon={options[key].icon}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={responsiveStyle}>
      <div className={'siteSwitcher'}>
        <CurrentOption />
        {isOptionsOpened && <Options />}
      </div>
    </div>
  );
};

export const SiteSwitcherPopUp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [environment, setEnvironment] = useState(null);
  const currentEnv = GetApiKeys().CURRENT_ENV;

  useEffect(() => {
    checkLocateAndEnv();
  }, []);

  function checkLocateAndEnv() {
    const iplocateCookie = getCookie('iplocate');
    const siteSwitcherShow = getCookie('siteSwitcherShow');
    if (iplocateCookie !== '') {
      const environments = [
        {
          acronym: 'US',
          info: {
            name: 'United States',
            experience: 'US',
            img: 'https://cdn.shopify.com/s/files/1/1736/9637/files/US-icon.png',
          },
          domain: 'tula.com',
          regions: ['US'],
        },
        {
          acronym: 'CA',
          info: {
            name: 'Canada',
            experience: 'Canadian',
            img: 'https://cdn.shopify.com/s/files/1/1736/9637/files/CAN-icon.png',
          },
          domain: 'tulaskincare.ca',
          regions: ['CA'],
        },
        {
          acronym: 'UK',
          info: {
            name: 'United Kingdom',
            experience: 'UK',
            img: 'https://cdn.shopify.com/s/files/1/1736/9637/files/UK_icon_2x-png.png',
          },
          domain: 'tulaskincare.co.uk',
          regions: ['GB'],
        }
      ];

      const getCorrectEnvironmentByLocation = () => {
        const iplocate = JSON.parse(decodeURIComponent(iplocateCookie));
        const environment = environments.find((env) =>
          env.regions.includes(iplocate.country_code)
        );

        return environment;
      };

      const correctEnv = getCorrectEnvironmentByLocation();

      if (correctEnv) {
        if (!currentEnv.includes(correctEnv.acronym)) {
          setEnvironment(correctEnv);
          siteSwitcherShow ? setIsOpen(false) : setIsOpen(true);
        }
      }
    }
  }

  const getCurrentRegionAcronym = () => currentEnv.split('_')[0];

  const closePopup = () => {
    createCookie('siteSwitcherShow', true, 365);
    setIsOpen(false);
  };

  const goToSite = () => {
    const urlParameters = window.location.pathname + window.location.search;

    if (isInfluencerLink(window.location.href)) {
      const discountCookie = getCookie('discount_code');

      if (discountCookie && discountCookie !== '') {
        const shopifyDiscountRoute = `/discount/${discountCookie}?redirect=`;

        window.location.href = `https://${environment.domain + shopifyDiscountRoute + urlParameters
        }`;
        return;
      }
    }

    window.location.href = `https://${environment.domain + urlParameters}`;
  };

  const getPopupDescription = () => {
    return (
      <React.Fragment>
        {`Hi there, we noticed you're visiting from ${environment.info.name}, please proceed to our ${environment.info.experience} experience.`}
        {isInfluencerLink(window.location.href) && (
          <b>{` Click continue to proceed to the ${environment.info.name} site and enjoy the offer!`}</b>
        )}
      </React.Fragment>
    );
  };

  return (
    isOpen && (
      <div className={styles.popUpContainer}>
        <div className={styles.box}>
          <div className={styles.imgContainer}>
            <img src={environment.info.img} />
          </div>

          <div className={styles.content}>{getPopupDescription()}</div>

          <div className={styles.buttonsContainer}>
            <button
              onClick={() => goToSite()}
              className={styles.positiveButton}>
              {`continue to ${environment.info.name} site`}
            </button>
            <button onClick={closePopup} className={styles.negativeButton}>
              {`go to ${getCurrentRegionAcronym()} site`}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default SiteSwitcher;
