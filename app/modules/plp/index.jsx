import { useState, useEffect, useReducer, useRef, } from 'react';
import classnames from 'classnames';
import { mockCollection, mockFilterOptions, mockSortOptions, /*getBanners,*/ sortProducts, filterProducts, filterHiddenProductsByTag, handleFilterOptions, filtersQuantityCalculation, newChangeBannersPositions, } from '~/utils/functions/plpFunctionsAndSupplies';
import { triggerAnalyticsOnScroll, useLayoutEffect } from '~/utils/functions/eventFunctions';
import Filter, { links as filterStyles } from '../plpFilter';
import GenericRecommendedProducts, { links as genericRecommendedProductsStyles } from '../genericRecommendedProducts';
import Banner, { links as plpBannerStyles } from '../plpBanner';
import Title, { links as titleStyles } from '../plpTitle';
import FireWorkPLPCarousel, { links as fireWorkCarouselStyles } from '../fireWorkPLPCarousel';
import HorizontalProduct, { links as plpHorizontalProductBoxStyles } from '../plpHorizontalProductBox';
import ComparisonModal, { links as comparisonModalStyles } from '../comparisonModal';
import { useYotpo } from '~/hooks/useYotpo';

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

const PLP = ({ collection, filtersOptions, isInfluencerPage = false, cartConfig }) => {

  const {refreshWidgets} = useYotpo();

  const sortOptions = mockSortOptions;
  collection = collection || mockCollection;
  filtersOptions = filtersOptions || mockFilterOptions;

  const currentFiltersConfig = useRef({});

  let collectionContainerStyle = classnames(
    'collection__container',
    'collection__container_2Collumns'
  );

  const products = collection ? filterHiddenProductsByTag(collection.products) : [];
  const { handle: slug } = collection;
  // const { metafields = [], handle: slug } = collection;
  // const banners = getBanners(metafields); //we need to get banners from metafield 
  const banners = bannersMock;

  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

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

  function getPropValue(value) {
    return (value > 0 ? value : undefined);
  }

  const titleContent = {
    title: collection.title,
    subTitle: 'show sub_title metafield here'//metafields?.find((meta) => meta.key === 'sub_title')?.value || '',
  };

  const BestSellerProductRecommendation = () => {
    const isShortPLP = products?.length <= 10;

    if (isShortPLP) {
      const additionalProducts = collection.additionalProducts;

      if (additionalProducts?.length === 4) {
        const title = collection.additionalProductsTitle || 'while you\'re here, check out these best sellers';

        return <GenericRecommendedProducts title={title} productsSlugs={additionalProducts} />;
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

  useEffect(() => {

    refreshWidgets();

  });

  return filteredProducts.length > 0 ? (
    <div className={'plpWrapper minHeight'} >
      <section id="section" className={isInfluencerPage ? 'influencerContainer' : 'plpContainer'}>
        {!isInfluencerPage && (
          <Title title={titleContent} showAfterpay={cartConfig.showAfterpay} />
        )}

        {slug === 'all' && (
          <Filter
            sorted={sortedBy}
            getSortedBy={setSortedBy}
            sortOptions={sortOptions}
            filtersOptions={filtersOptions}
            filtersQuantity={filtersQuantityCalculation(state)}
            collectionQuantity={filteredProducts.length}
            state={state}
            dispatch={dispatch}
          />
        )}

        <div className={collectionContainerStyle} ref={PLPContainer}>
          {bannersPositions &&
            banners.map((banner, idx) => {
              return (
                (Object.prototype.hasOwnProperty.call(bannersPositions, `pos${idx + 1}`) && bannersPositions[`pos${idx + 1}`].pos <= (filteredProducts.length + 1))
                && <Banner
                  banner={banner}
                  key={idx}
                  style={bannersPositions[`pos${idx + 1}`]}
                />
              );
            })
          }
          {
            filteredProducts.length > 0
              ? filteredProducts.map((product, index) => (
                <HorizontalProduct
                  is2Columns={true}
                  product={product}
                  compareButtonConfig={{ showIt: collection.showCompareButton }}
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
              )) : null
          }
        </div>
        {BestSellerProductRecommendation()}
        {
          isInfluencerPage === false ?
            <FireWorkPLPCarousel collectionSlug={collection.handle} />
            : null
        }
        {
          collection.description && (
            <p className={'description'}>{collection.description}</p>
          )
        }
        <ComparisonModal collection={collection} />
      </section>

    </div>
  ) : (
    <section id="section" className={isInfluencerPage ? 'influencerContainer' : 'plpContainer'}>
      {!isInfluencerPage && (
        <Title title={titleContent} showAfterpay={cartConfig.showAfterpay} />
      )}

      {slug === 'all' && (
        <Filter
          sorted={sortedBy}
          getSortedBy={setSortedBy}
          sortOptions={sortOptions}
          filtersOptions={filtersOptions}
          filtersQuantity={filtersQuantityCalculation(state)}
          collectionQuantity={filteredProducts.length}
          state={state}
          dispatch={dispatch}
        />
      )}

      <NoResultsCollection />

      <p className={'description'}>{collection.description}</p>
    </section>
  );
};

export default PLP;

//we need to get BANNERS FROM METAFIELDS

const bannersMock = [
  [
    'promo-1',
    [
      {
        'namespace': 'promo-1.promo-boxes',
        'value': 'none',
        'key': 'promo-box-type',
        'storefrontId': 'gid://shopify/Metafield/21326974025774',
        '_id': '45360311-e5a1-43e5-b615-94b21158bf9d'
      },
      {
        'namespace': 'promo-1.promo-boxes',
        'value': 'https://cdn.shopify.com/s/files/1/1736/9637/t/97/assets/071923PH2PLPGoldEyeBalmmobile-1689361842723.jpg',
        'key': 'promo-box-image-mobile',
        'storefrontId': 'gid://shopify/Metafield/21326974484526',
        '_id': '010e92c8-25a8-4600-9767-1fe2a7b49fb2'
      },
      {
        'namespace': 'promo-1.promo-boxes',
        'value': 'https://cdn.shopify.com/s/files/1/1736/9637/t/97/assets/071923PH2PLPGoldEyeBalmdesktop-1689361842693.png',
        'key': 'promo-box-image-desktop',
        'storefrontId': 'gid://shopify/Metafield/21326974550062',
        '_id': 'f426f466-d0fb-4271-88e1-ce03871c072b'
      },
      {
        'namespace': 'promo-1.promo-boxes',
        'value': 'false',
        'key': 'promo-box-link-target',
        'storefrontId': 'gid://shopify/Metafield/21326974582830',
        '_id': '41462655-cfed-4863-b47a-05ce4d27165a'
      },
      {
        'namespace': 'promo-1.promo-boxes',
        'value': '/products/gold-glow-get-it',
        'key': 'promo-box-url',
        'storefrontId': 'gid://shopify/Metafield/21326974615598',
        '_id': '67ee9831-bfb1-467c-a2fb-f4ff8817d3cb'
      }
    ]
  ],
  [
    'promo-3',
    [
      {
        'namespace': 'promo-3.promo-boxes',
        'value': 'https://cdn.shopify.com/s/files/1/1736/9637/t/97/assets/060123PH1PLPPrimerUsageUSAmobile-1688055263966.jpg',
        'key': 'promo-box-image-mobile',
        'storefrontId': 'gid://shopify/Metafield/21326974156846',
        '_id': 'c8b03c8c-220b-4776-9306-1e2aa105c65c'
      },
      {
        'namespace': 'promo-3.promo-boxes',
        'value': 'https://cdn.shopify.com/s/files/1/1736/9637/t/97/assets/060123PH1PLPPrimerUsageUSAdesktop-1688055263917.png',
        'key': 'promo-box-image-desktop',
        'storefrontId': 'gid://shopify/Metafield/21326974189614',
        '_id': 'c2e1def4-6be0-4e7c-9eaf-c032466ad5d9'
      },
      {
        'namespace': 'promo-3.promo-boxes',
        'value': 'false',
        'key': 'promo-box-link-target',
        'storefrontId': 'gid://shopify/Metafield/21326974222382',
        '_id': '705bdd31-5d2a-4dc3-b258-e78528ee168a'
      },
      {
        'namespace': 'promo-3.promo-boxes',
        'value': '/products/filter-primer-tinted-blurring-primer?internal_source=plp_dnusage',
        'key': 'promo-box-url',
        'storefrontId': 'gid://shopify/Metafield/21326974255150',
        '_id': '1ce986a8-7c28-45d4-94e6-906eaefff8d1'
      },
      {
        'namespace': 'promo-3.promo-boxes',
        'value': 'none',
        'key': 'promo-box-type',
        'storefrontId': 'gid://shopify/Metafield/21326974287918',
        '_id': 'd7baa60a-d6cf-4e21-ad8e-305e001b9174'
      }
    ]
  ],
  [
    'promo-2',
    [
      {
        'namespace': 'promo-2.promo-boxes',
        'value': '/products/hydrating-day-night-cream?internal_source=plp_eg247',
        'key': 'promo-box-url',
        'storefrontId': 'gid://shopify/Metafield/21326974320686',
        '_id': 'b573180f-9354-4052-9f35-c9c746e7cd8e'
      },
      {
        'namespace': 'promo-2.promo-boxes',
        'value': 'https://cdn.shopify.com/s/files/1/1736/9637/t/97/assets/090122SITEPLPEVERGREEN247DAYANDNIGHTCREAMMOBILE-750x420-1662152903487.jpg',
        'key': 'promo-box-image-mobile',
        'storefrontId': 'gid://shopify/Metafield/21326974353454',
        '_id': 'e11a7bb7-2727-47eb-a910-9485d7c531f1'
      },
      {
        'namespace': 'promo-2.promo-boxes',
        'value': 'https://cdn.shopify.com/s/files/1/1736/9637/t/97/assets/090122SITEPLPEVERGREEN247DAYANDNIGHTCREAMDESKTOP-520x926-1662152903482.jpg',
        'key': 'promo-box-image-desktop',
        'storefrontId': 'gid://shopify/Metafield/21326974386222',
        '_id': '7ab1ffe5-ff05-4105-b682-c19da8376ee5'
      },
      {
        'namespace': 'promo-2.promo-boxes',
        'value': 'false',
        'key': 'promo-box-link-target',
        'storefrontId': 'gid://shopify/Metafield/21326974418990',
        '_id': '199db859-8749-42cb-ba38-57fe1f33ec14'
      },
      {
        'namespace': 'promo-2.promo-boxes',
        'value': 'type-1',
        'key': 'promo-box-type',
        'storefrontId': 'gid://shopify/Metafield/21326974451758',
        '_id': 'a192fe4f-aa9a-465e-9507-65095405f177'
      }
    ]
  ],
  [
    'promo-4',
    [
      {
        'namespace': 'promo-2.promo-boxes',
        'value': '/products/hydrating-day-night-cream?internal_source=plp_eg247',
        'key': 'promo-box-url',
        'storefrontId': 'gid://shopify/Metafield/21326974320686',
        '_id': 'b573180f-9354-4052-9f35-c9c746e7cd8e'
      },
      {
        'namespace': 'promo-2.promo-boxes',
        'value': 'https://cdn.shopify.com/s/files/1/1736/9637/t/97/assets/090122SITEPLPEVERGREEN247DAYANDNIGHTCREAMMOBILE-750x420-1662152903487.jpg',
        'key': 'promo-box-image-mobile',
        'storefrontId': 'gid://shopify/Metafield/21326974353454',
        '_id': 'e11a7bb7-2727-47eb-a910-9485d7c531f1'
      },
      {
        'namespace': 'promo-2.promo-boxes',
        'value': 'https://cdn.shopify.com/s/files/1/1736/9637/t/97/assets/090122SITEPLPEVERGREEN247DAYANDNIGHTCREAMDESKTOP-520x926-1662152903482.jpg',
        'key': 'promo-box-image-desktop',
        'storefrontId': 'gid://shopify/Metafield/21326974386222',
        '_id': '7ab1ffe5-ff05-4105-b682-c19da8376ee5'
      },
      {
        'namespace': 'promo-2.promo-boxes',
        'value': 'false',
        'key': 'promo-box-link-target',
        'storefrontId': 'gid://shopify/Metafield/21326974418990',
        '_id': '199db859-8749-42cb-ba38-57fe1f33ec14'
      },
      {
        'namespace': 'promo-2.promo-boxes',
        'value': 'type-1',
        'key': 'promo-box-type',
        'storefrontId': 'gid://shopify/Metafield/21326974451758',
        '_id': 'a192fe4f-aa9a-465e-9507-65095405f177'
      }
    ]
  ],
];
