import logo from '../../../public/logo.png';
import {useRouteLoaderData} from '@remix-run/react';

//

const PageMeta = () => {
  const rootData = useRouteLoaderData('root');
  //

  return (
    <>
      <meta charSet="utf-8" />
      {rootData?.ENVS?.SITE_NAME === 'US_STG' && (
        <meta name="robots" content="noindex" />
      )}
      <meta name="viewport" content="width=device-width,initial-scale=1" />

      <meta name="twitter:card" value="summary" />

      <meta
        property="og:title"
        content="TULA Skincare: Probiotic Skin Care Products"
      />
      <meta property="og:type" content="article" />
      <meta property="og:url" content="https://www.tula.com/" />
      <meta property="og:image" content={logo} />
      <meta
        property="og:description"
        content="Clean + Effective Skincare Made With Probiotic Extracts and Superfoods. Get Your Healthiest, Brightest Skin Ever With 15% Off Your First Order & Email Signup."
      />

      <script
        type="text/javascript"
        src={`https://cdn.cookielaw.org/consent/${rootData?.ENVS?.ONETRUST_ID}/OtAutoBlock.js`}
      />
      <script
        src={'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js'}
        type="text/javascript"
        data-domain-script={rootData?.ENVS?.ONETRUST_ID}
      />

      <script
        defer
        src="//cdn.storerocket.io/widget.js"
        id="storelocatorescript"
      ></script>

      {rootData?.ENVS?.SITE_NAME.includes('US') && (
        <script
          async
          src="https://d1fjjtymoe0goc.cloudfront.net/3e0547f6.js"
        ></script>
      )}

      <script
        defer
        src={`https://cdn-loyalty.yotpo.com/loader/${rootData?.ENVS?.YOTPO_LOYALTY_GUID}.js`}
      ></script>

      <script
        defer
        src={`https://cdn-widgetsrepository.yotpo.com/v1/loader/${rootData?.ENVS?.YOTPO_KEY}`}
      ></script>

      <script
        defer
        src={`https://staticw2.yotpo.com/${rootData?.ENVS?.YOTPO_KEY}/widget.js`}
      ></script>

      <script
        defer
        src={`https://cdn-widgetsrepository.yotpo.com/v1/loader/${rootData?.ENVS?.YOTPO_LOYALTY_GUID}`}
      ></script>

      <link
        rel="stylesheet"
        href={`https://staticw2.yotpo.com/${rootData?.ENVS?.YOTPO_KEY}/widget.css?widget_version=2022-10-06_07-58-33`}
        media="screen"
      />

      <meta
        name="google-site-verification"
        content={rootData?.ENVS?.GOOGLE_SITE_VERIFICATION_ID}
      />

      {rootData?.ENVS?.SITE_NAME.includes('UK') && (
        <meta
          name="facebook-domain-verification"
          content="fw3gr1515pe7790vj7heo8w1jnz400"
        />
      )}
      {!rootData?.ENVS?.SITE_NAME.includes('UK') && (
        <script
          src={`https://cdn.listrakbi.com/scripts/script.js?m=${rootData?.ENVS?.LISTRAK_ID}&v=1`}
        ></script>
      )}

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
                    document.location.search });`,
        }}
      ></script>

      {/* GA Cookies */}
      {!rootData?.ENVS?.SITE_NAME.includes('UK') && (
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                            })(window,document,'script','dataLayer','${rootData?.ENVS?.GTM_ID}');`,
          }}
        ></script>
      )}
      
      {!rootData?.ENVS?.SITE_NAME.includes('UK') && (
        <script
          defer
          src={`https://rapid-cdn.yottaa.com/rapid/lib/${rootData?.ENVS?.YOTTA_KEY}.js`}
        ></script>
      )}

      {/* ABtasty  cookies  */}

      {!rootData?.ENVS?.SITE_NAME.includes('UK') && (
        <script
          defer
          type="text/javascript"
          src="https://try.abtasty.com/02cdae70c1d789160f8b7d2e1d22ccf3.js"
        ></script>
      )}

      <script
        defer
        dangerouslySetInnerHTML={{
          __html:
            '! function() {var b = function() {window.__AudioEyeSiteHash = "' +
            rootData?.ENVS?.AUDIOEYE_HASH +
            '";var a = document.createElement("script");a.src = "https://wsmcdn.audioeye.com/aem.js";a.type = "text/javascript";a.setAttribute("defer", "");document.getElementsByTagName("body")?.[0]?.appendChild(a)};"complete" !== document.readyState ? window.addEventListener ? window.addEventListener("load", b) : window.attachEvent && window.attachEvent("onload", b) : b()}();',
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

      {rootData?.ENVS?.PAYMENT_PLAN_VENDOR === 'afterpay' ? (
        <script
          src="https://js.afterpay.com/afterpay-1.x.js"
          data-analytics-enabled
          defer
        ></script>
      ) : null}

      {rootData?.ENVS?.POSTSCRIPT_ID ? (
        <>
          <script
            defer
            src={`https://sdk.postscript.io/sdk.bundle.js?shopId=${rootData?.ENVS?.POSTSCRIPT_ID}`}
          ></script>
        </>
      ) : null}
    </>
  );
};

export default PageMeta;
