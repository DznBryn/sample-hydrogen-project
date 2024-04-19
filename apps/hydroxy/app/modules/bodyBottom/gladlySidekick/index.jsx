import {useEffect} from 'react';
import {useRouteLoaderData} from '@remix-run/react';

//

const GladlySidekick = () => {
  const {ENVS} = useRouteLoaderData('root');
  const isUS =
    ENVS?.SITE_NAME.includes('US') || ENVS?.SITE_NAME.includes('US_STG');

  useEffect(() => {
    if (window) {
      window.gladlyConfig = {appId: isUS ? 'tula.com' : 'tula.com-canada'};

      !(function (c, n, r, t) {
        if (!c[r]) {
          var i,
            d,
            p = [];
          (d =
            'PROD' !== t && t
              ? 'STAGING' === t
                ? 'https://cdn.gladly.qa/gladly/chat-sdk/widget.js'
                : t
              : 'https://cdn.gladly.com/chat-sdk/widget.js'),
            (c[r] = {
              init: function () {
                i = arguments;
                var e = {
                  then: function (t) {
                    return (
                      p.push({
                        type: 't',
                        next: t,
                      }),
                      e
                    );
                  },
                  catch: function (t) {
                    return (
                      p.push({
                        type: 'c',
                        next: t,
                      }),
                      e
                    );
                  },
                };
                return e;
              },
            }),
            (c.__onHelpAppHostReady__ = function (t) {
              if (
                (delete c.__onHelpAppHostReady__, ((c[r] = t).loaderCdn = d), i)
              )
                for (var e = t.init.apply(t, i), n = 0; n < p.length; n++) {
                  var a = p[n];
                  e = 't' === a.type ? e.then(a.next) : e.catch(a.next);
                }
            }),
            (function () {
              try {
                var t = n.getElementsByTagName('script')[0],
                  e = n.createElement('script');
                (e.async = !0),
                  (e.src = d + '?q=' + new Date().getTime()),
                  t.parentNode.insertBefore(e, t);
              } catch (t) {
                return t;
              }
            })();
        }
      })(window, document, 'Gladly', 'STAGING');
    }
  });

  return null;
};
export default GladlySidekick;
