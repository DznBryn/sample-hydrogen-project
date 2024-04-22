import {useRouteLoaderData} from '@remix-run/react';
import {Helmet} from 'react-helmet';
import styles from './styles.css';

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
        <Helmet>
          <script
            type="text/javascript"
            src={`https://cdn.cookielaw.org/consent/${oneTrustID}/OtAutoBlock.js`}
          />
          <script
            src={'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js'}
            type="text/javascript"
            data-domain-script={oneTrustID}
          />
        </Helmet>
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
