/* eslint-disable quotes */
import {useState, useEffect, useRef, Fragment} from 'react';
import {useCartActions} from '~/hooks/useCart';
import {useStore} from '~/hooks/useStore';
import {useLayoutEffect} from '~/utils/functions/eventFunctions';

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

const PDPConcealerVariants = ({
  details = mockDetails,
  viewType,
  shadeVariantsOos = [],
  concealerImages = mockConcealerImages,
}) => {
  const {getProductQuantity} = useCartActions();
  const {store, setStore} = useStore();
  const [shade, setShade] = useState('');
  const [isSelected, setIsSelected] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const variantsWraperScrollTop = useRef(0);
  const variantsWraper = useRef(null);
  const [oosVariants, setOosVariants] = useState([]);

  const haveShadeRecommendation = !!store?.selectedShade;

  //

  useEffect(() => {
    resetSelectedVariant();
  }, []);

  //

  function resetSelectedVariant() {
    setStore({
      ...store,
      productPage: {
        ...store.productPage,
        selectedVariant: undefined,
        addToCart: {
          ...store?.productPage?.addToCart,
          quantity: undefined,
        },
      },
    });
  }

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

    setShade(shadeRecommended);
    setIsSelected(shadeRecommended);
    setStore({
      ...store,
      product,
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
      concealerShade: shade,
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

  const ListViewVariants = (
    shadeRecommended,
    shadeImage,
    selectedShade,
    shadeName,
  ) => {
    const currentVariantNumber = getShadeNumberByName(shadeRecommended);
    const hasOOS = oosVariants?.length > 0 ?? false;
    const isOOSVariant =
      hasOOS &&
      !!oosVariants.find(
        (oosVariant) => oosVariant.name === currentVariantNumber,
      );
    const shadeId = shadeRecommended;

    const treatedSelectedShade = isSelected?.toLowerCase();

    if (isOOSVariant) {
      return (
        <div
          className={'sfVariantItem'}
          onClick={() => handleRecommendation(shadeRecommended)}
          name={shadeId}
          id={shadeId}
          key={shadeId}
          style={{color: 'rgba(76, 78, 86, 0.2)'}}
        >
          <OOSItem />
          {shadeName}
          {treatedSelectedShade === shadeRecommended && <Selected oos />}
          {selectedShade === shadeRecommended && (
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
          name={shadeId}
          id={shadeId}
          key={shadeId}
        >
          <div
            className="shadeIcon"
            style={{
              backgroundImage: `url(${shadeImage?.desktop?.asset.url}?auto=format)`,
              height: 35,
              width: 35,
              borderRadius: 17.5,
              marginRight: 10,
              backgroundPosition: 'center',
            }}
          ></div>
          {shadeRecommended}
          {treatedSelectedShade === shadeRecommended && <Selected />}
          {selectedShade === shadeRecommended && (
            <div className={'shadeRecommendedContainer'}>
              <div className={'sf_recommendedBadge'}>RECOMMENDED</div>
            </div>
          )}
        </div>
      );
    }
  };

  const GridViewVariants = (shadeRecommended, shadeImage) => {
    const treatedSelectedShade = isSelected?.toLowerCase();
    const currentVariantNumber = getShadeNumberByName(shadeRecommended);
    const hasOOS = oosVariants?.length > 0 ?? false;
    const isOOSVariant =
      hasOOS &&
      !!oosVariants.find(
        (oosVariant) => oosVariant.name === currentVariantNumber,
      );
    const backgroundImage = isMobile
      ? shadeImage?.mobile?.asset.url + '?auto=format'
      : shadeImage?.desktop?.asset.url + '?auto=format';
    const shadeId = shadeRecommended;

    if (isOOSVariant) {
      return (
        <div
          className={'sfVariantItem'}
          onClick={() => handleRecommendation(shadeRecommended)}
          key={shadeId}
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
          key={shadeId}
          id={shadeId}
        >
          <div
            className={'sf_shadeIcon'}
            onMouseEnter={() => handleMouseEnter(shadeRecommended)}
            onMouseLeave={() => handleMouseLeave(shadeRecommended)}
            style={{
              backgroundImage: `url(${backgroundImage})`,
              height: 35,
              width: 35,
              backgroundPosition: 'center',
            }}
          >
            {isMobile && treatedSelectedShade !== shadeRecommended && (
              <>
                <HalfCircle />
                <p className={'sf_isMobile'}>
                  {getShadeNumberByName(shadeRecommended)}
                </p>
              </>
            )}
            {treatedSelectedShade !== shadeRecommended && !isMobile && (
              <p>{shadeRecommended?.split(' ')[0]}</p>
            )}
            {treatedSelectedShade === shadeRecommended && <Selected />}
          </div>
        </div>
      );
    }
  };

  const renderVariants = (shadeRecommended, selectedShade) => {
    const treatedShadeRecommended = shadeRecommended
      ?.toLowerCase()
      .replace('shade ', '');

    const treatedSelectedShade = selectedShade?.toLowerCase();

    const shadeNumber = getShadeNumberByName(treatedShadeRecommended);

    const shadeImage = concealerImages?.find(
      (image) => image.name === shadeNumber,
    );
    const shadeName = shadeRecommended?.split(' ')[1];
    if (viewType === 'LIST') {
      return ListViewVariants(
        treatedShadeRecommended,
        shadeImage,
        treatedSelectedShade,
        shadeName,
      );
    } else {
      return GridViewVariants(treatedShadeRecommended, shadeImage, shadeName);
    }
  };

  const ConcealerVariants = () => {
    const shade = store?.selectedShade?.toLowerCase();

    useLayoutEffect(() => {
      if (variantsWraper.current)
        variantsWraper.current.scrollTop = variantsWraperScrollTop.current;
    });

    useEffect(() => {
      if (viewType === 'LIST' && !!store?.selectedShade) {
        document?.getElementById(shade)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, [store?.selectedShade]);

    return (
      <>
        {viewType === 'LIST' ? (
          <div
            className={'sfVariantsContainer'}
            ref={variantsWraper}
            id="sfVariantsContainer"
          >
            {details?.variants.map(({title: shadeRecommended}) => {
              return (
                <Fragment key={shadeRecommended}>
                  {renderVariants(shadeRecommended, shade)}
                </Fragment>
              );
            })}
          </div>
        ) : (
          <div className={'sfVariantsGridContainer'}>
            <div className={'sf_rowContainer'}>
              {details?.variants.map(({title: shadeRecommended}) => {
                return (
                  <Fragment key={shadeRecommended}>
                    {renderVariants(shadeRecommended, shade)}
                  </Fragment>
                );
              })}
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
          newRecommendedShade: false,
          addToCart: {
            ...store?.productPage?.addToCart,
            quantity: 1,
            discount: 0,
          },
        },
      });
    }
  }, []);

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
      setIsSelected(store.selectedShade);
      setShade(store.selectedShade);
    }
  }, [store?.selectedShade]);

  return <ConcealerVariants />;
};

const mockDetails = {
  title: {
    name: 'brightening serum concealer',
    alt: 'radiant skin',
  },
  reviews: {
    average: 0,
    count: 0,
  },
  tags: ['hidden'],
  productImages: [
    {
      type: 'MediaImage',
      details: {
        alt: '',
        asset: {
          url: 'https://f.shgcdn.com/8914364e-9b3f-4feb-bb6d-6961cd95561a/',
        },
        name: 'hero_shade100_40370274107438.jpg',
        size: 67008,
        _type: 'image',
        width: 1024,
        height: 1272,
        mimeType: 'image/jpeg',
      },
      fileName: 'hero_shade100_40370274107438.jpg',
      externalId: 22745692340270,
      storefrontId: 'gid://shopify/MediaImage/22745692340270',
    },
    {
      type: 'MediaImage',
      details: {
        alt: '',
        asset: {
          url: 'https://f.shgcdn.com/b9db9c87-94a8-4fa4-a8dd-18dca3526a49/',
        },
        name: 'ba_shade100_40370274107438.jpg',
        size: 256437,
        _type: 'image',
        width: 1024,
        height: 1272,
        mimeType: 'image/jpeg',
      },
      fileName: 'ba_shade100_40370274107438.jpg',
      externalId: 22745692274734,
      storefrontId: 'gid://shopify/MediaImage/22745692274734',
    },
    {
      type: 'MediaImage',
      details: {
        alt: '',
        asset: {
          url: 'https://f.shgcdn.com/0b486ef2-87eb-48b0-ac92-69419c2add0f/',
        },
        name: 'clinical_shade100_40370274107438.jpg',
        size: 224229,
        _type: 'image',
        width: 1024,
        height: 1272,
        mimeType: 'image/jpeg',
      },
      fileName: 'clinical_shade100_40370274107438.jpg',
      externalId: 22745692307502,
      storefrontId: 'gid://shopify/MediaImage/22745692307502',
    },
    {
      type: 'MediaImage',
      details: {
        alt: '',
        asset: {
          url: 'https://f.shgcdn.com/33dbfbc4-2048-4dfb-8c4f-4bc14577b9c1/',
        },
        name: 'ingredient_shade100_40370274107438.jpg',
        size: 245179,
        _type: 'image',
        width: 1024,
        height: 1272,
        mimeType: 'image/jpeg',
      },
      fileName: 'ingredient_shade100_40370274107438.jpg',
      externalId: 22745692373038,
      storefrontId: 'gid://shopify/MediaImage/22745692373038',
    },
    {
      type: 'MediaImage',
      details: {
        alt: '',
        asset: {
          url: 'https://f.shgcdn.com/f2482741-bf2b-483e-b4bf-e100573ad201/',
        },
        name: 'model1_shade100_40370274107438.jpg',
        size: 279121,
        _type: 'image',
        width: 1024,
        height: 1272,
        mimeType: 'image/jpeg',
      },
      fileName: 'model1_shade100_40370274107438.jpg',
      externalId: 22745692405806,
      storefrontId: 'gid://shopify/MediaImage/22745692405806',
    },
    {
      type: 'MediaImage',
      details: {
        alt: '',
        asset: {
          url: 'https://f.shgcdn.com/a2818348-9c4a-4113-a445-b08204928d62/',
        },
        name: 'model2_shade100_40370274107438.jpg',
        size: 312719,
        _type: 'image',
        width: 1024,
        height: 1272,
        mimeType: 'image/jpeg',
      },
      fileName: 'model2_shade100_40370274107438.jpg',
      externalId: 22745692438574,
      storefrontId: 'gid://shopify/MediaImage/22745692438574',
    },
    {
      type: 'MediaImage',
      details: {
        alt: '',
        asset: {
          url: 'https://f.shgcdn.com/5da13183-5aa9-4bef-a31d-29aa9d1d5726/',
        },
        name: 'hero_shade105_40370274140206.jpg',
        size: 52110,
        _type: 'image',
        width: 1024,
        height: 1272,
        mimeType: 'image/jpeg',
      },
      fileName: 'hero_shade105_40370274140206.jpg',
      externalId: 22745695584302,
      storefrontId: 'gid://shopify/MediaImage/22745695584302',
    },
    {
      type: 'MediaImage',
      details: {
        alt: '',
        asset: {
          url: 'https://f.shgcdn.com/9b07c125-9ac8-491d-b67d-845208b52b93/',
        },
        name: 'ba_shade105_40370274140206.jpg',
        size: 261273,
        _type: 'image',
        width: 1024,
        height: 1272,
        mimeType: 'image/jpeg',
      },
      fileName: 'ba_shade105_40370274140206.jpg',
      externalId: 22745695518766,
      storefrontId: 'gid://shopify/MediaImage/22745695518766',
    },
    {
      type: 'MediaImage',
      details: {
        alt: '',
        asset: {
          url: 'https://f.shgcdn.com/15c89c1e-275e-457a-a331-5beae049dd30/',
        },
        name: 'clinical_shade105_40370274140206.jpg',
        size: 224229,
        _type: 'image',
        width: 1024,
        height: 1272,
        mimeType: 'image/jpeg',
      },
      fileName: 'clinical_shade105_40370274140206.jpg',
      externalId: 22745695551534,
      storefrontId: 'gid://shopify/MediaImage/22745695551534',
    },
    {
      type: 'MediaImage',
      details: {
        alt: '',
        asset: {
          url: 'https://f.shgcdn.com/27475d05-802d-464e-823a-2994ea9be230/',
        },
        name: 'ingredient_shade105_40370274140206.jpg',
        size: 245179,
        _type: 'image',
        width: 1024,
        height: 1272,
        mimeType: 'image/jpeg',
      },
      fileName: 'ingredient_shade105_40370274140206.jpg',
      externalId: 22745695617070,
      storefrontId: 'gid://shopify/MediaImage/22745695617070',
    },
    {
      type: 'MediaImage',
      details: {
        alt: '',
        asset: {
          url: 'https://f.shgcdn.com/29680e3e-6cc6-4bbd-b488-ea2c8d9cb525/',
        },
        name: 'model1_shade105_40370274140206.jpg',
        size: 277473,
        _type: 'image',
        width: 1024,
        height: 1272,
        mimeType: 'image/jpeg',
      },
      fileName: 'model1_shade105_40370274140206.jpg',
      externalId: 22745695649838,
      storefrontId: 'gid://shopify/MediaImage/22745695649838',
    },
    {
      type: 'MediaImage',
      details: {
        alt: '',
        asset: {
          url: 'https://f.shgcdn.com/3a1b4101-c48c-40e0-8a62-c2aa9fc62ef6/',
        },
        name: 'model2_shade105_40370274140206.jpg',
        size: 283360,
        _type: 'image',
        width: 1024,
        height: 1272,
        mimeType: 'image/jpeg',
      },
      fileName: 'model2_shade105_40370274140206.jpg',
      externalId: 22745695682606,
      storefrontId: 'gid://shopify/MediaImage/22745695682606',
    },
    {
      type: 'MediaImage',
      details: {
        alt: '',
        asset: {
          url: 'https://f.shgcdn.com/2eccc1af-01c5-411d-b04f-9d1a540101a2/',
        },
        name: 'hero_shade110_40370274172974.jpg',
        size: 60749,
        _type: 'image',
        width: 1024,
        height: 1272,
        mimeType: 'image/jpeg',
      },
      fileName: 'hero_shade110_40370274172974.jpg',
      externalId: 22745710002222,
      storefrontId: 'gid://shopify/MediaImage/22745710002222',
    },
    {
      type: 'MediaImage',
      details: {
        alt: '',
        asset: {
          url: 'https://f.shgcdn.com/6b31df38-7c4b-40bf-9e0d-f0907aca2c26/',
        },
        name: 'ba_shade110_40370274172974.jpg',
        size: 316720,
        _type: 'image',
        width: 1024,
        height: 1272,
        mimeType: 'image/jpeg',
      },
      fileName: 'ba_shade110_40370274172974.jpg',
      externalId: 22745709936686,
      storefrontId: 'gid://shopify/MediaImage/22745709936686',
    },
    {
      type: 'MediaImage',
      details: {
        alt: '',
        asset: {
          url: 'https://f.shgcdn.com/4e2f19ec-53cd-41a9-ad75-6376144bbbf8/',
        },
        name: 'clinicals_shade110_40370274172974.jpg',
        size: 224229,
        _type: 'image',
        width: 1024,
        height: 1272,
        mimeType: 'image/jpeg',
      },
      fileName: 'clinicals_shade110_40370274172974.jpg',
      externalId: 22745709969454,
      storefrontId: 'gid://shopify/MediaImage/22745709969454',
    },
    {
      type: 'MediaImage',
      details: {
        alt: '',
        src: 'https://f.shgcdn.com/a199454c-1b76-4b8d-8432-92032eefad9b/',
        name: 'ingredients_shade110_40370274172974.jpg',
        size: 245179,
        _type: 'image',
        width: 1024,
        height: 1272,
        mimeType: 'image/jpeg',
      },
      fileName: 'ingredients_shade110_40370274172974.jpg',
      externalId: 22745710034990,
      storefrontId: 'gid://shopify/MediaImage/22745710034990',
    },
    {
      type: 'MediaImage',
      details: {
        alt: '',
        src: 'https://f.shgcdn.com/354b97bf-3f09-4d03-a13c-f306d9cacc73/',
        name: 'model1_shade110_40370274172974.jpg',
        size: 368730,
        _type: 'image',
        width: 1024,
        height: 1272,
        mimeType: 'image/jpeg',
      },
      fileName: 'model1_shade110_40370274172974.jpg',
      externalId: 22745710067758,
      storefrontId: 'gid://shopify/MediaImage/22745710067758',
    },
    {
      type: 'MediaImage',
      details: {
        alt: '',
        src: 'https://f.shgcdn.com/6673da5d-c8ea-49bc-a41c-88f4beb0ade8/',
        name: 'model2_shade110_40370274172974.jpg',
        size: 320830,
        _type: 'image',
        width: 1024,
        height: 1272,
        mimeType: 'image/jpeg',
      },
      fileName: 'model2_shade110_40370274172974.jpg',
      externalId: 22745710100526,
      storefrontId: 'gid://shopify/MediaImage/22745710100526',
    },
    {
      type: 'MediaImage',
      details: {
        alt: '',
        src: 'https://f.shgcdn.com/4ae2f0de-8067-4d7e-a37c-5ec3bc6e0284/',
        name: 'hero_shade115_40370274205742.jpg',
        size: 64764,
        _type: 'image',
        width: 1024,
        height: 1272,
        mimeType: 'image/jpeg',
      },
      fileName: 'hero_shade115_40370274205742.jpg',
      externalId: 22745715933230,
      storefrontId: 'gid://shopify/MediaImage/22745715933230',
    },
    {
      type: 'MediaImage',
      details: {
        alt: '',
        src: 'https://f.shgcdn.com/0dcae7dd-ea58-49ce-99c8-a1e3fd448f58/',
        name: 'ba_shade115_40370274205742.jpg',
        size: 275638,
        _type: 'image',
        width: 1024,
        height: 1272,
        mimeType: 'image/jpeg',
      },
      fileName: 'ba_shade115_40370274205742.jpg',
      externalId: 22745715867694,
      storefrontId: 'gid://shopify/MediaImage/22745715867694',
    },
    {
      type: 'MediaImage',
      details: {
        alt: '',
        src: 'https://f.shgcdn.com/fe07bc71-f580-46db-acbb-19b30b382437/',
        name: 'clinicals_shade115_40370274205742.jpg',
        size: 224229,
        _type: 'image',
        width: 1024,
        height: 1272,
        mimeType: 'image/jpeg',
      },
      fileName: 'clinicals_shade115_40370274205742.jpg',
      externalId: 22745715900462,
      storefrontId: 'gid://shopify/MediaImage/22745715900462',
    },
    {
      type: 'MediaImage',
      details: {
        alt: '',
        src: 'https://f.shgcdn.com/dac2f77f-ef75-4953-aa81-05957b65cd9f/',
        name: 'ingredient_shade115_40370274205742.jpg',
        size: 245179,
        _type: 'image',
        width: 1024,
        height: 1272,
        mimeType: 'image/jpeg',
      },
      fileName: 'ingredient_shade115_40370274205742.jpg',
      externalId: 22745715965998,
      storefrontId: 'gid://shopify/MediaImage/22745715965998',
    },
    {
      type: 'MediaImage',
      details: {
        alt: '',
        src: 'https://f.shgcdn.com/b5f16ee5-5ab6-4082-93d1-d0b291823013/',
        name: 'model1_shade115_40370274205742.jpg',
        size: 295854,
        _type: 'image',
        width: 1024,
        height: 1272,
        mimeType: 'image/jpeg',
      },
      fileName: 'model1_shade115_40370274205742.jpg',
      externalId: 22745715998766,
      storefrontId: 'gid://shopify/MediaImage/22745715998766',
    },
    {
      type: 'MediaImage',
      details: {
        alt: '',
        src: 'https://f.shgcdn.com/0b4c4b14-1dbc-47e6-9c36-511607690599/',
        name: 'model2_shade115_40370274205742.jpg',
        size: 286052,
        _type: 'image',
        width: 1024,
        height: 1272,
        mimeType: 'image/jpeg',
      },
      fileName: 'model2_shade115_40370274205742.jpg',
      externalId: 22745716031534,
      storefrontId: 'gid://shopify/MediaImage/22745716031534',
    },
  ],
  videos: '',
  pricing: {
    minPrice: 32,
    maxPrice: 32,
    variants: [
      {
        sku: '',
        name: 'shade 100 - very light cool',
        media: [],
        price: 32,
        position: 1,
        externalId: 40370274107438,
        storefrontId:
          'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDEwNzQzOA==',
        selectedOptions: [
          {
            name: 'Shade',
            value: 'shade 100 - very light cool',
            storefrontId:
              'gid://shopify/ProductOption/8971287494702/shade 100 - very light cool',
          },
        ],
        tracksInventory: true,
      },
      {
        sku: '',
        name: 'shade 105 - very light neutral',
        media: [],
        price: 32,
        position: 2,
        externalId: 40370274140206,
        storefrontId:
          'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDE0MDIwNg==',
        selectedOptions: [
          {
            name: 'Shade',
            value: 'shade 105 - very light neutral',
            storefrontId:
              'gid://shopify/ProductOption/8971287494702/shade 105 - very light neutral',
          },
        ],
        tracksInventory: true,
      },
      {
        sku: '',
        name: 'shade 110 - light warm',
        media: [],
        price: 32,
        position: 3,
        externalId: 40370274172974,
        storefrontId:
          'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDE3Mjk3NA==',
        selectedOptions: [
          {
            name: 'Shade',
            value: 'shade 110 - light warm',
            storefrontId:
              'gid://shopify/ProductOption/8971287494702/shade 110 - light warm',
          },
        ],
        tracksInventory: true,
      },
      {
        sku: '',
        name: 'shade 115 - light cool',
        media: [],
        price: 32,
        position: 4,
        externalId: 40370274205742,
        storefrontId:
          'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDIwNTc0Mg==',
        selectedOptions: [
          {
            name: 'Shade',
            value: 'shade 115 - light cool',
            storefrontId:
              'gid://shopify/ProductOption/8971287494702/shade 115 - light cool',
          },
        ],
        tracksInventory: true,
      },
      {
        sku: '',
        name: 'shade 120 - light neutral',
        media: [],
        price: 32,
        position: 5,
        externalId: 40370274238510,
        storefrontId:
          'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDIzODUxMA==',
        selectedOptions: [
          {
            name: 'Shade',
            value: 'shade 120 - light neutral',
            storefrontId:
              'gid://shopify/ProductOption/8971287494702/shade 120 - light neutral',
          },
        ],
        tracksInventory: true,
      },
      {
        sku: '',
        name: 'shade 125 - light medium cool',
        media: [],
        price: 32,
        position: 6,
        externalId: 40370274271278,
        storefrontId:
          'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDI3MTI3OA==',
        selectedOptions: [
          {
            name: 'Shade',
            value: 'shade 125 - light medium cool',
            storefrontId:
              'gid://shopify/ProductOption/8971287494702/shade 125 - light medium cool',
          },
        ],
        tracksInventory: true,
      },
      {
        sku: '',
        name: 'shade 130 - light medium warm',
        media: [],
        price: 32,
        position: 7,
        externalId: 40370274304046,
        storefrontId:
          'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDMwNDA0Ng==',
        selectedOptions: [
          {
            name: 'Shade',
            value: 'shade 130 - light medium warm',
            storefrontId:
              'gid://shopify/ProductOption/8971287494702/shade 130 - light medium warm',
          },
        ],
        tracksInventory: true,
      },
      {
        sku: '',
        name: 'shade 135 - medium neutral',
        media: [],
        price: 32,
        position: 8,
        externalId: 40370274336814,
        storefrontId:
          'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDMzNjgxNA==',
        selectedOptions: [
          {
            name: 'Shade',
            value: 'shade 135 - medium neutral',
            storefrontId:
              'gid://shopify/ProductOption/8971287494702/shade 135 - medium neutral',
          },
        ],
        tracksInventory: true,
      },
      {
        sku: '',
        name: 'shade 140 - medium warm',
        media: [],
        price: 32,
        position: 9,
        externalId: 40370274369582,
        storefrontId:
          'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDM2OTU4Mg==',
        selectedOptions: [
          {
            name: 'Shade',
            value: 'shade 140 - medium warm',
            storefrontId:
              'gid://shopify/ProductOption/8971287494702/shade 140 - medium warm',
          },
        ],
        tracksInventory: true,
      },
      {
        sku: '',
        name: 'shade 145 - medium tan warm',
        media: [],
        price: 32,
        position: 10,
        externalId: 40370274402350,
        storefrontId:
          'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDQwMjM1MA==',
        selectedOptions: [
          {
            name: 'Shade',
            value: 'shade 145 - medium tan warm',
            storefrontId:
              'gid://shopify/ProductOption/8971287494702/shade 145 - medium tan warm',
          },
        ],
        tracksInventory: true,
      },
      {
        sku: '',
        name: 'shade 150 - medium tan neutral',
        media: [],
        price: 32,
        position: 11,
        externalId: 40370274435118,
        storefrontId:
          'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDQzNTExOA==',
        selectedOptions: [
          {
            name: 'Shade',
            value: 'shade 150 - medium tan neutral',
            storefrontId:
              'gid://shopify/ProductOption/8971287494702/shade 150 - medium tan neutral',
          },
        ],
        tracksInventory: true,
      },
      {
        sku: '',
        name: 'shade 155 - medium tan cool',
        media: [],
        price: 32,
        position: 12,
        externalId: 40370274467886,
        storefrontId:
          'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDQ2Nzg4Ng==',
        selectedOptions: [
          {
            name: 'Shade',
            value: 'shade 155 - medium tan cool',
            storefrontId:
              'gid://shopify/ProductOption/8971287494702/shade 155 - medium tan cool',
          },
        ],
        tracksInventory: true,
      },
      {
        sku: '',
        name: 'shade 160 - tan neutral cool',
        media: [],
        price: 32,
        position: 13,
        externalId: 40370274500654,
        storefrontId:
          'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDUwMDY1NA==',
        selectedOptions: [
          {
            name: 'Shade',
            value: 'shade 160 - tan neutral cool',
            storefrontId:
              'gid://shopify/ProductOption/8971287494702/shade 160 - tan neutral cool',
          },
        ],
        tracksInventory: true,
      },
      {
        sku: '',
        name: 'shade 165 - tan warm',
        media: [],
        price: 32,
        position: 14,
        externalId: 40370274533422,
        storefrontId:
          'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDUzMzQyMg==',
        selectedOptions: [
          {
            name: 'Shade',
            value: 'shade 165 - tan warm',
            storefrontId:
              'gid://shopify/ProductOption/8971287494702/shade 165 - tan warm',
          },
        ],
        tracksInventory: true,
      },
      {
        sku: '',
        name: 'shade 170 - tan neutral',
        media: [],
        price: 32,
        position: 15,
        externalId: 40370274566190,
        storefrontId:
          'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDU2NjE5MA==',
        selectedOptions: [
          {
            name: 'Shade',
            value: 'shade 170 - tan neutral',
            storefrontId:
              'gid://shopify/ProductOption/8971287494702/shade 170 - tan neutral',
          },
        ],
        tracksInventory: true,
      },
      {
        sku: '',
        name: 'shade 175 - tan deep warm',
        media: [],
        price: 32,
        position: 16,
        externalId: 40370274598958,
        storefrontId:
          'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDU5ODk1OA==',
        selectedOptions: [
          {
            name: 'Shade',
            value: 'shade 175 - tan deep warm',
            storefrontId:
              'gid://shopify/ProductOption/8971287494702/shade 175 - tan deep warm',
          },
        ],
        tracksInventory: true,
      },
      {
        sku: '',
        name: 'shade 180 - tan deep neutral',
        media: [],
        price: 32,
        position: 17,
        externalId: 40370274631726,
        storefrontId:
          'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDYzMTcyNg==',
        selectedOptions: [
          {
            name: 'Shade',
            value: 'shade 180 - tan deep neutral',
            storefrontId:
              'gid://shopify/ProductOption/8971287494702/shade 180 - tan deep neutral',
          },
        ],
        tracksInventory: true,
      },
      {
        sku: '',
        name: 'shade 185 - deep neutral cool',
        media: [],
        price: 32,
        position: 18,
        externalId: 40370274664494,
        storefrontId:
          'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDY2NDQ5NA==',
        selectedOptions: [
          {
            name: 'Shade',
            value: 'shade 185 - deep neutral cool',
            storefrontId:
              'gid://shopify/ProductOption/8971287494702/shade 185 - deep neutral cool',
          },
        ],
        tracksInventory: true,
      },
      {
        sku: '',
        name: 'shade 190 - deep cool',
        media: [],
        price: 32,
        position: 19,
        externalId: 40370274697262,
        storefrontId:
          'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDY5NzI2Mg==',
        selectedOptions: [
          {
            name: 'Shade',
            value: 'shade 190 - deep cool',
            storefrontId:
              'gid://shopify/ProductOption/8971287494702/shade 190 - deep cool',
          },
        ],
        tracksInventory: true,
      },
      {
        sku: '',
        name: 'shade 195 - deep neutral',
        media: [],
        price: 32,
        position: 20,
        externalId: 40370274730030,
        storefrontId:
          'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDczMDAzMA==',
        selectedOptions: [
          {
            name: 'Shade',
            value: 'shade 195 - deep neutral',
            storefrontId:
              'gid://shopify/ProductOption/8971287494702/shade 195 - deep neutral',
          },
        ],
        tracksInventory: true,
      },
    ],
  },
  productPromos: {},
  autoDeliveryInfo: {
    name: 'Auto Delivery Details',
    message: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'Never run out of your favorite products again with auto-delivery. Get 15% off, free shipping on every order, and 300 TULA 24-7 Rewards Points for every new subscription.  Plus, easily adjust your delivery schedule and receive order reminders before every shipment. Cancel at any time.  Learn more ',
          },
          {
            url: 'www.tula.com/pages/auto-delivery',
            type: 'link',
            children: [
              {
                text: 'here',
                underline: true,
              },
            ],
            external: true,
          },
          {
            text: '.',
          },
        ],
      },
    ],
    disableInfomessage: true,
  },
  ['selling_plans']: {
    name: 'DefaultCart',
    sellingPlans: [
      {
        name: '1 month',
        sellingPlanID: 10027054,
      },
      {
        name: '2 months',
        sellingPlanID: 10059822,
      },
      {
        name: '3 months ',
        sellingPlanID: 10092590,
      },
      {
        name: '4 months',
        sellingPlanID: 10125358,
      },
      {
        name: '5 months',
        sellingPlanID: 394526766,
      },
    ],
    showAfterpay: true,
    autoDeliveryMessage: null,
    autoDeliveryDiscount: 20,
  },
  ['variants_title']: '',
  ['variants_oos']: '',
  variants: [
    {
      sku: '',
      name: 'shade 100 - very light cool',
      media: [],
      price: 32,
      position: 1,
      externalId: 40370274107438,
      storefrontId:
        'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDEwNzQzOA==',
      selectedOptions: [
        {
          name: 'Shade',
          value: 'shade 100 - very light cool',
          storefrontId:
            'gid://shopify/ProductOption/8971287494702/shade 100 - very light cool',
        },
      ],
      tracksInventory: true,
    },
    {
      sku: '',
      name: 'shade 105 - very light neutral',
      media: [],
      price: 32,
      position: 2,
      externalId: 40370274140206,
      storefrontId:
        'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDE0MDIwNg==',
      selectedOptions: [
        {
          name: 'Shade',
          value: 'shade 105 - very light neutral',
          storefrontId:
            'gid://shopify/ProductOption/8971287494702/shade 105 - very light neutral',
        },
      ],
      tracksInventory: true,
    },
    {
      sku: '',
      name: 'shade 110 - light warm',
      media: [],
      price: 32,
      position: 3,
      externalId: 40370274172974,
      storefrontId:
        'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDE3Mjk3NA==',
      selectedOptions: [
        {
          name: 'Shade',
          value: 'shade 110 - light warm',
          storefrontId:
            'gid://shopify/ProductOption/8971287494702/shade 110 - light warm',
        },
      ],
      tracksInventory: true,
    },
    {
      sku: '',
      name: 'shade 115 - light cool',
      media: [],
      price: 32,
      position: 4,
      externalId: 40370274205742,
      storefrontId:
        'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDIwNTc0Mg==',
      selectedOptions: [
        {
          name: 'Shade',
          value: 'shade 115 - light cool',
          storefrontId:
            'gid://shopify/ProductOption/8971287494702/shade 115 - light cool',
        },
      ],
      tracksInventory: true,
    },
    {
      sku: '',
      name: 'shade 120 - light neutral',
      media: [],
      price: 32,
      position: 5,
      externalId: 40370274238510,
      storefrontId:
        'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDIzODUxMA==',
      selectedOptions: [
        {
          name: 'Shade',
          value: 'shade 120 - light neutral',
          storefrontId:
            'gid://shopify/ProductOption/8971287494702/shade 120 - light neutral',
        },
      ],
      tracksInventory: true,
    },
    {
      sku: '',
      name: 'shade 125 - light medium cool',
      media: [],
      price: 32,
      position: 6,
      externalId: 40370274271278,
      storefrontId:
        'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDI3MTI3OA==',
      selectedOptions: [
        {
          name: 'Shade',
          value: 'shade 125 - light medium cool',
          storefrontId:
            'gid://shopify/ProductOption/8971287494702/shade 125 - light medium cool',
        },
      ],
      tracksInventory: true,
    },
    {
      sku: '',
      name: 'shade 130 - light medium warm',
      media: [],
      price: 32,
      position: 7,
      externalId: 40370274304046,
      storefrontId:
        'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDMwNDA0Ng==',
      selectedOptions: [
        {
          name: 'Shade',
          value: 'shade 130 - light medium warm',
          storefrontId:
            'gid://shopify/ProductOption/8971287494702/shade 130 - light medium warm',
        },
      ],
      tracksInventory: true,
    },
    {
      sku: '',
      name: 'shade 135 - medium neutral',
      media: [],
      price: 32,
      position: 8,
      externalId: 40370274336814,
      storefrontId:
        'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDMzNjgxNA==',
      selectedOptions: [
        {
          name: 'Shade',
          value: 'shade 135 - medium neutral',
          storefrontId:
            'gid://shopify/ProductOption/8971287494702/shade 135 - medium neutral',
        },
      ],
      tracksInventory: true,
    },
    {
      sku: '',
      name: 'shade 140 - medium warm',
      media: [],
      price: 32,
      position: 9,
      externalId: 40370274369582,
      storefrontId:
        'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDM2OTU4Mg==',
      selectedOptions: [
        {
          name: 'Shade',
          value: 'shade 140 - medium warm',
          storefrontId:
            'gid://shopify/ProductOption/8971287494702/shade 140 - medium warm',
        },
      ],
      tracksInventory: true,
    },
    {
      sku: '',
      name: 'shade 145 - medium tan warm',
      media: [],
      price: 32,
      position: 10,
      externalId: 40370274402350,
      storefrontId:
        'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDQwMjM1MA==',
      selectedOptions: [
        {
          name: 'Shade',
          value: 'shade 145 - medium tan warm',
          storefrontId:
            'gid://shopify/ProductOption/8971287494702/shade 145 - medium tan warm',
        },
      ],
      tracksInventory: true,
    },
    {
      sku: '',
      name: 'shade 150 - medium tan neutral',
      media: [],
      price: 32,
      position: 11,
      externalId: 40370274435118,
      storefrontId:
        'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDQzNTExOA==',
      selectedOptions: [
        {
          name: 'Shade',
          value: 'shade 150 - medium tan neutral',
          storefrontId:
            'gid://shopify/ProductOption/8971287494702/shade 150 - medium tan neutral',
        },
      ],
      tracksInventory: true,
    },
    {
      sku: '',
      name: 'shade 155 - medium tan cool',
      media: [],
      price: 32,
      position: 12,
      externalId: 40370274467886,
      storefrontId:
        'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDQ2Nzg4Ng==',
      selectedOptions: [
        {
          name: 'Shade',
          value: 'shade 155 - medium tan cool',
          storefrontId:
            'gid://shopify/ProductOption/8971287494702/shade 155 - medium tan cool',
        },
      ],
      tracksInventory: true,
    },
    {
      sku: '',
      name: 'shade 160 - tan neutral cool',
      media: [],
      price: 32,
      position: 13,
      externalId: 40370274500654,
      storefrontId:
        'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDUwMDY1NA==',
      selectedOptions: [
        {
          name: 'Shade',
          value: 'shade 160 - tan neutral cool',
          storefrontId:
            'gid://shopify/ProductOption/8971287494702/shade 160 - tan neutral cool',
        },
      ],
      tracksInventory: true,
    },
    {
      sku: '',
      name: 'shade 165 - tan warm',
      media: [],
      price: 32,
      position: 14,
      externalId: 40370274533422,
      storefrontId:
        'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDUzMzQyMg==',
      selectedOptions: [
        {
          name: 'Shade',
          value: 'shade 165 - tan warm',
          storefrontId:
            'gid://shopify/ProductOption/8971287494702/shade 165 - tan warm',
        },
      ],
      tracksInventory: true,
    },
    {
      sku: '',
      name: 'shade 170 - tan neutral',
      media: [],
      price: 32,
      position: 15,
      externalId: 40370274566190,
      storefrontId:
        'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDU2NjE5MA==',
      selectedOptions: [
        {
          name: 'Shade',
          value: 'shade 170 - tan neutral',
          storefrontId:
            'gid://shopify/ProductOption/8971287494702/shade 170 - tan neutral',
        },
      ],
      tracksInventory: true,
    },
    {
      sku: '',
      name: 'shade 175 - tan deep warm',
      media: [],
      price: 32,
      position: 16,
      externalId: 40370274598958,
      storefrontId:
        'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDU5ODk1OA==',
      selectedOptions: [
        {
          name: 'Shade',
          value: 'shade 175 - tan deep warm',
          storefrontId:
            'gid://shopify/ProductOption/8971287494702/shade 175 - tan deep warm',
        },
      ],
      tracksInventory: true,
    },
    {
      sku: '',
      name: 'shade 180 - tan deep neutral',
      media: [],
      price: 32,
      position: 17,
      externalId: 40370274631726,
      storefrontId:
        'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDYzMTcyNg==',
      selectedOptions: [
        {
          name: 'Shade',
          value: 'shade 180 - tan deep neutral',
          storefrontId:
            'gid://shopify/ProductOption/8971287494702/shade 180 - tan deep neutral',
        },
      ],
      tracksInventory: true,
    },
    {
      sku: '',
      name: 'shade 185 - deep neutral cool',
      media: [],
      price: 32,
      position: 18,
      externalId: 40370274664494,
      storefrontId:
        'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDY2NDQ5NA==',
      selectedOptions: [
        {
          name: 'Shade',
          value: 'shade 185 - deep neutral cool',
          storefrontId:
            'gid://shopify/ProductOption/8971287494702/shade 185 - deep neutral cool',
        },
      ],
      tracksInventory: true,
    },
    {
      sku: '',
      name: 'shade 190 - deep cool',
      media: [],
      price: 32,
      position: 19,
      externalId: 40370274697262,
      storefrontId:
        'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDY5NzI2Mg==',
      selectedOptions: [
        {
          name: 'Shade',
          value: 'shade 190 - deep cool',
          storefrontId:
            'gid://shopify/ProductOption/8971287494702/shade 190 - deep cool',
        },
      ],
      tracksInventory: true,
    },
    {
      sku: '',
      name: 'shade 195 - deep neutral',
      media: [],
      price: 32,
      position: 20,
      externalId: 40370274730030,
      storefrontId:
        'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM3MDI3NDczMDAzMA==',
      selectedOptions: [
        {
          name: 'Shade',
          value: 'shade 195 - deep neutral',
          storefrontId:
            'gid://shopify/ProductOption/8971287494702/shade 195 - deep neutral',
        },
      ],
      tracksInventory: true,
    },
  ],
  ['variant_shade']: {
    ['shade_pdp_product_name']: null,
    ['shade_pdp_hardlink']: null,
    ['shade_pdp_image']: null,
    ['shade_pdp_alt_text']: null,
  },
  description:
    'Face the day your way with the concealer that lasts through every expression! This breathable, skincare-meets-makeup hybrid delivers skin-boosting benefits & high-performance medium-to-full coverage without any compromises. Infused with our unique Rainbow Seabright™ Elixir, this clinically-proven serum-like formula instantly conceals dark circles & discoloration for longwearing, crease-resistant results while brightening the appearance of skin over time. Pair it with our radiant skin serum skin tint to build your complexion wardrobe, or spot conceal for a no-makeup makeup look.Dermatologist-tested',
  descriptionHtml:
    'Face the day your way with the concealer that lasts through every expression! This breathable, skincare-meets-makeup hybrid delivers skin-boosting benefits &amp; high-performance medium-to-full coverage without any compromises. Infused with our unique Rainbow Seabright™ Elixir, this clinically-proven serum-like formula instantly conceals dark circles &amp; discoloration for longwearing, crease-resistant results while brightening the appearance of skin over time. Pair it with our radiant skin serum skin tint to build your complexion wardrobe, or spot conceal for a no-makeup makeup look.<br data-mce-fragment="1"><br data-mce-fragment="1">Dermatologist-tested',
  size: '0.18 fl.oz/ 5.40ml',
  suitableFor: '',
  tabs: [
    {
      _id: 0,
      label: "What's In & Out",
      contents: [
        {
          _id: '',
          key: '',
          namespace: '',
          value: '',
        },
        {
          _id: '',
          key: '',
          namespace: '',
          value: '',
        },
        {
          _id: '',
          key: '',
          namespace: '',
          value: '',
        },
        {
          _id: '',
          key: '',
          namespace: '',
          value: '',
        },
      ],
    },
    {
      _id: 1,
      label: 'Benefits & Results',
      contents: [
        {
          _id: '',
          key: '',
          namespace: '',
          value: '',
        },
        {
          _id: '',
          key: '',
          namespace: '',
          value: '',
        },
      ],
    },
    {
      _id: 2,
      label: 'How To Use',
      contents: [
        {
          _id: '',
          key: '',
          namespace: '',
          value: '',
        },
      ],
    },
  ],
  tabSections: {
    list: [
      'Clinical Results',
      'Benefits',
      'ingredients',
      'how to use',
      'reviews',
    ],
  },
};

