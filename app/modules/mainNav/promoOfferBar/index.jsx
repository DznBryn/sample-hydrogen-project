import {useEffect, useRef} from 'react';

import styles from './styles.css';
import {getCookie} from '~/utils/functions/eventFunctions';
import {useSearchParams} from '@remix-run/react';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const PromoOfferBar = ({content}) => {
  const scriptTags = /(<script\b[^>]*>([\s\S]*?)<\/script>)/gm;

  // Set State
  const discountCodeApplied = useRef(false);
  const codeCookieValue = useRef('');
  const promoBgColor = useRef('');
  const promoMessage = useRef('');
  const [searchParams] = useSearchParams();
  const discountCode = searchParams.get('discount_code');

  function updatePromoBar(c) {
    discountCodeApplied.current = true;
    promoBgColor.current.style.backgroundColor =
      c?.promoBackgroundColor?.hex ?? '';
    promoMessage.current.style.color = c?.promoTextColor?.hex ?? '';
    promoMessage.current.innerHTML = c?.promoMessage ?? '';
  }

  function updateCouponPromoBar(c) {
    discountCodeApplied.current = true;
    promoBgColor.current.style.backgroundColor = c.promoBackgroundColor;
    promoMessage.current.innerHTML = c.promoMessaging.replace(scriptTags, '');
  }

  useEffect(() => {
    let orgUtmSrc = window.location.href;

    // Get Shopify Discount Cookie

    getCookie('discount_code') !== undefined
      ? (codeCookieValue.current = getCookie('discount_code'))
      : null;

    if (sessionStorage.showPromoBar !== 'false' && content?.length > 0) {
      // TODO: Refactor this to one to many conditional function

      // ======================= // If URL includes "/discount/" and Promo exists in CMS ======================= //
      if (discountCode) {
        sessionStorage.setItem('showPromoBar', true);
        const influencers = content.find(
          (c) => c.name.toLowerCase() === 'influencers',
        );
        if (influencers && influencers.discountCodes.includes(discountCode)) {
          updatePromoBar(influencers);
        }

        // for (let a = 0; a < content?.length; a++) {
        //   // If discount code cookie matches to a code in the CMS
        //   content[a].couponCode.forEach((code) =>
        //     code.toLowerCase() === discountCode.toLowerCase()
        //       ? updatePromoBar(content[a])
        //       : null,
        //   );
        // }
      }

      // ======================= // If URL includes 'influencer' params ======================= //
      if (orgUtmSrc.toLowerCase().includes('utm_source=influencer')) {
        sessionStorage.setItem('showPromoBar', true);
        const influencers = content.find(
          (c) => c.name.toLowerCase() === 'influencers',
        );
        if (influencers) {
          updatePromoBar(influencers);
        }
      }

      // ======================= // If URL includes "?coupon=" ======================= //
      if (orgUtmSrc.toLowerCase().includes('?coupon=')) {
        let couponUrl = orgUtmSrc.split('?coupon=');
        couponUrl = couponUrl[1];

        sessionStorage.setItem('showPromoBar', true);

        // Checks against "Marketing" list of coupons in CMS
        for (let a = 0; a < content.length; a++) {
          // If discount code cookie matches to a code in the CMS
          content[a].couponCode.forEach((code) =>
            code.toLowerCase() === couponUrl.toLowerCase()
              ? updateCouponPromoBar(content[a])
              : null,
          );
        }
      }
    } else {
      sessionStorage.setItem('showPromoBar', false);
    }

    // Check if promoBar should show
    if (sessionStorage.showPromoBar === 'true') {
      document.getElementById('promotionBar').style.display = 'flex';
    } else {
      document.getElementById('promotionBar').style.display = 'none';
    }

    function hideDiscountCode() {
      document.getElementById('promotionBar').classList.add('hidden');
      document.getElementById('promotionBar').style.display = 'none';
    }

    if (searchParams?.size === 0) {
      hideDiscountCode();
    }

    if (document.getElementById('close-promotionBar')) {
      /* Handle closing promo bar */
      document
        .getElementById('close-promotionBar')
        .addEventListener('click', () => {
          hideDiscountCode();
          sessionStorage.setItem('showPromoBar', false);
        });
    }

    /* Hide promo bar if false */
    function checkDiscountCodeDisplay() {
      if (sessionStorage.showPromoBar === 'false') {
        hideDiscountCode();
      }
    }
    checkDiscountCodeDisplay();

    /* Mobile View Overflow check */
    let promoCopyWrapper = document.getElementById('promoCopyWrapper');

    /* Minus '2' to offset a pixel or two while remaining valid */
    if (promoCopyWrapper.scrollHeight - 2 > promoCopyWrapper.clientHeight) {
      document.getElementById('expand-promotionBar').style.display = 'block';
      document.getElementById('close-promotionBar').style.display = 'none';
    } else {
      document.getElementById('expand-promotionBar').style.display = 'none';
      document.getElementById('close-promotionBar').style.display = 'block';
    }

    if (document.getElementById('expand-promotionBar')) {
      document
        .getElementById('expand-promotionBar')
        .addEventListener('click', () => {
          document.getElementById('expand-promotionBar').style.display = 'none';
          document.getElementById('close-promotionBar').style.display = 'block';
          document.getElementById('promotionBar').style.height = 'fit-content';
          document.querySelector('.' + styles.textWrapper).style.height =
            'fit-content';
        });
    }
  });

  return (
    <div ref={promoBgColor} id="promotionBar" className={'promoOfferBar'}>
      <p ref={promoMessage} id="promoCopyWrapper" className={'textWrapper'}></p>
      <button id="close-promotionBar" className="close-promotional-banner">
        +
      </button>
      <button id="expand-promotionBar">
        <img
          src="https://cdn.shopify.com/s/files/1/1736/9637/files/dropdown_arrow.svg?v=1662651827"
          alt="expand"
        />
      </button>
    </div>
  );
};

export default PromoOfferBar;
