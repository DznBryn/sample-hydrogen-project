import {useState, useEffect, useRef, Fragment} from 'react';
import {useLayoutEffect} from '~/utils/functions/eventFunctions';
import {useCartActions} from '~/hooks/useCart';
import {useStore} from '~/hooks/useStore';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

export const isArrayEmpty = (array = [], value = 0) =>
  Array.isArray(array) && array.length > value;

export const getVariantTypes = (variants = null) => {
  const types = [];
  const getTypes = (selectedOptions = null) => {
    selectedOptions &&
      selectedOptions.forEach((selectedOption = null) => {
        if (selectedOption) {
          types.length <= 0 ? (
            types.push({
              name: selectedOption.name.toLowerCase(),
              values: [selectedOption.value],
            })
          ) : types.find(
              (type) => type?.name === selectedOption?.name.toLowerCase(),
            ) ? (
            !types
              .find((type) => type?.name === selectedOption?.name.toLowerCase())
              .values.find((v) => v === selectedOption?.value) ? (
              types
                .find(
                  (type) => type?.name === selectedOption?.name.toLowerCase(),
                )
                .values.push(selectedOption.value)
            ) : (
              <></>
            )
          ) : (
            types.push({
              name: selectedOption.name.toLowerCase(),
              values: [selectedOption.value],
            })
          );
        }
      });
  };

  if (variants !== null) {
    variants.forEach(
      (variant) => variant.selectedOptions && getTypes(variant.selectedOptions),
    );
  }

  return types;
};

const Selected = ({oos = false}) => (
  <div className={'sf_selected'}>
    {!oos && (
      <svg
        width="11"
        height="9"
        viewBox="0 0 11 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 1.21524L9.88322 0L3.83709 6.58218L1.11678 3.62026L0 4.83605L3.82692 9L11 1.21524Z"
          fill="white"
        />
      </svg>
    )}
  </div>
);

