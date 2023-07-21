import { useEffect, useState, useRef } from 'react';
import { getCookie, eraseCookie, addClickEventOnWidgetElement, appendScript } from '~/utils/functions/eventFunctions';
import getApiKeys from '~/utils/functions/getApiKeys';
import { useCustomerState } from '~/hooks/useCostumer';
import Search, { links as searchStyles} from '~/modules/search';

// import { useYotpoReviews } from '@frontend-sdk/yotpo';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...searchStyles(),
  ];
};

const NavPlaceholder = ({ searchConfig, siteWideSettings }) => {

  const { id, email, isLoggedIn } = useCustomerState();

  const [{ confirmationText }, setDiscountObj] = useState({
    code: '',
    confirmationText: ''
  });

  const [yotpoId, setYotpoId] = useState(id);

  const setDiscount = (code, confirmationText) => setDiscountObj({
    code: code,
    confirmationText: confirmationText
  });

  const confirmRef = useRef(null);

  const handleConfirm = () => {
    const dcode = getCookie('tulaDiscountCode');
    const dconfirmText = getCookie('tulaDiscountText');
    setDiscount(dcode, dconfirmText);
    if (confirmationText !== undefined && confirmRef.current !== null) {
      window.setTimeout(() => {
        confirmRef.current.classList.add('active');
        window.setTimeout(() => {
          confirmRef.current.classList.remove('active');
          eraseCookie('tulaDiscountText');
          setDiscount(dcode, '');
        }, 3000);
      }, 500);
    }
  };

  useEffect(() => {

    if (typeof window !== 'undefined') {

      let customerId = id;

      if (getApiKeys().API_TYPE === 'rest') {
        const parsedCustomerId = window?.atob(id);
        customerId = parsedCustomerId?.split('/Customer/')[1] || '';
      }

      setYotpoId(customerId);

    }

  }, [id]);

  useEffect(() => {
    handleConfirm();
    if (siteWideSettings && siteWideSettings.promoDiscount) {
      window.localStorage.setItem('tulaSitewide', JSON.stringify(siteWideSettings));
    }
    else {
      window.localStorage.removeItem('tulaSitewide');
    }
  }, [confirmationText]);

  useEffect(() => {
    const minHeight = document.querySelectorAll('.minHeight')?.length > 0;
    const navPlaceholder = document.getElementById('navPlaceholder');

    const interval = setInterval(() => {
      if (minHeight === true) {
        navPlaceholder.style.marginBottom = '0';
        clearInterval(interval);
      }
    }, 1000);

    appendYotpoScript();

    if (window.Glady) {
      window.Glady.init({
        appId: 'tula.com',
        autoShowButton: true
      }).then(() => {
        //.....}).catch((e) => { console.log(`Could not load Gladly chat widget due to ${e}`) 
      });
    }

    if (typeof window === 'object' && getApiKeys().FEATURE_FLAGS.LOYALTY) window.addClickEventOnWidgetElement = addClickEventOnWidgetElement;

  }, []);

  useEffect(() => {

    if (typeof window.yotpoWidgetsContainer === 'object') {

      if (typeof window.yotpoWidgetsContainer?.initWidgets === 'function') {

        window.yotpoWidgetsContainer.initWidgets();

      }

    }

  });

  function appendYotpoScript(){

    const loaderSrc = `https://cdn-loyalty.yotpo.com/loader/${getApiKeys().YOTPO_LOYALTY_GUID}.js`;
    const widgetSrc = `https://cdn-widgetsrepository.yotpo.com/v1/loader/${getApiKeys().YOTPO_LOYALTY_GUID}`;

    if (document.querySelector(`[src="${loaderSrc}"]`) === null) {

      appendScript(loaderSrc, '', true, () => { }, true)?.then(() => { });
      appendScript(widgetSrc, '', true, () => { }, true)?.then(() => { });
    }

  }

  // const appKey = getApiKeys().YOTPO_KEY;
  // useYotpoReviews(appKey);

  const iframeStyle = {
    display: 'none',
    visibility: 'hidden'
  };


  return (
    <div className={'navPlaceholder minHeight'} id='navPlaceholder'>

      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5ZXFRC" height="0" width="0" style={iframeStyle}></iframe></noscript>

      {(confirmationText !== '') &&
        <div className={'confirmationWrap'} ref={confirmRef}>
          {confirmationText}
        </div>
      }

      <Search searchConfig={searchConfig} />

      {
        <div
          id="swell-customer-identification"
          data-authenticated={isLoggedIn}
          data-email={email}
          data-id={yotpoId}
          style={{ display: 'none' }}>
        </div>
      }

    </div>
  );
};

export default NavPlaceholder;
