import {useState, useEffect, useReducer, useRef,} from 'react';
import classnames from 'classnames';
import {mockCollection, mockFilterOptions, mockSortOptions, getBanners, sortProducts, filterProducts, filterHiddenProductsByTag, handleFilterOptions, filtersQuantityCalculation, newChangeBannersPositions, } from '~/utils/functions/plpFunctionsAndSupplies';
import { triggerAnalyticsOnScroll, useLayoutEffect } from '~/utils/functions/eventFunctions';
import Filter, { links as filterStyles } from '../plpFilter';
import GenericRecommendedProducts, { links as genericRecommendedProductsStyles } from '../genericRecommendedProducts';
import Banner, { links as plpBannerStyles } from '../plpBanner';
import Title, { links as titleStyles } from '../plpTitle';
import FireWorkPLPCarousel, { links as fireWorkCarouselStyles } from '../fireWorkCarousel';
import HorizontalProduct, { links as plpHorizontalProductBoxStyles } from '../plpHorizontalProductBox';
import ComparisonModal, { links as comparisonModalStyles } from '../comparisonModal';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...filterStyles(),
    ...genericRecommendedProductsStyles(),
    ...plpBannerStyles(),
    ...fireWorkCarouselStyles(),
    ...plpHorizontalProductBoxStyles(),
    ...comparisonModalStyles(),
    ...titleStyles(),
  ];
};

// import { useYotpoReviewsRefresh } from '@frontend-sdk/yotpo';

