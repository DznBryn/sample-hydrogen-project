import { Link } from '@remix-run/react';
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
    <div id="store-locator" className={"fixedWidthPage minHeight container"}>
      <h1 className={"h1"}>{content.storeLocatorHeader}</h1>
      <h2 className={"h2"}>
        <PortableTextCustom value={content.storeLocatorContentRaw} />
      </h2>
      <div class="storerocket-store-locator"></div>
    </div>
  )
}
export default StoreLocator
