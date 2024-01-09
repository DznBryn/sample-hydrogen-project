import getApiKeys from '~/utils/functions/getApiKeys';
import {showPaymentPlanVendor} from '~/utils/functions/eventFunctions';
import {useEffect} from 'react';

const PageMeta = () => {
  useEffect(() => {
    if (typeof window === 'object' && window?.Yo) {
      window?.Yo.configure(
        `https://qoe-1.yottaa.net/api/v1/configure.rapid.js?key=${
          getApiKeys().YOTTA_KEY
        }`,
      );
    }
  }, []);

  return (
    <>
      <script
        defer
        src={`https://cdn-loyalty.yotpo.com/loader/${
          getApiKeys().YOTPO_LOYALTY_GUID
        }.js`}
      ></script>

      <script
        defer
        src={`https://cdn-widgetsrepository.yotpo.com/v1/loader/${
          getApiKeys().YOTPO_LOYALTY_GUID
        }`}
      ></script>

      <script
        defer
        src={`https://staticw2.yotpo.com/${getApiKeys().YOTPO_KEY}/widget.js`}
      ></script>

      <meta
        name="google-site-verification"
        content={getApiKeys().GOOGLE_SITE_VERIFICATION_ID}
      />

      {getApiKeys().CURRENT_ENV.includes('UK') && (
        <meta
          name="facebook-domain-verification"
          content="fw3gr1515pe7790vj7heo8w1jnz400"
        />
      )}

      <script src={getApiKeys().LISTRAK_SCRIPT}></script>

      <script
        defer
        dangerouslySetInnerHTML={{__html: 'window.lockABTastyTag = true;'}}
      ></script>

      <script
        defer
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
        originalLocation: document.location.protocol + '//' +
                          document.location.hostname +
                          document.location.pathname +
                          document.location.search
        });`,
        }}
      ></script>

      <script
        defer
        dangerouslySetInnerHTML={{__html: getApiKeys().GA_SCRIPT}}
      ></script>

      <script
        defer
        src={`https://rapid-cdn.yottaa.com/rapid/lib/${
          getApiKeys().YOTTA_KEY
        }.js`}
      ></script>

      <script
        defer
        type="text/javascript"
        src="https://try.abtasty.com/02cdae70c1d789160f8b7d2e1d22ccf3.js"
      ></script>

      <script
        defer
        dangerouslySetInnerHTML={{
          __html:
            '! function() {var b = function() {window.__AudioEyeSiteHash = "' +
            getApiKeys().AUDIOEYE_HASH +
            '";var a = document.createElement("script");a.src = "https://wsmcdn.audioeye.com/aem.js";a.type = "text/javascript";a.setAttribute("defer", "");document.getElementsByTagName("body")[0].appendChild(a)};"complete" !== document.readyState ? window.addEventListener ? window.addEventListener("load", b) : window.attachEvent && window.attachEvent("onload", b) : b()}();',
        }}
      ></script>

      <script
        defer
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{
          "@context": "http://schema.org",
          "@type": "Organization",
          "name": "TULA Life, Inc",
          "url": "https://www.tula.com/",
          "logo": "https://cdn.shopify.com/s/files/1/1736/9637/t/77/assets/TULA_small_logo.svg?v=13716996232433434877",
          "description": "Clean + effective probiotic skincare products made with superfoods.",
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "help@tula.com"
          },
          "sameAs": [
            "https://instagram.com/tula/",
            "https://www.facebook.com/TULA/",
            "https://pinterest.com/liveTULA/",
            "https://www.twitter.com/tula"
          ]
        }`,
        }}
      ></script>

      {showPaymentPlanVendor === 'afterpay' ? (
        <script
          src="https://js.afterpay.com/afterpay-1.x.js"
          data-analytics-enabled
          defer
        ></script>
      ) : null}

      {/* 
        url.includes('/pages/why-tula') ?
          <link rel="canonical" href="https://www.tula.com/pages/why-tula" key="canonicalURL" />
          :
          <link rel="canonical" href={url} key="canonicalURL" />
      */}

      {getApiKeys().ONE_TRUST ? (
        <>
          <script
            defer
            type="text/javascript"
            src={getApiKeys().ONE_TRUST.OtAutoBlock}
          ></script>
          <script
            defer
            src={getApiKeys().ONE_TRUST.OtSDKStub}
            type="text/javascript"
          ></script>
        </>
      ) : null}

      {getApiKeys().DYNATRACE ? (
        <>
          <script
            defer
            type="text/javascript"
            src={getApiKeys().DYNATRACE.src}
            crossOrigin="anonymous"
          ></script>
        </>
      ) : null}

      {getApiKeys().POSTSCRIPT ? (
        <>
          <script
            defer
            src={`https://sdk.postscript.io/sdk.bundle.js?shopId=${
              getApiKeys().POSTSCRIPT.shopId
            }`}
          ></script>
        </>
      ) : null}
    </>
  );
};

export default PageMeta;
