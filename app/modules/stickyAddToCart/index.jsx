import {useState, useEffect} from 'react';
import PDPAddToCartForm from '../pdp/pdpAddToCartForm';
import {useStore} from '~/hooks/useStore';
import classnames from 'classnames';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const StickyMobile = ({
  isScroll,
  exclusiveProductAtcColor,
  exclusiveProductTextColor,
  isGated,
}) => {
  const {store} = useStore();
  const shouldRenderSkinFinder =
    store?.product?.handle ===
    'radiant-skin-brightening-serum-skin-tint-spf-30';
  const shouldRenderConcealer =
    store?.product?.handle === 'radiant-skin-brightening-serum-concealer';

  return (
    <div
      id="stickyMobileCta"
      className={
        isScroll === true
          ? classnames(
              'stickyATC_mobile',
              'stickyATC_wrapper',
              'stickyATC_show',
              'stickyATC_show_mobile',
            )
          : classnames(
              'stickyATC_mobile',
              'stickyATC_wrapper',
              'stickyATC_show_mobile',
            )
      }
    >
      <div className={'stickyATCContainer'}>
        <PDPAddToCartForm
          renderingShadeFinder={shouldRenderSkinFinder}
          exclusiveProductAtcColor={exclusiveProductAtcColor}
          exclusiveProductTextColor={exclusiveProductTextColor}
          isGated={isGated}
          renderingConcealer={shouldRenderConcealer}
        />
      </div>
    </div>
  );
};

const StickyDesktop = ({product, Component, PriceComponent, isScroll}) => (
  <div
    className={
      isScroll === true
        ? classnames(
            'stickyATC_desktop',
            'stickyATC_wrapper',
            'stickyATC_show',
            'stickyATC_show_desktop',
          )
        : classnames(
            'stickyATC_desktop',
            'stickyATC_wrapper',
            'stickyATC_show_desktop',
          )
    }
  >
    <div className={'stickyATCContainer'}>
      <p className={'product_title'}>
        {product?.title?.name || 'Product Title Here'}
      </p>
      <div className={'product_price'}>{PriceComponent}</div>
      <div className={'component_container'}>{Component}</div>
    </div>
  </div>
);

const StickyAddToCart = ({
  product = {},
  Component = <div>N/A</div>,
  PriceComponent = (Component = <div>N/A</div>),
  exclusiveProductAtcColor,
  exclusiveProductTextColor,
  isGated,
}) => {
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    if (window) {
      window.addEventListener('scroll', function () {
        const rect = document.querySelector('.add_to_cart_form .add_to_cart');
        const mobileTab = document.querySelector('#mobileNavbarContainer');
        if (window.innerWidth <= 768) {
          if (isElementNotInView(rect) === false) {
            setIsScroll(false);
          } else {
            setIsScroll(true);
          }
        } else {
          if (mobileTab) mobileTab.style.display = 'none';
          if (isElementNotInView(rect) === false) {
            setIsScroll(false);
          } else {
            setIsScroll(true);
          }
        }
      });
    }
    return function cleanup() {
      setIsScroll(false);
    };
  }, []);

  const isElementNotInView = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top < 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= window.innerWidth
    );
  };

  return (
    typeof window !== 'undefined' && (
      <>
        <StickyMobile
          product={product}
          Component={Component}
          PriceComponent={PriceComponent}
          isScroll={isScroll}
          exclusiveProductAtcColor={exclusiveProductAtcColor}
          exclusiveProductTextColor={exclusiveProductTextColor}
          isGated={isGated}
        />
        <StickyDesktop
          product={product}
          Component={Component}
          PriceComponent={PriceComponent}
          isScroll={isScroll}
          exclusiveProductAtcColor={exclusiveProductAtcColor}
          exclusiveProductTextColor={exclusiveProductTextColor}
          isGated={isGated}
        />
      </>
    )
  );
};
export default StickyAddToCart;
