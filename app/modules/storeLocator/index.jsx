import {useEffect} from 'react';
import {appendScript} from '~/utils/functions/eventFunctions';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const StoreLocator = () => {
  const storeLocatorConfig = {
    id: 'mb4njwY4yV',
  };

  useEffect(() => {
    if (typeof window === 'object') {
      if (!window.StoreRocket) {
        appendScript(
          'https://cdn.storerocket.io/js/widget-mb.js',
          'storelocatorescript',
          true,
        );
      }
    }
  }, []);

  return (
    <>
      <div id="store-locator" className={'fixedWidthPage minHeight container'}>
        <h1 className={'h1'}>Store Locator</h1>
        <h2 className={'h2'}>
          Find TULA in one of our retail partners nearest you. You can also shop
          TULA in Sephora Canada and Mecca Australia stores.
        </h2>
        <div
          id="storerocket-widget"
          style={{width: '100%'}}
          data-storerocket-env="p"
          data-storerocket-id={storeLocatorConfig.id}
        >
          <p style={{textAlign: 'center', fontSize: '13px', padding: '10px'}}>
            Store locator is loading from StoreRocket{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://storerocket.io"
              style={{fontSize: '13px'}}
            >
              Store Locator App
            </a>
            ...
          </p>
        </div>
      </div>
    </>
  );
};
export default StoreLocator;
