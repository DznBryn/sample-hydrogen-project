import { useEffect } from 'react';
import { mockCollection } from '~/utils/functions/plpFunctionsAndSupplies';
import classNames from 'classnames';
import { Link } from '@remix-run/react';
import { useComparisonModalStore } from '~/hooks/useStore'; 

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

let STORE = {};
let SET_STORE = {};
const PRODUCTS_LIMIT = 4;
const MINIMUN_OF_PRODUCTS = 2;

const ComparisonModal = ({ collection = mockCollection }) => {

  const {store, setStore} = useComparisonModalStore();
  STORE = store, SET_STORE = setStore;

  const { products } = collection;
  const enableCompare = (getSavedData().length >= MINIMUN_OF_PRODUCTS);

  useEffect(() => {

    setStore({ ...store, PLP: { tulacp: '[]', showModal: false, disableAllCheckbox: false } });
    window.setStore = setStore;

  }, []);

  useEffect(() => {

    hideVendorButtons();

  }, [store.PLP?.showModal]);

  /* */

  function hideVendorButtons() {

    const isModalShowingOff = store.PLP?.showModal;
    const ltkButton = document.querySelector('#ltkPopupButtonTriggerContainer');
    const gladlyButton = document.querySelector('#gladlyChat_container');

    if (ltkButton) ltkButton.style.zIndex = (isModalShowingOff) ? '0' : '99999';
    if (gladlyButton) gladlyButton.style.zIndex = (isModalShowingOff) ? '0 !important' : '2147483000 !important';

  }

  function getImagesSrc(slug) {

    const product = products.filter(data => data.handle === slug)[0];
    const media = product?.images?.nodes;

    return [media[0].url, media[1].url];

  }

  /* */

  const ProductsPreview = () => {

    const elements = [];
    for (let i = 0; i < PRODUCTS_LIMIT; i++) {

      const slug = getSavedData()[i];
      const containerClass = classNames('productPreview', (slug) ? '' : 'empty');

      elements.push(<div className={containerClass}>

        {

          (slug) && <>
            <div className={'remove'} onClick={() => removeItem(slug)}>X</div>
            <div className={'loader'}><p></p></div>
            <img src={getImagesSrc(slug)[0]} alt={getImagesSrc(slug)[1]} />
          </>

        }

      </div>);

    }

    return (<div className={'previewWrapper'}>{elements}</div>);

  };

  const Buttons = () => {

    const containerClassName = classNames('compare', enableCompare ? '' : 'disabled');
    const linkGoTo = enableCompare ? `/pages/compare?c=${collection.handle}&p=${getSavedData().join(',')}` : '#';
    const linkLabel = enableCompare ?
      `compare ${getSavedData().length} products`
      : `select at least ${MINIMUN_OF_PRODUCTS} products`;

    return (

      <div className={'buttons'}>

        <Link className={containerClassName} to={linkGoTo}>{linkLabel}</Link>
        <div className={'cancel'} onClick={removeAllItems}>cancel compare</div>

      </div>

    );

  };

  return (<>
    {
      (store.PLP?.showModal) && (

        <div className={'comparisonModal'}>

          <div className={'comparisonWrapper'}>

            <ProductsPreview />
            <Buttons />

          </div>

        </div>

      )
    }
  </>);

};

export default ComparisonModal;

const addItem = (slug) => saveData([...getSavedData(STORE), slug]);

const removeItem = (slug) => saveData(getSavedData(STORE).filter(data => data !== slug));

const removeAllItems = () => saveData([]);

const getSavedData = () => (JSON.parse(STORE?.PLP?.tulacp || '[]'));

const saveData = (data) => {

  SET_STORE({
    ...STORE,
    PLP: {
      showModal: (data.length > 0),
      tulacp: (JSON.stringify(data)),
      disableAllCheckbox: (data.length >= PRODUCTS_LIMIT)
    }
  });

};

export const comparisonUtils = { addItem, removeItem, removeAllItems, saveData, getSavedData };