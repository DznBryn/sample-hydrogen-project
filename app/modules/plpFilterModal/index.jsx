import { useState } from 'react';
import { useStore } from '~/hooks/useStore';
import classnames from 'classnames';

import FilterButton from '../plpFilterButton';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const FilterCardInput = ({
  type,
  child,
  getSorted,
  state,
  dispatch,
  visible,
  setVisible,
  accordionType,
  setAccordionType,
}) => {
  const toggleAccordion = (type) => {
    setAccordionType(type);
    if (accordionType === type) {
      setVisible(!visible);
    } else {
      setVisible(true);
    }
  };

  const cardClasses = {
    ['grid__container']: classnames(
      type === 'filter' ? 'grid__container' : ''
    ),
    ['arrow__opened']: 'arrow opened',
  };

  const handleChoose = (type, item, isCategory) => {
    if (dispatch) {
      dispatch({
        type: type,
        payload: item,
        isCategory: isCategory,
      });
    }
  };

  state = state || [];

  return (
    <>
      {type === 'filter' ? (
        <div className={'filter__container'}>
          <div
            className={'title__container'}
            onClick={() => toggleAccordion(child.type)}
          >
            {child.type}
            <div
              className={
                visible && accordionType === child.type
                  ? cardClasses.arrow__opened
                  : 'arrow'
              }
            >
              <IconArrow />
            </div>
          </div>

          <div
            className={
              visible && accordionType === child.type
                ? 'children__container'
                : 'hide__children'
            }
          >
            {child.input === 'radio'
              ? child.children.sort().map((item, index) => (
                <div
                  className={'child__box'}
                  id={item}
                  key={index}
                  onClick={() => handleChoose(child.type, item, true)}
                >
                  <input
                    className={'filter__input'}
                    type={child.input}
                    checked={state[child.type]?.includes(item)}
                    id={item}
                    value={item}
                    readOnly
                  />
                  <label>{item}</label>
                </div>
              ))
              : child.children.sort().map((item, index) => (
                <div
                  className={'child__box'}
                  id={item}
                  key={index}
                  onClick={() => handleChoose(child.type, item, false)}
                >
                  <input
                    className={'filter__input'}
                    type={child.input}
                    checked={state[child.type]?.includes(item)}
                    id={item}
                    value={item}
                    readOnly
                  />
                  <label>{item}</label>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div
          className={'sort__container'}
          onClick={() => getSorted(child)}
        >
          <div className={'title__container'}>
            <span className={'sort_title'}>{child}</span>
          </div>
        </div>
      )}
    </>
  );
};

const FilterModal = ({ options, type, toggle, getSorted, state, dispatch }) => {
  const [store] = useStore();
  options = options || mockFilterOptions;
  type = type || 'filter';
  state = state || [];
  dispatch = dispatch || (() => {});

  const [visible, setVisible] = useState(false);
  const [accordionType, setAccordionType] = useState('');

  const filterClasses = {
    ['grid__container']: classnames(
      type === 'filter' ? 'grid__container' : ''
    ),
    ['modal__container']: classnames(
      'modal__container',
      type === 'filter' ? '' : 'sort__modal'
    ),
  };

  const handleClick = (type) => {
    dispatch({ type: type });
    toggle();
  };
  return (
    <div className={filterClasses.modal__container}>
      {type === 'filter' && (
        <div className={'desktop__buttons_container'}>
          <FilterButton action={() => handleClick('clear')} />
          <FilterButton action={() => handleClick('apply')} title="apply" />
        </div>
      )}

      <div className={'modal__title'}>
        <h4>{type}</h4>
        <div onClick={toggle}>
          <IconClose />
        </div>
      </div>

      <div className={filterClasses.grid__container}>
        {options.map((child, index) => (
          <FilterCardInput
            key={index}
            type={type}
            child={child}
            getSorted={getSorted}
            state={state}
            dispatch={dispatch}
            visible={visible}
            setVisible={setVisible}
            accordionType={accordionType}
            setAccordionType={setAccordionType}
          />
        ))}
      </div>

      {type === 'filter' && (
        <div className={'mobile__buttons_container'}>
          <FilterButton action={() => handleClick('clear')} />
          <FilterButton action={() => handleClick('apply')} 
            title="apply" 
            mobileTitle={`View ${store?.plpPage?.collectionQuantity ?? ''} products`}
          />
        </div>
      )}

      {type === 'filter' && (
        <div className={'filter__footer'}>
          <p>
            {' '}
            All our products are formulated without Parabens, Sulfates,
            Phtalates, Mineral Oil, Triclosan and Retinol
          </p>
        </div>
      )}
    </div>
  );
};

export default FilterModal;

const IconClose = ({ color = '#4c4e56' }) => {
  return (
    <svg width="16" height="16" fill={color}>
      <title>Close Icon</title>
      <path
        d="M.296 1.304C.151 1.168.08.999.08.8S.151.429.296.284C.432.148.601.08.8.08s.371.067.516.204L8 6.98 14.696.284c.137-.137.306-.204.504-.204s.371.067.516.204c.137.144.204.317.204.516s-.068.367-.204.504L9.02 8l6.695 6.685c.137.144.204.317.204.516s-.068.367-.204.504c-.144.144-.317.216-.516.216a.67.67 0 0 1-.504-.216L8 9.02l-6.684 6.685c-.144.144-.317.216-.516.216a.67.67 0 0 1-.504-.216.67.67 0 0 1-.216-.504c0-.199.071-.371.216-.516L6.98 8 .296 1.304z"
        fill={color}
      />
    </svg>
  );
};

export const IconArrow = ({color = '#4c4e56', position = 'up', size = '8px'}) => {
  return (
    <svg className={ position === 'down' ? 'position_down' : position === 'left' ? 'position_left' : position === 'right' ? 'position_right' : 'position_up' } width={size} height={size} viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg"><title>Arrow Icon</title>
      <path d="M3.8578 0.421066C3.72932 0.424113 3.60592 0.474894 3.51249 0.56326L0.262493 3.68326C0.0563258 3.88334 0.0502284 4.2124 0.249289 4.41959C0.448865 4.62679 0.777921 4.63338 0.985623 4.43483L3.87409 1.66011L6.76256 4.43483C6.97026 4.63338 7.29983 4.62679 7.49889 4.41959C7.69796 4.2124 7.69237 3.88334 7.48569 3.68326L4.23569 0.56326C4.13413 0.466775 3.99804 0.415489 3.85789 0.421066L3.8578 0.421066Z" fill={color}/>
    </svg>
  );
};

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