const PLP = ({ collection, filtersOptions, isInfluencerPage = false, cartConfig }) => {

  // useYotpoReviewsRefresh();

  const sortOptions = mockSortOptions;
  collection = collection || mockCollection;
  filtersOptions = filtersOptions || mockFilterOptions;

  const currentFiltersConfig = useRef({});

  let collectionContainerStyle = classnames(
    'collection__container',
    'collection__container_2Collumns'
  );

  const products = collection ? filterHiddenProductsByTag(collection.products) : [];
  const { metafields = [], handle: slug } = collection;
  const banners = getBanners(metafields);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

  const Collection = ({ products, collection }) =>
    products.length > 0
      ? products.map((product, index) => (
        <HorizontalProduct
          is2Columns={true}
          product={product}
          compareButtonConfig={{showIt: collection.showCompareButton}}
          analytics={{
            click: {
              actionField: { list: `${collection.name}` },
              products: [
                {
                  name: product?.title,
                  id: product?.id,
                  price: parseFloat(product?.priceRange?.minVariantPrice?.amount)?.toFixed(2),
                  category: product?.productType,
                  variant: '',
                  position: index,
                },
              ],
            },
          }}
          key={product.id}
        />
      )) : null;

  // filter modal state
  const [visible, setVisible] = useState(false);

  // Currently displayed collection
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Sort state
  const [sortedBy, setSortedBy] = useState('featured');

  // function to create initial reducer's state dinamicaly
  const intialState = filtersOptions.reduce(
    (acc, curr) => (
      acc[curr.type] = [],
      acc
    ),
    {}
  );

  // reducer to manage filters state
  const [state, dispatch] = useReducer(reducer, intialState);

  // ref to be used on updatedByFilters
  const previousState = useRef(state);

  // function to update currently collection state by reducer state
  function updateFilteredProducts(value) {

    setFilteredProducts(
      sortProducts(sortedBy, null, filterProducts(products, value))
    );
  }

  // function which will be called on reducer
  function reducer(state, action) {
    if (action.type === 'clear') {
      updateFilteredProducts(intialState);
      return intialState;
    }

    if (action.type === 'apply') {
      updateFilteredProducts(state);
      currentFiltersConfig.current = state;
      return state;
    }

    if (action.isCategory) {
      return state[action.type][0] === action.payload
        ? { ...state, [action.type]: [] }
        : { ...state, [action.type]: [action.payload] };
    } else {
      return {
        ...state,
        [action.type]: handleFilterOptions(state[action.type], action.payload),
      };
    }
  }

  // Analytics stuff
  const PLPContainer = useRef(null);
  // Analytics stuff
  useEffect(() => {
    triggerAnalyticsOnScroll(
      PLPContainer.current,
      filteredProducts,
      collection.name
    );
  }, []);

  // effect to update collection after sorted
  useLayoutEffect(() => {
    const filtersConfig = Object.keys(currentFiltersConfig.current).length <= 0 ? intialState : currentFiltersConfig.current;
    setFilteredProducts(sortProducts(sortedBy, null, filterProducts(products, filtersConfig)));
  }, [sortedBy]);

  // effect to adjust grid when resize
  useEffect(() => {
    previousState.current = state;

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window?.innerWidth && window?.innerWidth > 600 && window.addEventListener('resize', window?.innerWidth && handleResize);
    window?.innerWidth && handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [size.width, filteredProducts]);

  // state to handle with the banners position
  const [bannersPositions, setBannersPositions] = useState();

  // effect to update the banners position when the screen size changes
  useEffect(() => {
    if (window?.innerWidth) {
      if (
        collection?.promoPosition1 ||
        collection?.promoPosition2 ||
        collection?.promoPosition3 ||
        collection?.fireworkStoryPosition
      ) {
        setBannersPositions(
          newChangeBannersPositions(
            {
              width: window?.innerWidth,
              height: window?.innerHeight,
            },
            {
              pos1: getPropValue(collection?.promoPosition1),
              pos2: getPropValue(collection?.promoPosition2),
              pos3: getPropValue(collection?.promoPosition3),
              pos4: getPropValue(collection?.fireworkStoryPosition),
            },
            filteredProducts.length
          )
        );
      }
    }

    const getBannersPositions = function () {
      if (
        collection?.promoPosition1 ||
        collection?.promoPosition2 ||
        collection?.promoPosition3 ||
        collection?.fireworkStoryPosition
      ) {
        setBannersPositions(
          newChangeBannersPositions(
            {
              width: window?.innerWidth,
              height: window?.innerHeight,
            },
            {
              pos1: getPropValue(collection?.promoPosition1),
              pos2: getPropValue(collection?.promoPosition2),
              pos3: getPropValue(collection?.promoPosition3),
              pos4: getPropValue(collection?.fireworkStoryPosition),
            },
            filteredProducts.length
          )
        );
      }
    };

    window.addEventListener('resize', getBannersPositions);

    return () => {
      window.removeEventListener('resize', getBannersPositions);
    };
  }, []);

  function getPropValue(value){
    return (value > 0 ? value : undefined);
  }

  const titleContent = {
    title: collection.title,
    subTitle: 'show sub_title metafield here'//metafields?.find((meta) => meta.key === 'sub_title')?.value || '',
  };

  const closeModal = () => {
    dispatch({ type: 'apply' }); // function to update the collection after modal is closed
    setVisible(false);
  };

  const BestSellerProductRecommendation = () => {
    const isShortPLP = products?.length <= 10;

    if (isShortPLP) {
      const additionalProducts = collection.additionalProducts;

      if (additionalProducts?.length === 4) {
        const title = collection.additionalProductsTitle || 'while you\'re here, check out these best sellers';

        return <GenericRecommendedProducts title={title} products={additionalProducts} />;
      }
    }

    return null;
  };

  const NoResultsCollection = () => (
    <div className={'empty__container'}>
      <h2 className={'empty__header'}>NO RESULTS</h2>
      <p className={'empty__body_text'}>
          Sorry! There aren&apost any results for your selections. Please adjust your
          filters to continue.
      </p>
      <p className={'empty__body_text'}>
          Not sure where to begin? Try one of our
        <a
          className={'empty__anchor_text'}
          href="https://www.tula.com/collections/best-sellers"
        >
            best sellers.
        </a>
      </p>
    </div>
  );

  return filteredProducts.length > 0 ? (
    <div className={'plpWrapper minHeight'} >
      <section id="section" className={isInfluencerPage ? 'influencerContainer' : 'plpContainer'}>
        {visible && (
          <div
            onClick={() => closeModal()}
            style={{ height: size.height, width: size.width }}
            className={'modal__background'}
          />
        )}


        {!isInfluencerPage && (
          <Title title={titleContent} showAfterpay={cartConfig.showAfterpay}/>
        )}

        {slug === 'all' && (
          <Filter
            sorted={sortedBy}
            getSortedBy={setSortedBy}
            sortOptions={sortOptions}
            filtersOptions={filtersOptions}
            filtersQuantity={filtersQuantityCalculation(state)}
            collectionQuantity={
              visible
                ? filterProducts(products, state).length
                : filteredProducts.length
            }
            state={state}
            dispatch={dispatch}
            setVisible={setVisible}
            visible={visible}
          />
        )}

        <div className={collectionContainerStyle} ref={PLPContainer}>
          {bannersPositions &&
                banners.map((banner, idx) => { return(
                  (Object.prototype.hasOwnProperty.call(bannersPositions, `pos${idx + 1}`)) && <Banner
                    banner={banner}
                    key={idx}
                    style={bannersPositions[`pos${idx + 1}`]}
                  />
                ); })}
          <Collection products={filteredProducts} collection={collection} />
        </div>
        {BestSellerProductRecommendation()}
        {
          isInfluencerPage === false ?
            <FireWorkPLPCarousel collectionSlug={collection.slug} />
            : null
        }
        <p className={'description'}>{collection.description}</p>
        <ComparisonModal collection={collection}/>
      </section>

    </div>
  ) : (
    <section id="section" className={isInfluencerPage ? 'influencerContainer' : 'plpContainer'}>
      {visible && (
        <div
          onClick={() => closeModal()}
          style={{ height: size.height, width: size.width }}
          className={'modal__background'}
        />
      )}

      {!isInfluencerPage && (
        <Title title={titleContent} showAfterpay={cartConfig.showAfterpay}/>
      )}

      {slug === 'all' && (
        <Filter
          sorted={sortedBy}
          getSortedBy={setSortedBy}
          sortOptions={sortOptions}
          filtersOptions={filtersOptions}
          filtersQuantity={filtersQuantityCalculation(state)}
          collectionQuantity={
            visible
              ? filterProducts(products, state).length
              : filteredProducts.length
          }
          state={state}
          dispatch={dispatch}
          setVisible={setVisible}
          visible={visible}
        />
      )}

      <NoResultsCollection />

      <p className={'description'}>{collection.description}</p>
    </section>
  );
};

export default PLP;
