import getApiKeys from '~/utils/functions/getApiKeys';
import {Helmet} from 'react-helmet';
import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const FooterCopyright = () => {
  return (
    <>
      {getApiKeys().ONE_TRUST && (
        <Helmet>
          <script
            type="text/javascript"
            src={getApiKeys().ONE_TRUST.OtAutoBlock}
          />
          <script
            src={getApiKeys().ONE_TRUST.OtSDKStub}
            type="text/javascript"
            data-domain-script={getApiKeys().ONE_TRUST.domain_script}
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
        {getApiKeys().ONE_TRUST && (
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
