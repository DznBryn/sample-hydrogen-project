import { useEffect, useRef } from 'react';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const PromoOfferBar = ({ content }) => {

  const scriptTags = /(<script\b[^>]*>([\s\S]*?)<\/script>)/gm;

  // Set State 
  const discountCodeApplied = useRef(false);
  const codeCookieValue = useRef('');
  const promoBgColor = useRef('');
  const promoMessage = useRef('');

  function updatePromoBar(c) {
    discountCodeApplied.current = true;
    promoBgColor.current.style.backgroundColor = c.promoBackgroundColor;
    promoMessage.current.innerHTML = c.promoMessaging.replace(scriptTags, '');
  }

  function updateInfluencerPromoBar(c) {
    discountCodeApplied.current = true;
    promoBgColor.current.style.backgroundColor = c.promoBackgroundColor;
    promoMessage.current.innerHTML = c.promoMessaging.replace(scriptTags, '');
  }

  function updateCouponPromoBar(c) {
    discountCodeApplied.current = true;
    promoBgColor.current.style.backgroundColor = c.promoBackgroundColor;
    promoMessage.current.innerHTML = c.promoMessaging.replace(scriptTags, '');
  }


  useEffect(() => {
    let orgUtmSrc = window.location.href;

    // Get Shopify Discount Cookie 
    let getCookie = function (name) {
      let value = '; ' + document.cookie;
      let parts = value.split('; ' + name + '=');
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    getCookie('discount_code') !== undefined ? codeCookieValue.current = getCookie('discount_code') : null;

    if (sessionStorage.showPromoBar !== 'false') {
      // ======================= // If URL includes "/discount/" and Promo exists in CMS ======================= // 
      if (codeCookieValue.current) {
        sessionStorage.setItem('showPromoBar', true);

        for (let a = 0; a < content.length; a++) {
          // If discount code cookie matches to a code in the CMS 
          content[a].couponCode.forEach(code => code.toLowerCase() === codeCookieValue.current.toLowerCase() ? updatePromoBar(content[a]) : null);
        }
      }

      // ======================= // If URL includes 'influencer' params ======================= // 
      if (orgUtmSrc.toLowerCase().includes('utm_source=influencer')) {
        sessionStorage.setItem('showPromoBar', true);

        content.forEach(codeName => codeName.name.toLowerCase() === 'influencer' ? updateInfluencerPromoBar(codeName) : null);
      }

      // ======================= // If URL includes "?coupon=" ======================= // 
      if (orgUtmSrc.toLowerCase().includes('?coupon=')) {
        let couponUrl = orgUtmSrc.split('?coupon=');
        couponUrl = couponUrl[1];

        sessionStorage.setItem('showPromoBar', true);


        // Checks against "Marketing" list of coupons in CMS
        for (let a = 0; a < content.length; a++) {
          // If discount code cookie matches to a code in the CMS 
          content[a].couponCode.forEach(code => code.toLowerCase() === couponUrl.toLowerCase() ? updateCouponPromoBar(content[a]) : null);
        }
      }
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

    /* Handle closing promo bar */
    if (document.getElementById('close-promotionBar')) {
      document.getElementById('close-promotionBar').addEventListener('click', () => {
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
    if ((promoCopyWrapper.scrollHeight - 2) > promoCopyWrapper.clientHeight) {
      document.getElementById('expand-promotionBar').style.display = 'block';
      document.getElementById('close-promotionBar').style.display = 'none';
    } else {
      document.getElementById('expand-promotionBar').style.display = 'none';
      document.getElementById('close-promotionBar').style.display = 'block';
    }

    if (document.getElementById('expand-promotionBar')) {
      document.getElementById('expand-promotionBar').addEventListener('click', () => {
        document.getElementById('expand-promotionBar').style.display = 'none';
        document.getElementById('close-promotionBar').style.display = 'block';
        document.getElementById('promotionBar').style.height = 'fit-content';
        document.querySelector('.' + styles.textWrapper).style.height = 'fit-content';
      });
    }
  });

  return (
    <div ref={promoBgColor} id="promotionBar" className={'promoOfferBar'}>
      <div ref={promoMessage} id="promoCopyWrapper" className={'textWrapper'}></div>
      <button id="close-promotionBar" className="close-promotional-banner">+</button>
      <button id="expand-promotionBar">
        <img src="https://cdn.shopify.com/s/files/1/1736/9637/files/dropdown_arrow.svg?v=1662651827" alt="expand" />
      </button>
    </div>
  );
};

export default PromoOfferBar;
