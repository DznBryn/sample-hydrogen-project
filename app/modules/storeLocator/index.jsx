import { useEffect } from 'react';
import { appendScript } from '~/utils/functions/eventFunctions';
import PortableTextCustom from '../portableTextCustom';

import styles from './styles.css'

export const links = () => {
    return [{rel: 'stylesheet', href: styles}];
};


const StoreLocator = ({content}) => {
    const storeLocatorConfig = {
        selector: ".storerocket-store-locator",
        account: "mb4njwY4yV"
    };

    useEffect(() => {
        const handleInitializeStoreLocator = () => 
            window.StoreRocket.init(storeLocatorConfig)

        if (window.StoreRocket) {
          handleInitializeStoreLocator()
        }
        else {
          appendScript("//cdn.storerocket.io/widget.js", "storelocatorescript", true, handleInitializeStoreLocator)
        }    
    });

  return (
    <div id="store-locator" className={"fixedWidthPage minHeight"}>
      <h1 className={"h1"}>Store Locator</h1>
      <h2 className={"h2"}>
      Find TULA in one of our retail partners nearest you. You can also shop TULA in Sephora Canada and Mecca Australia stores.
      </h2>
      <div class="storerocket-store-locator"></div>
    </div>
  )
}
export default StoreLocator
