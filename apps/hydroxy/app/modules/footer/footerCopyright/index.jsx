import {useRouteLoaderData} from '@remix-run/react';
import styles from './styles.css';
import OneTrustScripts, {CookieScripts} from '~/utils/services/customerPrivacy';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const FooterCopyright = () => {
  const rootData = useRouteLoaderData('root');
  const oneTrustID = rootData?.ENVS?.ONETRUST_ID;

  //

  return (
    <>
      {oneTrustID && (
        <>
          <OneTrustScripts oneTrustID={oneTrustID} />
          <CookieScripts />
        </>
      )}

      <div id="footerCopyright" className={'footerCopyright'}>
        © TULA Life, Inc. | All Rights Reserved | Made in NYC |{' '}
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
        {oneTrustID && (
          <>
            &nbsp;|&nbsp;
            <div id="tula-ot-button-container">
              <button id="ot-sdk-btn" className="ot-sdk-show-settings">
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
