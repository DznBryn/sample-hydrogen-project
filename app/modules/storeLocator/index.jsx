import {useEffect} from 'react';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

let started = false;

const storeLocatorConfig = {
  selector: '.storerocket-store-locator',
  account: 'mb4njwY4yV',
};

const StoreLocator = () => {
  useEffect(() => {
    if (window.StoreRocket && !started) {
      started = true;
      window.StoreRocket.init(storeLocatorConfig);
    }

    return function cleanup() {
      started = false;
    };
  }, [storeLocatorConfig]);

  return (
    <div id="store-locator" className={'fixedWidthPage minHeight container'}>
      <h1 className={'h1'}>Store Locator</h1>
      <h2 className={'h2'}>
        Find TULA in one of our retail partners nearest you. You can also shop
        TULA in Sephora Canada and Mecca Australia stores.
      </h2>
      <div className="storerocket-store-locator"></div>
    </div>
  );
};
export default StoreLocator;