const mockConcealerImages = [
  {
    name: '130',
    mobile: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/0e801dd6-1548-4e70-ba9b-688441ab31ec/',
      },
      name: '130.png',
      size: 5604,
      _type: 'image',
      width: 70,
      height: 70,
      mimeType: 'image/png',
    },
    desktop: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/7530cb17-fc69-4527-b180-949049f15063/',
      },
      name: '130.png',
      size: 6394,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
    mobileNoLabels: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/8177f7ba-66e9-4d77-96df-cdab2904f18e/',
      },
      name: '130.png',
      size: 6394,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
  },
  {
    name: '150',
    mobile: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/b0715967-6f4e-47d3-9d78-09661f1dcd37/',
      },
      name: '150.png',
      size: 7055,
      _type: 'image',
      width: 70,
      height: 70,
      mimeType: 'image/png',
    },
    desktop: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/6db9235a-6541-4fc5-823d-5fd5fbd4d1db/',
      },
      name: '150.png',
      size: 8422,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
    mobileNoLabels: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/824634e2-acb0-4e9b-943b-3e7ca29972d2/',
      },
      name: '150.png',
      size: 8422,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
  },
  {
    name: '120',
    mobile: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/698965f9-d3ea-4282-84f0-ae1cdd984e0b/',
      },
      name: '120.png',
      size: 6441,
      _type: 'image',
      width: 70,
      height: 70,
      mimeType: 'image/png',
    },
    desktop: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/5a58a7d0-f682-4720-a49f-3e68c6f9e340/',
      },
      name: '120.png',
      size: 7553,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
    mobileNoLabels: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/c89e1192-5597-4e85-a01e-e9e4f5e873c3/',
      },
      name: '120.png',
      size: 7553,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
  },
  {
    name: '100',
    mobile: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/f7645610-c44d-4bad-a895-bc1dff62a154/',
      },
      name: '100.png',
      size: 5589,
      _type: 'image',
      width: 70,
      height: 70,
      mimeType: 'image/png',
    },
    desktop: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/6e0b6cbd-cb33-47e1-946f-ccdfa6183030/',
      },
      name: '100.png',
      size: 6437,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
    mobileNoLabels: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/d4eec7d1-d730-4124-810e-e0de6692e651/',
      },
      name: '100.png',
      size: 6436,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
  },
  {
    name: '105',
    mobile: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/30221051-331c-40cc-9e98-92e92b91e7a6/',
      },
      name: '105.png',
      size: 5409,
      _type: 'image',
      width: 70,
      height: 70,
      mimeType: 'image/png',
    },
    desktop: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/8925bc8b-3fe5-46b6-a5fc-0ad573ab51bd/',
      },
      name: '105.png',
      size: 6196,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
    mobileNoLabels: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/902d08ec-52e3-4237-ac94-7c62eddf6e7d/',
      },
      name: '105.png',
      size: 6195,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
  },
  {
    name: '160',
    mobile: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/6a49e6e7-6b3a-497f-974a-215230c1b610/',
      },
      name: '160.png',
      size: 6499,
      _type: 'image',
      width: 70,
      height: 70,
      mimeType: 'image/png',
    },
    desktop: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/ece6f3ae-aabe-44a5-85d8-4749b40e17e9/',
      },
      name: '160.png',
      size: 7725,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
    mobileNoLabels: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/e82035d4-005e-4baf-84cd-9aae98de0fec/',
      },
      name: '160.png',
      size: 7725,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
  },
  {
    name: '125',
    mobile: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/52c5917f-cdd0-4729-9295-52a23b046c34/',
      },
      name: '125.png',
      size: 6390,
      _type: 'image',
      width: 70,
      height: 70,
      mimeType: 'image/png',
    },
    desktop: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/bec08fbf-a673-4145-9644-8da11696f7c9/',
      },
      name: '125.png',
      size: 7602,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
    mobileNoLabels: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/5743aa66-e529-436e-9a25-b8711849b630/',
      },
      name: '125.png',
      size: 7602,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
  },
  {
    name: '110',
    mobile: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/a18c27fc-1fb0-4291-af11-2d3df9a51653/',
      },
      name: '110.png',
      size: 4458,
      _type: 'image',
      width: 70,
      height: 70,
      mimeType: 'image/png',
    },
    desktop: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/86eac2fa-1143-46bb-8d12-f577dcd6855e/',
      },
      name: '110.png',
      size: 4915,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
    mobileNoLabels: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/3beb440e-5f7b-41b8-a606-338e2a9ea4b5/',
      },
      name: '110.png',
      size: 4915,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
  },
  {
    name: '115',
    mobile: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/d1c9656d-b782-4dd9-91c2-e1c3b38d8ac2/',
      },
      name: '115.png',
      size: 6385,
      _type: 'image',
      width: 70,
      height: 70,
      mimeType: 'image/png',
    },
    desktop: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/e6464aee-4e95-4143-8237-eadb7a18530f/',
      },
      name: '115.png',
      size: 7409,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
    mobileNoLabels: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/a9fa1a27-61fa-46fd-9d27-c89f9afe6780/',
      },
      name: '115.png',
      size: 7409,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
  },
  {
    name: '135',
    mobile: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/50d0b03a-579e-4d53-9572-58ce07b509e7/',
      },
      name: '135.png',
      size: 6227,
      _type: 'image',
      width: 70,
      height: 70,
      mimeType: 'image/png',
    },
    desktop: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/b5a7ad4d-9130-447a-94cf-cfe8582f168f/',
      },
      name: '135.png',
      size: 6971,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
    mobileNoLabels: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/8f9567be-f525-46e5-9c15-9f5558a8f87a/',
      },
      name: '135.png',
      size: 6971,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
  },
  {
    name: '140',
    mobile: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/8562f9f8-31a6-41f6-a01e-21557e6b6762/',
      },
      name: '140.png',
      size: 6693,
      _type: 'image',
      width: 70,
      height: 70,
      mimeType: 'image/png',
    },
    desktop: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/23bb260a-ae9e-4154-99ad-b03a36925516/',
      },
      name: '140.png',
      size: 7784,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
    mobileNoLabels: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/ee26dd90-5cfd-451a-adb1-874051fd5096/',
      },
      name: '140.png',
      size: 7784,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
  },
  {
    name: '145',
    mobile: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/c9f03b49-97d1-406c-887e-a795167951b4/',
      },
      name: '145.png',
      size: 5328,
      _type: 'image',
      width: 70,
      height: 70,
      mimeType: 'image/png',
    },
    desktop: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/58e19f62-76e5-4bfd-9931-5a391c7e6fec/',
      },
      name: '145.png',
      size: 5957,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
    mobileNoLabels: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/2495134e-9b3c-4936-9774-f372e8508295/',
      },
      name: '145.png',
      size: 5957,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
  },
  {
    name: '155',
    mobile: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/4fe3a1ad-3ec0-4684-910e-9a964f92346d/',
      },
      name: '155.png',
      size: 6987,
      _type: 'image',
      width: 70,
      height: 70,
      mimeType: 'image/png',
    },
    desktop: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/5b92f37c-0130-4888-8210-ad50292bec9e/',
      },
      name: '155.png',
      size: 8139,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
    mobileNoLabels: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/fe9b9644-a04c-4842-9cf0-7d6ef2ac6384/',
      },
      name: '155.png',
      size: 8139,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
  },
  {
    name: '180',
    mobile: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/4074a9fe-4d53-49eb-9f73-96e293b11a08/',
      },
      name: '180.png',
      size: 5992,
      _type: 'image',
      width: 70,
      height: 70,
      mimeType: 'image/png',
    },
    desktop: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/c17f66d8-937d-43df-9157-852f7ac7a0b4/',
      },
      name: '180.png',
      size: 7018,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
    mobileNoLabels: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/2b572581-c12d-40e0-b325-310489382e67/',
      },
      name: '180.png',
      size: 7018,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
  },
  {
    name: '185',
    mobile: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/1629a198-064b-4e64-8441-542665bb7398/',
      },
      name: '185.png',
      size: 6176,
      _type: 'image',
      width: 70,
      height: 70,
      mimeType: 'image/png',
    },
    desktop: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/f0f653de-c560-48a2-8236-542b17afbf08/',
      },
      name: '185.png',
      size: 7512,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
    mobileNoLabels: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/79b77eef-dbb0-4b47-94da-a2d27b3e55dc/',
      },
      name: '185.png',
      size: 7512,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
  },
  {
    name: '165',
    mobile: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/8f7664c6-0a80-460f-8865-929ce15c8641/',
      },
      name: '165.png',
      size: 6228,
      _type: 'image',
      width: 70,
      height: 70,
      mimeType: 'image/png',
    },
    desktop: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/fe9d10ef-53c2-4b15-a7bd-08802543e504/',
      },
      name: '165.png',
      size: 7173,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
    mobileNoLabels: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/c72fc001-43dd-44d7-aa46-2c678c6305e3/',
      },
      name: '165.png',
      size: 7173,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
  },
  {
    name: '170',
    mobile: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/1f2f6381-e9cc-4b50-978f-dd0f9d50a8cf/',
      },
      name: '170.png',
      size: 7287,
      _type: 'image',
      width: 70,
      height: 70,
      mimeType: 'image/png',
    },
    desktop: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/a9c4e0cc-6fbc-43f1-ac47-887ff657171f/',
      },
      name: '170.png',
      size: 8581,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
    mobileNoLabels: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/5d40a5fd-3576-43d0-8341-ce21a00b5fd9/',
      },
      name: '170.png',
      size: 8581,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
  },
  {
    name: '175',
    mobile: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/c351ce01-dea6-495b-ad34-f1fb909799bf/',
      },
      name: '175.png',
      size: 7225,
      _type: 'image',
      width: 70,
      height: 70,
      mimeType: 'image/png',
    },
    desktop: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/1aafd392-7d39-4a89-81ba-56a45e953725/',
      },
      name: '175.png',
      size: 8662,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
    mobileNoLabels: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/121c60b3-c022-48b0-a9e0-93b54cf731df/',
      },
      name: '175.png',
      size: 8662,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
  },
  {
    name: '195',
    mobile: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/7c859694-1ada-46a6-99bc-ffb528e2ca6c/',
      },
      name: '195.png',
      size: 7461,
      _type: 'image',
      width: 70,
      height: 70,
      mimeType: 'image/png',
    },
    desktop: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/37464e54-edbf-4e99-9b61-d426aa1f5b37/',
      },
      name: '195.png',
      size: 8672,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
    mobileNoLabels: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/b4ba3b11-16ca-47ed-8831-e70fbd2244f3/',
      },
      name: '195.png',
      size: 8672,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
  },
  {
    name: '190',
    mobile: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/3f48d32a-6678-4745-b153-a40daf10638c/',
      },
      name: '190.png',
      size: 7157,
      _type: 'image',
      width: 70,
      height: 70,
      mimeType: 'image/png',
    },
    desktop: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/7291849d-392b-43c9-9fab-d3c953541de4/',
      },
      name: '190.png',
      size: 8553,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
    mobileNoLabels: {
      alt: '',
      asset: {
        url: 'https://f.shgcdn.com/a333f67f-02ad-40ea-9904-4d1c775c0214/',
      },
      name: '190.png',
      size: 8553,
      _type: 'image',
      width: 76,
      height: 76,
      mimeType: 'image/png',
    },
  },
];

export default PDPConcealerVariants;
