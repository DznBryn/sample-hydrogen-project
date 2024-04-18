import {useRef, useEffect, useState} from 'react';
import {
  bindCustomEvent,
  createCustomEvent,
} from '~/utils/functions/eventFunctions';
import {useCollection} from '~/hooks/useCollection';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const SearchProduct = (product) => {
  const thumbnail = product.images.nodes[0];

  return (
    <div className={'searchProduct'}>
      <a href={'/products/' + product.handle} className={'searchProductLink'}>
        <img
          loading="lazy"
          src={thumbnail?.url + '&width=60'}
          alt={thumbnail.altText || ''}
        />
        <div className={'productInfoSearch'}>
          {product.alt_title !== undefined && (
            <div className={'productAltSearch'}>{product.alt_title}</div>
          )}
          <div className={'productName'}>{product.name}</div>
        </div>
      </a>
    </div>
  );
};

const showCB = (handleClose) => {
  if (!document.querySelector('.searchOverlay')) {
    const searchOverlay = document.createElement('div');
    const searchNav = document.querySelector('.searchNav');
    const isMobile = /Mobi/.test(window.navigator.userAgent);

    searchOverlay.onclick = handleClose.bind(this);
    searchOverlay.classList.add('searchOverlay');

    if (!isMobile) {
      searchOverlay.style.top = searchNav.style.top = `${getBannersHeight()}px`;
      document.querySelector('body').classList.add('bodyWrap');
    }

    document.body.append(searchOverlay);
  }
};

const hideCB = () => {
  const searchNav = document.querySelector('.searchNav');
  const isMobile = /Mobi/.test(window.navigator.userAgent);

  if (!isMobile) searchNav.style.top = '-400px';
  document.querySelector('.searchOverlay').remove();

  if (!isMobile) {
    document.querySelector('body').classList.remove('bodyWrap');
  }
};

const getBannersHeight = () => {
  if (typeof document !== 'undefined') {
    const promoBannerWrapHeight =
      document.querySelector('.promoBannersWrap')?.offsetHeight;
    const topHeaderContainerHeight = document.querySelector(
      '.topHeaderContainer',
    )?.offsetHeight;
    const totalHeight = promoBannerWrapHeight + topHeaderContainerHeight;

    return isNaN(totalHeight) ? 0 : totalHeight;
  } else {
    return 0;
  }
};

const Search = ({searchConfig}) => {
  const config = searchConfig;
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const {state, products} = useCollection('all');
  const [searchProducts, setSearchProducts] = useState([]);

  useEffect(() => {
    if (state === 'loaded') {
      const filteredProds = config.searchProducts.map((prods) => {
        return products.filter(
          (product) => product.handle === prods.productId,
        )[0];
      });

      setSearchProducts(filteredProds.filter(Boolean));
    }
  }, [state]);

  useEffect(() => {
    bindCustomEvent(searchRef, 'data-search-state', {
      hidden: 'hiddenSearch',
      visible: 'visibleSearch',
      hideCB,
      showCB: () => showCB(handleClose),
    });
  }, []);

  function handleClose() {
    const searchEvent = createCustomEvent();
    if (searchRef.current.getAttribute('data-search-state') === 'show') {
      searchRef.current.setAttribute('data-search-state', 'hide');
      searchRef.current.dispatchEvent(searchEvent);
    }
  }
  const handleSearch = (event) => {
    if (event.keyCode === 13) {
      window.location.href =
        '/search?query=' + encodeURIComponent(event.target.value);
    }
  };
  const handleClick = () => {
    window.location.href =
      '/search?query=' + encodeURIComponent(inputRef.current.value);
  };
  return (
    <div
      className={'searchNav hiddenSearch'}
      ref={searchRef}
      data-search-state="hide"
    >
      <div className={'searchForm'}>
        <svg
          className={'searchIcon'}
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleClick}
        >
          <path
            d="M1.6696 9.74384C3.72631 11.8005 6.95947 11.9686 9.21225 10.2076L13.7996 14.7941C14.0742 15.0686 14.5194 15.0686 14.794 14.7941C15.0687 14.5196 15.0687 14.0745 14.794 13.8L10.2067 9.21348C11.9514 6.97624 11.8002 3.72995 9.74342 1.67327C7.51104 -0.558393 3.90072 -0.557118 1.66962 1.67327C-0.55654 3.89743 -0.55654 7.51854 1.66962 9.74398L1.6696 9.74384ZM2.66405 2.66609C4.34662 0.984055 7.06775 0.984693 8.74905 2.66609C10.426 4.34302 10.426 7.07203 8.74905 8.74912C7.06648 10.4312 4.34535 10.4305 2.66405 8.74912C0.98658 7.07267 0.98658 4.34318 2.66405 2.66609Z"
            fill="#4C4E56"
          />
        </svg>
        <input
          type="text"
          className={'searchCompInput'}
          placeholder="What are you looking for?"
          onKeyUp={handleSearch}
          ref={inputRef}
          id="searchCompInput"
        />
        <div className={'searchClose'} onClick={handleClose}>
          X
        </div>
      </div>

      <div className={'searchHeaders'}>Trending Searches</div>

      <div className={'searchTrendingWrap'}>
        <div className={'searchTrending'}>
          {config?.searchTags?.map((tag) => {
            return (
              <div className={'searchTag'} key={tag}>
                <a href={'/search?query=' + tag}>{tag}</a>
              </div>
            );
          })}
        </div>
      </div>

      <div className={'searchHeaders'}>Trending Products</div>

      {searchProducts.length > 0 && (
        <>
          <div className={'searchTrendingProducts'}>
            {searchProducts.map((product, index) => {
              return <SearchProduct {...product} key={index} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
