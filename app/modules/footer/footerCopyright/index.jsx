import React, { useEffect } from 'react';
import getApiKeys from '~/utils/functions/getApiKeys';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const FooterCopyright = () => {

  useEffect(() => {
    const otButtonMessage = getApiKeys()?.ONE_TRUST?.otButtonMessage ? (
      `| <div id="tula-ot-button-container"><button id="ot-sdk-btn" class="ot-sdk-show-settings"> ${getApiKeys().ONE_TRUST.otButtonMessage}</button></div>`
    ) : '';

    let footerCopyrightOT = `© TULA Life, Inc. | All Rights Reserved | Made in NYC | <a href="/pages/terms-conditions" target="_blank">Terms &amp; Conditions</a> | <a href="/pages/privacy-policy" target="_blank">Privacy Policy</a> | <a href="/pages/cookie-policy" target="_blank">Cookie Policy</a> ${otButtonMessage}`;

    let footerCopyright = '© TULA Life, Inc. | All Rights Reserved | Made in NYC | <a href="/pages/terms-conditions" target="_blank">Terms &amp; Conditions</a> | <a href="/pages/privacy-policy" target="_blank">Privacy Policy</a> | <a href="/pages/cookie-policy" target="_blank">Cookie Policy</a>';

    getApiKeys().ONE_TRUST
      ? (document.getElementById('footerCopyright').innerHTML = footerCopyrightOT)
      : (document.getElementById('footerCopyright').innerHTML = footerCopyright);
  }, []);

  return <div id="footerCopyright" className={'footerCopyright'}></div>;
};

export default FooterCopyright;