const OOSItem = ({gridView}) => (
  <svg
    width="37"
    height="37"
    viewBox="0 0 37 37"
    fill="none"
    style={{marginRight: gridView ? 0 : 10}}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1143_8013)">
      <path
        d="M35 17.5C35 20.9612 33.9736 24.3446 32.0507 27.2225C30.1278 30.1003 27.3947 32.3434 24.197 33.6679C20.9993 34.9924 17.4806 35.339 14.0859 34.6637C10.6913 33.9885 7.57306 32.3218 5.12564 29.8744C2.67822 27.427 1.01151 24.3088 0.336265 20.9141C-0.338976 17.5194 0.00758243 14.0007 1.33212 10.803C2.65665 7.60534 4.89967 4.87221 7.77753 2.94928C10.6554 1.02636 14.0388 2.86067e-06 17.5 2.86067e-06C19.7985 -0.0013117 22.0747 0.450442 24.1985 1.32943C26.3223 2.20843 28.252 3.49742 29.8773 5.1227C31.5026 6.74799 32.7916 8.6777 33.6706 10.8015C34.5496 12.9253 35.0013 15.2015 35 17.5Z"
        fill="#65442E"
        fillOpacity="0.3"
      />
      <path
        d="M29.8411 5.00024L5.35504 30.0151"
        stroke="white"
        strokeOpacity="0.9"
        strokeWidth="2"
      />
    </g>
    <defs>
      <clipPath id="clip0_1143_8013">
        <rect width="37" height="37" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const PDPVariants = ({details = {}, viewType, shadeVariantsOos = []}) => {
  const {getProductQuantity} = useCartActions();
  const {store, setStore} = useStore();
  const [shade, setShade] = useState('');
  const [isSelected, setIsSelected] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const variantsWraperScrollTop = useRef(0);
  const variantsWraper = useRef(null);
  const [oosVariants, setOosVariants] = useState([]);

  const haveShadeRecommendation = !!store?.selectedShade;

  const types = useRef(getVariantTypes(details.variants));

  const handleRecommendation = (shadeRecommended) => {
    const shadeNumber = getShadeNumberByName(shadeRecommended);

    const product = details?.variants?.find(
      (variant) => variant?.title.split(' ')[1] === shadeNumber,
    );

    const selectedShade = shadeNumber;
    const selectedVariant = product.id;

    if (viewType === 'LIST') {
      variantsWraperScrollTop.current = variantsWraper.current.scrollTop;
    }

    // setShade(shadeRecommended);
    setIsSelected(shadeRecommended);
    setStore({
      ...store,
      productPage: {
        ...store.productPage,
        selectedShade,
        selectedVariant,
        addToCart: {
          ...store?.productPage?.addToCart,
          quantity: 1,
          discount: 0,
        },
      },
    });
  };

  const handleMouseEnter = (hoveredShade) => {
    if (isSelected) {
      return;
    }
    setShade(hoveredShade);
  };

  const handleMouseLeave = () => {
    const {selectedShade} = store;

    if (haveShadeRecommendation) {
      setShade(selectedShade);
    }

    if (isSelected) {
      setShade(isSelected);
      return;
    }

    setShade('');
  };

  const getShadeNumberByName = (shadeName) => {
    return shadeName?.split(' ')[0] ?? '';
  };

  const ListViewVariants = (shadeRecommended, shadeBackground) => {
    const currentVariantNumber = getShadeNumberByName(shadeRecommended);
    const hasOOS = oosVariants?.length > 0 ?? false;
    const isOOSVariant =
      hasOOS &&
      !!oosVariants.find(
        (oosVariant) => oosVariant.name === currentVariantNumber,
      );
    if (isOOSVariant) {
      return (
        <div
          className={'sfVariantItem'}
          onClick={() => handleRecommendation(shadeRecommended)}
          name={shadeRecommended}
          id={shadeRecommended}
          key={shadeRecommended}
          style={{color: 'rgba(76, 78, 86, 0.2)'}}
        >
          <OOSItem />
          {shadeRecommended}
          {isSelected === shadeRecommended && <Selected oos />}
          {shade === shadeRecommended && (
            <div className={'shadeRecommendedContainer'}>
              <div className={'sf_recommendedBadge'}>RECOMMENDED</div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div
          onClick={() => handleRecommendation(shadeRecommended, true)}
          className={'sfVariantItem'}
          name={shadeRecommended}
          id={shadeRecommended}
          key={shadeRecommended}
        >
          <div
            className={'sf_shadeIcon'}
            style={{background: `${shadeBackground}`, marginRight: 10}}
          ></div>
          {shadeRecommended}
          {isSelected === shadeRecommended && <Selected />}
          {shade === shadeRecommended && (
            <div className={'shadeRecommendedContainer'}>
              <div className={'sf_recommendedBadge'}>RECOMMENDED</div>
            </div>
          )}
        </div>
      );
    }
  };

  const GridViewVariants = (shadeRecommended, shadeBackground) => {
    const currentVariantNumber = getShadeNumberByName(shadeRecommended);
    const hasOOS = oosVariants?.length > 0 ?? false;
    const isOOSVariant =
      hasOOS &&
      !!oosVariants.find(
        (oosVariant) => oosVariant.name === currentVariantNumber,
      );
    if (isOOSVariant) {
      return (
        <div
          className={'sfVariantItem'}
          onClick={() => handleRecommendation(shadeRecommended)}
          key={shadeRecommended}
        >
          <OOSItem gridView />
          {isSelected === shadeRecommended && <Selected oos />}
        </div>
      );
    } else {
      return (
        <div
          onClick={() => handleRecommendation(shadeRecommended)}
          className={'sfVariantItem'}
          key={shadeRecommended}
        >
          <div
            className={'sf_shadeIcon'}
            onMouseEnter={() => handleMouseEnter(shadeRecommended)}
            onMouseLeave={() => handleMouseLeave(shadeRecommended)}
            style={{background: `${shadeBackground}`, height: 35, width: 35}}
          >
            {isMobile && isSelected !== shadeRecommended && (
              <>
                <HalfCircle />
                <p className={'sf_isMobile'}>
                  {getShadeNumberByName(shadeRecommended)}
                </p>
              </>
            )}
            {isSelected !== shadeRecommended && !isMobile && (
              <p>{getShadeNumberByName(shadeRecommended)}</p>
            )}
            {isSelected === shadeRecommended && <Selected />}
          </div>
        </div>
      );
    }
  };

  const renderVariants = (shadeRecommended, shadeBackground, selectedShade) => {
    if (viewType === 'LIST') {
      return ListViewVariants(shadeRecommended, shadeBackground, selectedShade);
    } else {
      return GridViewVariants(shadeRecommended, shadeBackground, selectedShade);
    }
  };

  const ShadeFinderVariants = () => {
    const {selectedShade} = store;

    useLayoutEffect(() => {
      if (variantsWraper.current)
        variantsWraper.current.scrollTop = variantsWraperScrollTop.current;
    });

    useEffect(() => {
      const recommended = store?.productPage?.recommendedShade;
      if (viewType === 'LIST' && !!recommended) {
        document.getElementById(recommended).scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, [store?.productPage?.recommendedShade]);

    const shadeVariantsSorted = mockedShadeResult.sort(
      (a, b) =>
        a.shadeRecommended.split(' - ')[0] - b.shadeRecommended.split(' - ')[0],
    );

    return (
      <>
        {viewType === 'LIST' ? (
          <div
            className={'sfVariantsContainer'}
            ref={variantsWraper}
            id="sfVariantsContainer"
          >
            {shadeVariantsSorted.map(({shadeRecommended, shadeBackground}) => {
              return (
                <Fragment key={shadeRecommended}>
                  {renderVariants(
                    shadeRecommended,
                    shadeBackground,
                    selectedShade,
                  )}
                </Fragment>
              );
            })}
          </div>
        ) : (
          <div className={'sfVariantsGridContainer'}>
            <div className={'sf_rowContainer'}>
              {shadeVariantsSorted.map(
                ({shadeRecommended, shadeBackground}) => {
                  return (
                    <Fragment key={shadeRecommended}>
                      {renderVariants(
                        shadeRecommended,
                        shadeBackground,
                        selectedShade,
                      )}
                    </Fragment>
                  );
                },
              )}
            </div>
            <div className={'sf_shade'}>{shade}</div>
          </div>
        )}
      </>
    );
  };

  useEffect(() => {
    if (window?.innerWidth && window?.innerWidth < 600) {
      setIsMobile(true);
    }

    const product = details.product;

    if (!store.product) {
      setStore({
        ...store,
        product,
        productPage: {
          ...store.productPage,
          addToCart: {
            ...store?.productPage?.addToCart,
            quantity: 1,
            discount: 0,
          },
        },
      });
    }

    if (store.productPage?.recommendedShade && shade === '') {
      const {recommendedShade} = store.productPage;
      setShade(recommendedShade);
      // setIsSelected(recommendedShade);
      // handleRecommendation(recommendedShade);
    }
  }, [store.productPage?.recommendedShade]);

  const shadeVariantsOOOS = shadeVariantsOos[0]?.storefrontId ?? [];

  const checkOOS = async () => {
    const variantIdsToBeSearched = [];
    const oosItems = [];
    if (shadeVariantsOOOS.length > 0) {
      shadeVariantsOOOS.forEach((variant) => {
        const data = details?.variants?.find((v) => v.storefrontId === variant);
        if (data && data.storefrontId) {
          variantIdsToBeSearched.push({
            name: data.name.split(' ')[1],
            storefrontId: data.storefrontId,
          });
        }
      });

      if (variantIdsToBeSearched.length > 0) {
        for (const variant of variantIdsToBeSearched) {
          const quantity = await getProductQuantity({id: variant.storefrontId});
          if (quantity === 0) {
            oosItems.push(variant);
          }
        }

        setOosVariants((prevStore) => [...prevStore, ...oosItems]);
      }
    }
  };

  useEffect(() => {
    async function getOOS() {
      await checkOOS();
    }

    getOOS();
    if (
      details?.variants &&
      isArrayEmpty(details?.variants, 0) &&
      !!store?.selectedShade
    ) {
      const shadeNumber = getShadeNumberByName(store?.selectedShade);
      const variant = details?.variants?.find(
        (variant) => variant.name.split(' ')[1] === shadeNumber,
      );
      const {externalId} = variant;
      setIsSelected(store.selectedShade);
      setShade(store.selectedShade);
      setStore({
        ...store,
        productPage: {
          ...store?.productPage,
          types: types.current,
          selectedVariant: externalId,
          selectedVariantId: externalId,
          selectedTypeSize: null,
        },
      });
    }
  }, [store?.selectedShade]);

  return <ShadeFinderVariants />;
};

const mockedShadeResult = [
  {
    shadeRecommended: '30 - Deep Neutral',
    shadeBackground: '#38241D',
    externalId: 40872242806957,
  },
  {
    shadeRecommended: '29 - Deep Cool',
    shadeBackground: 'rgba(65, 36, 31, 1)',
    externalId: 40872242872493,
  },
  {
    shadeRecommended: '28 - Deep Neutral Cool',
    shadeBackground: '#552C07',
    externalId: 40872242938029,
  },
  {
    shadeRecommended: '27 - Deep Neutral Warm',
    shadeBackground: '#65442E',
    externalId: 40872243003565,
  },
  {
    shadeRecommended: '26 - Deep Warm',
    shadeBackground: '#60350A',
    externalId: 40872243003565,
  },
  {
    shadeRecommended: '25 - Tan/Deep Neutral',
    shadeBackground: '#6E4218',
    externalId: 40872243003565,
  },
  {
    shadeRecommended: '24 - Tan/Deep Cool',
    shadeBackground: '#895B3D',
    externalId: 40872243003565,
  },
  {
    shadeRecommended: '23 - Tan/Deep Olive',
    shadeBackground: '#8C5D3D',
    externalId: 40872243003565,
  },
  {
    shadeRecommended: '22 - Tan Cool',
    shadeBackground: '#966540',
    externalId: 40872243003565,
  },
  {
    shadeRecommended: '21 - Tan Neutral',
    shadeBackground: '#9A6D4F',
    externalId: 40872243003565,
  },
  {
    shadeRecommended: '20 - Tan Neutral Cool',
    shadeBackground: '#AE795B',
    externalId: 40872243003565,
  },
  {
    shadeRecommended: '19 - Tan Warm',
    shadeBackground: '#A9805E',
    externalId: 40872243003565,
  },
  {
    shadeRecommended: '18 - Medium/Tan Olive',
    shadeBackground: '#946634',
    externalId: 40872243003565,
  },
  {
    shadeRecommended: '17 - Medium/Tan Neutral',
    shadeBackground: '#B2896E',
    externalId: 40872243003565,
  },
  {
    shadeRecommended: '16 - Medium/Tan Warm',
    shadeBackground: '#BC8E69',
    externalId: 40872243003565,
  },
  {
    shadeRecommended: '15 - Medium Neutral Cool',
    shadeBackground: '#B18A75',
    externalId: 40872243003565,
  },
  {
    shadeRecommended: '14 - Medium Neutral',
    shadeBackground: '#B28D71',
    externalId: 40872243003565,
  },
  {
    shadeRecommended: '13 - Medium Cool',
    shadeBackground: '#A78163',
    externalId: 40872243003565,
  },
  {
    shadeRecommended: '12 - Medium Warm',
    shadeBackground: '#BD977A',
    externalId: 40872243003565,
  },
  {
    shadeRecommended: '11 - Light/Medium Neutral',
    shadeBackground: '#BA9980',
    externalId: 40872243003565,
  },
  {
    shadeRecommended: '10 - Light/Medium Olive',
    shadeBackground: '#B79C8A',
    externalId: 40872243003565,
  },
  {
    shadeRecommended: '09 - Light/Medium Warm',
    shadeBackground: '#D1B298',
    externalId: 40872243003565,
  },
  {
    shadeRecommended: '08 - Light/Medium Cool',
    shadeBackground: '#DCB195',
    externalId: 40872243003565,
  },
  {
    shadeRecommended: '07 - Light Neutral Warm',
    shadeBackground: '#DBB595',
    externalId: 40872243003565,
  },
  {
    shadeRecommended: '06 - Light Cool',
    shadeBackground: '#DEB197',
    externalId: 40872243003565,
  },
  {
    shadeRecommended: '05 - Light Neutral',
    shadeBackground: '#DBBCA5',
    externalId: 40872243003565,
  },
  {
    shadeRecommended: '04 - Light Warm',
    shadeBackground: '#E4C8B6',
    externalId: 40872243003565,
  },
  {
    shadeRecommended: '03 - Very Light Warm',
    shadeBackground: '#EDCCB6',
    externalId: 40872243003565,
  },
  {
    shadeRecommended: '02 - Very Light Cool',
    shadeBackground: '#EEC9B2',
    externalId: 40872243003565,
  },
  {
    shadeRecommended: '01 - Very Light Neutral',
    shadeBackground: '#F2D1B8',
    externalId: 40872243003565,
  },
];

const HalfCircle = () => (
  <div className={'sf_halfCircle'}>
    <svg
      width="36"
      height="11"
      viewBox="0 0 36 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.9"
        d="M35.1216 0.240479C33.5706 3.46456 31.1407 6.18519 28.1117 8.08928C25.0827 9.99338 21.5777 11.0036 17.9999 11.0036C14.4221 11.0036 10.9171 9.99338 7.88805 8.08928C4.85905 6.18519 2.42922 3.46456 0.878174 0.240479H35.1216Z"
        fill="white"
      />
    </svg>
  </div>
);

export default PDPVariants;
