import { createCustomEvent } from '~/utils/functions/eventFunctions';
import { Link } from '@remix-run/react';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const handleClick = () => {
  const searchEvent = createCustomEvent();
  if (document.querySelector('[data-search-state]').getAttribute('data-search-state') === 'show') {
    document.querySelector('[data-search-state]').setAttribute('data-search-state', 'hide');
    document.querySelector('[data-search-state]').dispatchEvent(searchEvent);
    return false;
  } else {
    document.querySelector('[data-search-state]').setAttribute('data-search-state', 'show');
    document.querySelector('[data-search-state]').dispatchEvent(searchEvent);
    setTimeout(() => document.querySelector('#searchInput').focus(), 500);
  }
  return false;
};

const IconSearch = () => (
  <Link className={'icon_search'} onClick={handleClick}>
    <svg width={24} height={24} viewBox="0 0 23 23" role="img" xmlns="http://www.w3.org/2000/svg"><title>Search</title><path d="M8.62027 17.2405C3.84756 17.2405 0 13.3597 0 8.62026C0 3.84756 3.88087 0 8.62027 0C13.393 0 17.2405 3.88087 17.2405 8.62026C17.2392 13.3597 13.3933 17.2405 8.62027 17.2405ZM8.62027 1.58174C4.77442 1.58174 1.6154 4.70732 1.6154 8.58661C1.6154 12.4675 4.74097 15.5915 8.62027 15.5915C12.4998 15.5915 15.6251 12.4672 15.6251 8.58661C15.6251 4.70598 12.4996 1.58174 8.62027 1.58174Z" fill="#4C4E56" /><path d="M21.185 21.9751C20.9784 21.9751 20.7731 21.9067 20.6014 21.735L14.3504 15.4853C14.0418 15.1768 14.0418 14.6617 14.3504 14.3518C14.6589 14.0432 15.174 14.0432 15.4839 14.3518L21.7686 20.6365C22.0772 20.945 22.0772 21.4601 21.7686 21.77C21.6305 21.9069 21.3903 21.9753 21.1851 21.9753L21.185 21.9751Z" fill="#4C4E56" /></svg>
  </Link>
);

export default IconSearch;