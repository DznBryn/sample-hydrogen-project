import {useRouteLoaderData} from '@remix-run/react';
import styles from './styles.css';
import {CookieScripts} from '~/utils/services/customerPrivacy';
import {useEffect, useRef} from 'react';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const FooterCopyright = () => {
  const rootData = useRouteLoaderData('root');
  const oneTrustID = rootData?.ENVS?.ONETRUST_ID;
  const groups = useRef(null);

  //

  useEffect(() => {
    if (typeof window === 'object') {
      if (window?.OneTrust && window?.OneTrust?.Init) {
        window?.OneTrust.Init();
        window?.OneTrust.InitializeBanner();
        window?.OneTrust.LoadBanner();
      }

      groups.current = window.OnetrustActiveGroups;
      window.OptanonWrapper = () => {
        if (window.OnetrustActiveGroups !== groups.current) {
          groups.current = window.OnetrustActiveGroups;
          setTimeout(() => window.location.reload(), 2000);
        }
      };
    }
  }, []);

  //

  function handleOpenOTModal() {
    if (typeof window === 'object') {
      if (window?.OneTrust && window?.OneTrust?.ToggleInfoDisplay) {
        window?.OneTrust.ToggleInfoDisplay();
      }
    }
  }

  //

  return (
    <>
      {oneTrustID && (
        <>
          <CookieScripts />
        </>
      )}

      <div id="footerCopyright" className={'footerCopyright'}>
        <p>© TULA Life, Inc. | All Rights Reserved | Made in NYC</p>&nbsp;|{' '}
        <a href="/pages/terms-conditions" target="_self">
          Terms &amp; Conditions
        </a>
        &nbsp;|&nbsp;
        <a href="/pages/privacy-policy" target="_self">
          Privacy Policy
        </a>
        &nbsp;|&nbsp;
        <a href="/pages/cookie-policy" target="_self">
          Cookie Policy
        </a>
        &nbsp;|&nbsp;{' '}
        <p>&nbsp;NOTICE: We may sell your sensitive personal data.</p>
        {oneTrustID && (
          <>
            &nbsp;|&nbsp;
            <div id="tula-ot-button-container">
              <button
                id="ot-sdk-btn"
                className="ot-sdk-show-settings"
                onClick={handleOpenOTModal}
              >
                Your Privacy Choices
              </button>
            </div>
            <img
              id="privacy-options"
              alt="California Consumer Privacy Act (CCPA) Opt-Out Icon"
              src="https://cdn.shopify.com/s/files/1/1736/9637/files/privacyoptions.svg?v=1701808999"
            />
          </>
        )}
      </div>
    </>
  );
};

export default FooterCopyright;
