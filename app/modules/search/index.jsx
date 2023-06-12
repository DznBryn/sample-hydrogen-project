import { useRef, useEffect } from 'react';
import { bindCustomEvent, createCustomEvent/*, getMetafields*/ } from '~/utils/functions/eventFunctions';
// import { getResponsiveImageSrc } from 'frontend-ui';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const SearchProduct = (product) => {

  // const thumbnail = product.thumbnail;
  // const metafields = getMetafields(product.metafields);

  return (
    <div className={'searchProduct'}>
      <a href={'/products/' + product.slug} className={'productLink'}>
        <div>
          {/* <img src={thumbnail?.src} alt={thumbnail.alt} /> */}
        </div>
        <div className={'productInfo'}>
          {/* {metafields.alt_title !== undefined &&
            <div className={'productAlt'}>
              {metafields.alt_title}
            </div>
          } */}
          <div className={'productName'}>
            {product.name}
          </div>
        </div>
      </a>
    </div>
  );
  
};

const showCB = (handleClose) => {
  const searchOverlay = document.createElement('div');
  const isMobile = /Mobi/.test(window.navigator.userAgent);
  searchOverlay.onclick = handleClose.bind(this);
  searchOverlay.classList.add('searchOverlay');
  document.body.append(searchOverlay);
  if (!isMobile) {
    document.querySelector('html').classList.add('bodyWrap');
  }
};

const hideCB = () => {
  const isMobile = /Mobi/.test(window.navigator.userAgent);
  document.querySelector('.searchOverlay').remove();
  if (!isMobile) {
    document.querySelector('html').classList.remove('bodyWrap');
  }
};

const Search = ({ searchConfig }) => {
  const config = searchConfig;
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => bindCustomEvent(searchRef, 'data-search-state', {
    hidden: 'hiddenSearch',
    visible: 'visibleSearch',
    hideCB,
    showCB: () => showCB(handleClose)
  }));
  function handleClose() {
    const searchEvent = createCustomEvent();
    if (searchRef.current.getAttribute('data-search-state') === 'show') {
      searchRef.current.setAttribute('data-search-state', 'hide');
      searchRef.current.dispatchEvent(searchEvent);
    }
  }
  const handleSearch = (event) => {
    if (event.keyCode === 13) {
      window.location.href = '/search?query=' + encodeURIComponent(event.target.value);
    }
  };
  const handleClick = () => {
    window.location.href = '/search?query=' + encodeURIComponent(inputRef.current.value);
  };
  return (
    <div className={'searchNav hiddenSearch'} ref={searchRef} data-search-state="hide">
      <div className={'searchForm'}>
        <svg className={'searchIcon'} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleClick}>
          <path d="M1.6696 9.74384C3.72631 11.8005 6.95947 11.9686 9.21225 10.2076L13.7996 14.7941C14.0742 15.0686 14.5194 15.0686 14.794 14.7941C15.0687 14.5196 15.0687 14.0745 14.794 13.8L10.2067 9.21348C11.9514 6.97624 11.8002 3.72995 9.74342 1.67327C7.51104 -0.558393 3.90072 -0.557118 1.66962 1.67327C-0.55654 3.89743 -0.55654 7.51854 1.66962 9.74398L1.6696 9.74384ZM2.66405 2.66609C4.34662 0.984055 7.06775 0.984693 8.74905 2.66609C10.426 4.34302 10.426 7.07203 8.74905 8.74912C7.06648 10.4312 4.34535 10.4305 2.66405 8.74912C0.98658 7.07267 0.98658 4.34318 2.66405 2.66609Z" fill="#4C4E56" />
        </svg>
        <input
          type="text"
          className={'searchInput'}
          placeholder="What are you looking for?"
          onKeyUp={handleSearch}
          ref={inputRef}
          id="searchInput"
        />
        <div className={'searchClose'} onClick={handleClose}>
          X
        </div>
      </div>
      <div className={'searchHeaders'}>
        Trending Searches
      </div>
      <div className={'searchTrendingWrap'}>
        <div className={'searchTrending'}>
          {config.searchTags.map((tag) => {
            return <div className={'searchTag'} key={tag}>
              <a href={'/search?query=' + tag}>{tag}</a>
            </div>;
          })}
        </div>
      </div>
      <div className={'searchHeaders'}>
        Trending Products
      </div>
      <div className={'searchTrendingProducts'}>
        {config.searchProducts.map((product, index) => {
          return (<SearchProduct {...product} key={index}/>);
        })}
      </div>
    </div>
  );
};

export default Search;
