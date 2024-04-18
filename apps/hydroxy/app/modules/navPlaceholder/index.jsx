import {useEffect, useState, useRef, Suspense, lazy} from 'react';
import {
  getCookie,
  eraseCookie,
  addClickEventOnWidgetElement,
  appendScript,
  getCMSDoc,
} from '~/utils/functions/eventFunctions';
import getApiKeys from '~/utils/functions/getApiKeys';
import {useCustomerState} from '~/hooks/useCostumer';
const Search = lazy(() => import('~/modules/search'));
import {links as searchStyles} from '~/modules/search';
import {Await, useRouteLoaderData} from '@remix-run/react';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}, ...searchStyles()];
};

const NavPlaceholder = ({searchConfig, siteWideSettings}) => {
  const {ENVS} = useRouteLoaderData('root');
  const {id, email, isLoggedIn} = useCustomerState();

  const [{confirmationText}, setDiscountObj] = useState({
    code: '',
    confirmationText: '',
  });

  const [yotpoId, setYotpoId] = useState(id);

  const setDiscount = (code, confirmationText) =>
    setDiscountObj({
      code: code,
      confirmationText: confirmationText,
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
      window.localStorage.setItem(
        'tulaSitewide',
        JSON.stringify(siteWideSettings),
      );
    } else {
      window.localStorage.removeItem('tulaSitewide');
    }
  }, [confirmationText]);

  useEffect(() => {
    appendGorgiasChat();

    if (typeof window === 'object' && getApiKeys().FEATURE_FLAGS.LOYALTY)
      window.addClickEventOnWidgetElement = addClickEventOnWidgetElement;
  }, []);

  useEffect(() => {
    if (typeof window.yotpoWidgetsContainer === 'object') {
      if (typeof window.yotpoWidgetsContainer?.initWidgets === 'function') {
        window.yotpoWidgetsContainer.initWidgets();
      }
    }
  });

  function appendGorgiasChat() {
    appendScript(
      'https://config.gorgias.chat/bundle-loader/01H7G04F846WG95Q6E2FBRW47X',
    );
  }

  const iframeStyle = {
    display: 'none',
    visibility: 'hidden',
  };

  const yotpoCustomerIdentifier = yotpoId
    ? yotpoId?.split('/Customer/')[1]
    : '';

  return (
    <div className={'navPlaceholder minHeight'} id="navPlaceholder">
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${ENVS?.GTM_ID}`}
          height="0"
          width="0"
          style={iframeStyle}
        ></iframe>
      </noscript>

      {confirmationText !== '' && (
        <div className={'confirmationWrap'} ref={confirmRef}>
          {confirmationText}
        </div>
      )}

      <Suspense>
        <Await resolve={searchConfig}>
          {(searchConfigSolved) => (
            <Search searchConfig={getCMSDoc(searchConfigSolved, 'Default')} />
          )}
        </Await>
      </Suspense>

      {
        <div
          id="swell-customer-identification"
          data-authenticated={isLoggedIn}
          data-email={email}
          data-id={yotpoCustomerIdentifier}
          style={{display: 'none'}}
        ></div>
      }
    </div>
  );
};

export default NavPlaceholder;
