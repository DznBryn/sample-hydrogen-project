// import {useRouteLoaderData} from '@remix-run/react';
import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
const performanceCookieCategory = 'C0002';
// const functionalCookieCategory = 'C0003';
// const crossContextBehaviorCookieCategory = 'C0004';
// const socialMediaCookieCategory = 'C0005';

function sendConsent() {
  // if (window.OnetrustActiveGroups.includes(performanceCookieCategory)) {}
  // if (window.OnetrustActiveGroups.includes(functionalCookieCategory)) {}
  // if (
  //   window.OnetrustActiveGroups.includes(crossContextBehaviorCookieCategory)
  // ) {}
  // if (window.OnetrustActiveGroups.includes(socialMediaCookieCategory)) {}
  // window.dataLayer.push({consent_status: trackingConsent});
}

function waitForOneTrust() {
  hasOneTrustLoaded();

  let attempts = 0;

  const interval = setInterval(function () {
    if (hasOneTrustLoaded() || attempts > 100) {
      clearInterval(interval);
    }
    attempts++;
  }, 100);

  if (typeof window.OnetrustActiveGroups === 'string') {
    return window.OnetrustActiveGroups;
  }
}

function hasOneTrustLoaded() {
  if (typeof window.OnetrustActiveGroups === 'string') {
    //check now
    optanonWrapper();

    // provide consent check
    // checkOnConsent(window.OnetrustActiveGroups);
    return true;
  }
  return false;
}

function optanonWrapper() {
  const trackingConsent = window.OnetrustActiveGroups.includes(
    performanceCookieCategory,
  );
  console.log('trackingConsent: ', trackingConsent);
  sendConsent(trackingConsent);
}

function checkOnConsent(status) {
  console.log('Consent status: ', status);
  if (status.includes('BG37,C0004')) {
    if (window.fbq) fbqPixelConsentManage('grant');
    if (window.dtrum) dynatraceConsentManage(true);
    document.cookie =
      '__kla_off=false; expires=' +
      new Date(
        new Date().getTime() + 2 * 365 * 24 * 60 * 60 * 1000,
      ).toUTCString() +
      '; path=/';
  } else {
    if (window.fbq) fbqPixelConsentManage('revoke');
    if (window.dtrum) dynatraceConsentManage(false);
    disabledTrekkiePixels();
    document.cookie =
      '__kla_off=true; expires=' +
      new Date(
        new Date().getTime() + 2 * 365 * 24 * 60 * 60 * 1000,
      ).toUTCString() +
      '; path=/';
  }
}

const fbqPixelConsentManage = (status) => {
  if (!window.fbq || status !== 'revoke' || status !== 'grant') return;
  window.fbq('consent', status);
  console.log('=> Facebook consent status: ', status.toUpperCase());
};

const dynatraceConsentManage = (status) => {
  if (!window.dtrum) return;
  if (status) {
    window.dtrum.enableSessionReplay(true);
    window.dtrum.enable();
    console.log('=> Dynatrace consent status: ENABLED');
  } else {
    window.dtrum.disableSessionReplay();
    console.log('=> Dynatrace consent status: DISABLED');
  }
};

const disabledTrekkiePixels = () => {
  let attempts = 0;
  const trekkiePixelInterval = setInterval(() => {
    if (window.trekkie || attempts > 100) {
      const tikTokPixels = Array.from(
        document.querySelectorAll(
          'script[src*="https://analytics.tiktok.com"]',
        ),
      );
      const pinterestPixels = Array.from(
        document.querySelectorAll(
          'script[src*="https://ct.pinterest.com"], script[src*="https://s.pinimg.com"]',
        ),
      );
      const facebookPixels = Array.from(
        document.querySelectorAll(
          'script[id*="https://connect.facebook.net/en_US/fbevents.js"]',
        ),
      );
      const pixels = [...pinterestPixels, ...tikTokPixels, ...facebookPixels];
      pixels.forEach((pixel) => {
        pixel.setAttribute('type', 'text/plain');
        pixel.setAttribute('class', 'optanon-category-C0002-C0003-C0005');
      });
      clearInterval(trekkiePixelInterval);
    }
    attempts++;
  }, 100);
};

export function initOneTrust() {
  document &&
    document.addEventListener('visitorConsentCollected', (event) =>
      checkOnConsent(event.detail.analyticsAllowed),
    );
  return waitForOneTrust();
}

const OneTrustScripts = () => {
  return (
    <Helmet>
      {/* <script
        type="text/javascript"
        src={`https://cdn.cookielaw.org/consent/${oneTrustID}/OtAutoBlock.js`}
      />
      <script
        src={'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js'}
        type="text/javascript"
        data-domain-script={oneTrustID}
      /> */}
    </Helmet>
  );
};

export const CookieScripts = () => {
  const [activeGroup, setactiveGroup] = useState('');
  // const rootData = useRouteLoaderData('root');
  useEffect(() => {
    if (window) {
      hasOneTrustLoaded(window);

      let attempts = 0;

      const interval = setInterval(function () {
        if (hasOneTrustLoaded(window) || attempts > 100) {
          clearInterval(interval);
        }
        attempts++;
      }, 100);
    }
  }, []);
  function hasOneTrustLoaded(window) {
    if (typeof window?.OnetrustActiveGroups === 'string') {
      //check now
      optanonWrapper(window);

      // provide consent check
      // checkOnConsent(window.OnetrustActiveGroups);
      return true;
    }
    return false;
  }

  function optanonWrapper(window) {
    console.log('trackingConsent: ', window?.OnetrustActiveGroups);

    setactiveGroup(window?.OnetrustActiveGroups);
  }
  console.log('activeGroup', activeGroup);
  return (
    <Helmet>
      {/* <script
        src={`https://cdn.listrakbi.com/scripts/script.js?m=${rootData?.ENVS?.LISTRAK_ID}&v=1`}
      ></script>
      <script
        defer
        src={`https://rapid-cdn.yottaa.com/rapid/lib/${rootData?.ENVS?.YOTTA_KEY}.js`}
      ></script>
      <script
        defer
        type="text/javascript"
        src="https://try.abtasty.com/02cdae70c1d789160f8b7d2e1d22ccf3.js"
      ></script> */}
    </Helmet>
  );
};

export default OneTrustScripts;
