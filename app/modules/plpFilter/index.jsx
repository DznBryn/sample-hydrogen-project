import { useState, useEffect } from 'react';
import { useStore } from '~/hooks/useStore';
import FilterModal, {IconArrow, links as filterModalStyle } from '../plpFilterModal';
import classnames from 'classnames';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...filterModalStyle(),
  ];
};

const classes = {
  ['box__filter']: classnames('box__container isFilter'),
  ['arrow__opened']: classnames('filterArrow opened'),
  ['filter__opened']: classnames('filterContainer filter__opened'),
};

const FilterTags = ({ title, onClick }) => {
  return (
    <li className={'tagFilter'}>
      {title}{' '}
      <span onClick={onClick} className={'close__tag'}>
        +
      </span>
    </li>
  );
};

// filter component returns
const FilterBox = ({
  isFilter,
  onClick,
  toggle,
  type,
  sortedBy,
  filtersQuantity,
}) => {
  return (
    <div
      className={isFilter ? classes.box__filter : 'box__container'}
      onClick={onClick}
    >
      {isFilter ? (
        <span className={'title__wrapper'}>
          <strong>{filtersQuantity > 1 ? 'filters' : 'filter'}</strong>&nbsp;
          {filtersQuantity > 0 && 
            <span className={'filteresQuantity'}>
              {`(${filtersQuantity})`}
            </span>
          }
          <span
            className={
              toggle && type === 'filter' ? classes.arrow__opened : 'filterArrow'
            }
          >
            <IconArrow />
          </span>
        </span>
      ) : (
        <span className={'title__wrapper'}>
          <h6>sort by:</h6>
          <strong>{sortedBy}</strong>
          <span
            className={
              toggle && type === 'sort' ? classes.arrow__opened : 'filterArrow'
            }
          >
            <IconArrow />
          </span>
        </span>
      )}
    </div>
  );
};

// full component
const PLPFilter = ({
  sorted,
  getSortedBy,
  collectionQuantity,
  sortOptions,
  filtersOptions,
  state,
  dispatch,
  filtersQuantity,
  visible,
  setVisible,
}) => {
  const [sortedBy, setSortedBy] = useState('featured ');
  const [type, setType] = useState('');
  const {store, setStore} = useStore();
  sorted = sorted || sortedBy;
  getSortedBy = getSortedBy || setSortedBy;
  collectionQuantity = collectionQuantity || 0;
  sortOptions = sortOptions || mockSortOptions;
  filtersOptions = filtersOptions || mockFilterOptions;
  dispatch = dispatch || (() => {});
  setVisible = setVisible || (() => {});
  state = state || [];

  filtersQuantity = filtersQuantity || 0;

  useEffect(() => {
    if (collectionQuantity >= 0) {
      store?.plpPage ?
        setStore({
          ...store,
          plpPage: {
            ...store?.plpPage,
            collectionQuantity
          }
        }) :
        setStore({
          ...store,
          plpPage: {
            collectionQuantity
          }
        });
    }
  }, [collectionQuantity]);

  // function to select filters
  const handleChoose = (type, item, isCategory) => {
    if (dispatch) {
      dispatch({
        type: type,
        payload: item,
        isCategory: isCategory,
      });
      dispatch({ type: 'apply' });
    }
  };

  // function to alternate modal show/hide
  const toggleModal = (type) => {
    dispatch({ type: 'apply' });
    setType(type);
    setVisible(!visible);
  };

  // function to get sort option
  const getSorted = (sort) => {
    if (sort !== sorted) {
      getSortedBy(sort);
    }
    setVisible(!visible);
  };

  return (
    <div className={visible ? classes.filter__opened : 'filterContainer'}>
      <div className={'box__wrapper'}>
        <h5 className={'productsQuantity'}>
          {collectionQuantity} Products
        </h5>
        <FilterBox
          onClick={() => toggleModal('sort')}
          toggle={visible}
          type={type}
          sortedBy={sorted}
        />
        <FilterBox
          isFilter={true}
          onClick={() => toggleModal('filter')}
          toggle={visible}
          type={type}
          filtersQuantity={filtersQuantity}
        />
      </div>
      {visible && type === 'sort' && (
        <FilterModal
          type={type}
          options={sortOptions}
          toggle={toggleModal}
          getSorted={getSorted}
        />
      )}
      {visible && type === 'filter' && (
        <FilterModal
          type={type}
          options={filtersOptions}
          dispatch={dispatch}
          state={state}
          toggle={toggleModal}
        />
      )}
      <div className={'filterSettings'}>
        {!visible && filtersQuantity > 0 && (

          <ul id="tags_list" className={'tags_list'}>

            {state['product category'].length > 0 &&
              state['product category'].map((item, idx) => (
                <FilterTags
                  key={idx}
                  title={item}
                  onClick={() => handleChoose('product category', item, true)}
                />
              ))}
            {state['skin type'].length > 0 &&
              state['skin type'].map((item, idx) => (
                <FilterTags
                  key={idx}
                  title={item}
                  onClick={() => handleChoose('skin type', item)}
                />
              ))}
            {state['skin concern'].length > 0 &&
              state['skin concern'].map((item, idx) => (
                <FilterTags
                  key={idx}
                  title={item}
                  onClick={() => handleChoose('skin concern', item)}
                />
              ))}
            {state['ingredient preferences'].length > 0 &&
              state['ingredient preferences'].map((item, idx) => (
                <FilterTags
                  key={idx}
                  title={item}
                  onClick={() => handleChoose('ingredient preferences', item)}
                />
              ))}
          </ul>
        )}
        <p className={'mobileProductCounts'}>
          {collectionQuantity} {collectionQuantity > 1 ? 'products' : 'product'}
        </p>
      </div>
    </div>
  );
};

export default PLPFilter;

// sort possibilities
const mockSortOptions = ['price lo-hi', 'price hi-lo'];

const mockFilterOptions = [
  {
    type: 'product category',
    input: 'radio',
    children: [
      'cleansers',
      'moisturizers',
      'toners',
      'exfoliators',
      'masks',
      'serums',
      'eye care',
      'targeted treatments',
      'primers',
      'suncreens',
      'supplements',
      'face mist',
      'kits & bundles',
      'travel size',
    ],
  },
  {
    type: 'skin type',
    input: 'checkbox',
    children: ['combination', 'dry', 'balanced', 'oily'],
  },
  {
    type: 'skin concern',
    input: 'checkbox',
    children: [
      'acne & blemish control',
      'ageless',
      'dryness',
      'excess oil',
      'sensitive skin',
      'dullness',
      'large pores',
      'uneven tone',
      'uneven texture',
      'digestive health',
    ],
  },
  {
    type: 'ingredient preferences',
    input: 'checkbox',
    children: [
      'AHAs',
      'hyaluronic acid',
      'vitamin c',
      'niacinamide',
      'ceramides',
      'peptides',
      'bakuchiol',
      'salicylic acid',
      'benzoyl peroxide',
      'glycolic acid',
      'vitamin e',
      'tea tree oil',
      'azalaic acid',
      'witch hazel',
      'antioxidants',
      'squalane',
      'collagen',
      'collidial oatmeal',
      'synthetic fragrance free',
      'fragrance free',
      'oil-Free',
      'vegan',
      'oxybenzone free',
      'gluten free',
      'non-Comedogenic',
    ],
  },
];
