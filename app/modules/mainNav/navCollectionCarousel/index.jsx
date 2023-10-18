import {useEffect, useRef} from 'react';
import {Link} from '@remix-run/react';
import {useCollection} from '~/hooks/useCollection';
import NavCollectionProductCard, {
  links as navCollectionProductCardStyles,
} from '~/modules/mainNav/navCollectionProductCard';
import {bindCustomEvent} from '~/utils/functions/eventFunctions';
import styles from './styles.css';

export const links = () => {
  return [
    {rel: 'stylesheet', href: styles},
    ...navCollectionProductCardStyles(),
  ];
};

const NavCollectionCarousel = ({collection, navItem}) => {
  const carouselRef = useRef(null);
  const collectionRef = useRef(null);
  const {state, products} = useCollection(
    collection.collectionId,
    'NAV_COLLECTION_CAROUSEL',
  );

  let isDown = false;
  let startX;
  let scrollLeft;
  let navPosition = 0;
  let carouselWidth = 0;

  const setStyle = (position) => {
    document.querySelectorAll('.navCollectionWrap').forEach((item, index) => {
      if (carouselWidth === 0) {
        carouselWidth =
          item.scrollWidth -
          document.querySelectorAll('.navCollection')[index].offsetWidth;
      }
      if (
        position > 0 ||
        (Math.abs(position) >= carouselWidth + 1 && position !== 0)
      )
        return;
      carouselRef.current.style.transform = 'translateX(' + position + 'px)';
    });
  };

  const dragStart = (e) => {
    isDown = true;
    const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    startX = clientX - e.currentTarget.getBoundingClientRect().left;
    scrollLeft = navPosition;
  };

  const dragEnd = () => {
    isDown = false;
    carouselRef.current.style.transition = 'all 1.5s ease 0s;';
  };

  const dragMove = (e) => {
    if (!isDown) return;
    if (Math.abs(navPosition) > carouselWidth && navPosition !== 0) {
      navPosition = -carouselWidth;
      setStyle(navPosition);
      return;
    }
    //e.preventDefault();
    const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const x = clientX - e.currentTarget.getBoundingClientRect().left;
    const walk = (x - startX) * 3; //scroll-fast
    navPosition = scrollLeft + walk;
    setStyle(navPosition);
  };

  const goLeft = () => {
    if (navPosition + 210 > 0) {
      navPosition = 0;
      setStyle(navPosition);
      return;
    }
    navPosition = navPosition + 210;
    setStyle(navPosition);
  };

  const goRight = () => {
    if (Math.abs(navPosition) + 210 > carouselWidth && navPosition !== 0) {
      navPosition = -carouselWidth;
      setStyle(navPosition);
      return;
    }
    navPosition = navPosition - 210;
    setStyle(navPosition);
  };

  useEffect(() =>
    bindCustomEvent(collectionRef, 'data-hover-state', {
      hidden: 'hidden',
      visible: 'visible',
    }),
  );

  return (
    <div
      className={'navCollectionCarousel hidden navDropDown'}
      id="nav_click_desktop_t2"
      ref={collectionRef}
      data-hover-state="hide"
    >
      <div className={'leftArrow'} onClick={goLeft}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="22"
          viewBox="0 0 30 22"
          fill="none"
        >
          <path
            d="M9.78765 21.618C9.97866 21.8477 10.2587 21.986 10.5576 21.9988C10.8564 22.0129 11.147 21.9004 11.3591 21.6883C11.5701 21.4773 11.6826 21.1867 11.6697 20.8879C11.6556 20.589 11.5174 20.309 11.2877 20.1179L3.63408 12.455L28.9301 12.455C29.4973 12.4257 29.9414 11.957 29.9414 11.3886C29.9414 10.8215 29.4973 10.3527 28.9301 10.3222L3.63408 10.3222L11.2994 2.66982C11.7001 2.2503 11.7001 1.58934 11.2994 1.16982C11.1013 0.970602 10.8306 0.858092 10.5494 0.858092C10.2681 0.858092 9.99861 0.970591 9.79938 1.16982L0.318774 10.6504L0.319947 10.6492C0.11604 10.8461 2.76543e-05 11.1168 2.76296e-05 11.3992C2.76048e-05 11.6828 0.116042 11.9536 0.319947 12.1492L9.78765 21.618Z"
            fill="#4C4E56"
          />
        </svg>
      </div>
      <div
        className={'navCollectionWrap'}
        onMouseDown={dragStart}
        onMouseMove={dragMove}
        onMouseUp={dragEnd}
        onMouseLeave={dragEnd}
        onTouchStart={dragStart}
        onTouchMove={dragMove}
        onTouchEnd={dragEnd}
        onTouchCancel={dragEnd}
      >
        <div
          className={'navCollection'}
          style={{transform: 'translateX(0px)'}}
          ref={carouselRef}
        >
          {state === 'loaded' &&
            products.map((product, idx) => {
              return <NavCollectionProductCard key={idx} product={product} />;
            })}
        </div>
      </div>
      <div className={'rightArrow'} onClick={goRight}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="22"
          viewBox="0 0 30 22"
          fill="none"
        >
          <path
            d="M20.2124 1.23994C20.0213 1.01025 19.7413 0.871957 19.4424 0.859087C19.1436 0.845024 18.853 0.957523 18.6409 1.16965C18.4299 1.38059 18.3174 1.67122 18.3303 1.97005C18.3444 2.26887 18.4826 2.54896 18.7123 2.73997L26.3659 10.4029H1.06992C0.502744 10.4322 0.0585938 10.9009 0.0585938 11.4693C0.0585938 12.0365 0.502744 12.5052 1.06992 12.5357H26.3659L18.7006 20.1881C18.2999 20.6076 18.2999 21.2686 18.7006 21.6881C18.8987 21.8873 19.1694 21.9998 19.4506 21.9998C19.7319 21.9998 20.0014 21.8873 20.2006 21.6881L29.6812 12.2075L29.6801 12.2087C29.884 12.0118 30 11.7411 30 11.4587C30 11.1751 29.884 10.9043 29.6801 10.7087L20.2124 1.23994Z"
            fill="#4C4E56"
          />
        </svg>
      </div>
      <div className={'viewAllWrap'}>
        {navItem.viewAllLink && navItem.viewAllText && (
          <Link className={'viewAllLink'} to={navItem.viewAllLink}>
            {navItem.viewAllText}
          </Link>
        )}
      </div>
    </div>
  );
};
export default NavCollectionCarousel;
