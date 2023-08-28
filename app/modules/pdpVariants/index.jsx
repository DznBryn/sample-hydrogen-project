import { useEffect, useRef } from 'react';
import { useLayoutEffect } from '~/utils/functions/eventFunctions';
import { useStore } from '~/hooks/useStore';
import SavingsBadges, { links as badgesStyles } from '../badges';
import classnames from 'classnames';

import styles from './styles.css';
import { useSearchParams } from '@remix-run/react';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...badgesStyles(),
  ];
};

const PDPVariants = ({ classes, details = {} }) => {

  const isGiftCard = useRef(details?.tags?.find(tag => tag.toLowerCase().replace(' ', '-') === 'gift-card'));
  const types = useRef(getVariantTypes(details.variants));

  const [searchParams] = useSearchParams();
  const { store, setStore } = useStore();

  useEffect(() => {

    setStoreInitialValue();

  }, []);

  function setStoreInitialValue() {

    function getSelectedVariant() {

      const isVariantsOnUrl = (searchParams.get('variant') && searchParams.get('variant') !== '');

      if (isVariantsOnUrl) {

        const variantIdOnUrl = searchParams.get('variant');
        const variant = details?.variants.find(variant => variant.id.includes(variantIdOnUrl));
        const defaultVariantId = (details?.variants.length <= 2 ? details.variants[0].id : 0);

        return variant.id || defaultVariantId;

      } else {

        return ((details.variants.length <= 3 || (details.variants.length > 3 && isGiftCard.current)) ? details.variants[0].id : 0);

      }

    }

    function getSelectedTypeSize(types = null) {

      return (types && types.find(type => type.name.toLowerCase() === 'size'));

    }

    setStore({
      ...store,
      product: details.product,
      productPage: {
        ...store?.productPage,
        types: types.current,
        selectedVariant: getSelectedVariant(),
        selectedTypeSize: getSelectedTypeSize(types.current)?.values[0] ?? null,
        addToCart: {
          ...store?.productPage?.addToCart,
          quantity: 1,
        },
      },
    });

  }

  function getVariantTypes(variants = null) {

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
            ) : types.find(type => type?.name === selectedOption?.name.toLowerCase()) ? (
              !types.find(type => type?.name === selectedOption?.name.toLowerCase())
                .values.find(v => v === selectedOption?.value) ?
                (
                  types.find(type => type?.name === selectedOption?.name.toLowerCase()).values.push(selectedOption.value)
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

    if (variants !== null) variants.forEach(variant => variant.selectedOptions && getTypes(variant.selectedOptions));

    return types;
  }

  return ((details?.variants.length > 1) && (

    <div className={classnames('variants_container', classes)}>
      {
        isGiftCard.current ? <DropdownVariants data={details} /> : <VariantsContainer data={details} /> 
      }
    </div>

  ));

};

const DropdownVariants = ({ data = null }) => {

  const cardVariantId = useRef(null);
  const { store, setStore } = useStore();
  const { variants } = data;

  function handleSelectedVariant(){

    setStore({
      ...store,
      productPage: {
        ...store.productPage,
        selectedVariant: cardVariantId.current.value,
      },
    });
  
  }

  return (

    <div className={'dropdown__variants'}>
    
      <select
        ref={cardVariantId}
        value={store?.productPage?.selectedVariant}
        onChange={handleSelectedVariant}
        onClick={handleSelectedVariant}
      >
        {
          variants.map(variant => (
            <option key={variant._id} value={variant.id}>
              {variant.title}
            </option>
          ))
        }
      </select>

    </div>

  );

};

const VariantsContainer = ({ data = null }) => {

  const { store, setStore } = useStore();
  const { variants, variants_title: variantsTitle, productPromos, variant_shade: variantShade } = data;
  const variantsWraperScrollLeft = useRef(0);
  const variantsWraper = useRef(null);

  const TypeShade = store?.productPage?.types?.find(option => option.name.toLowerCase() === 'shade');
  const TypeSize = store?.productPage?.types?.find(option => option.name.toLowerCase() === 'size');

  useLayoutEffect(() => {

    if (variantsWraper.current) variantsWraper.current.scrollLeft = variantsWraperScrollLeft.current;

  });

  const ContainerTitle = () =>
    TypeShade ? (
      <p
        className={'variant_title text_bold'}
        dangerouslySetInnerHTML={{ __html: variantsTitle }}
      />
    ) :
      !TypeShade && Boolean(TypeSize) ? (
        <p
          className={'variant_title text_bold'}
        >{'Select a size'}</p>
      ) : (
        ''
      );

  const Variants = () => {
    return (
      <div className={'variants'} ref={variantsWraper}>
        {
          Boolean(TypeShade && TypeSize) &&
          variants.map( variant =>
            variant.title.includes(store?.productPage?.selectedTypeSize) && (
              <Variant key={variant._id} variant={variant} />
            )
          )
        }
        {
          Boolean(TypeShade && !TypeSize) && (
            variants.map(variant => <Variant key={variant._id} variant={variant} />)
          )
        }
        <CustomVariant />
      </div>
    );

  };

  const Variant = ({ variant = null }) => {

    const isTypeShadeMatch = TypeShade.values.find((typeValue = null) =>
      variant.title.includes(typeValue),
    );

    const isVariantSelected = (store?.productPage?.selectedVariant === variant.id);

    const getVariantClassnames = () =>
      store?.productPage?.selectedVariant !== null
        ? isVariantSelected
          ? variant.availableForSale === false
            ? classnames('variant', 'show_variant', 'variant_selected', 'state__not_available')
            : classnames('variant', 'show_variant', 'variant_selected')
          : classnames('variant', 'show_variant')
        : classnames('variant');

    return (
      variant && (
        <div 
          className={getVariantClassnames()}
          onClick={() => {
            variantsWraperScrollLeft.current = variantsWraper.current.scrollLeft;
            // window.history.replaceState(null, null, `?variant=${variant.id}`);
            updateSearchParams(variant.id);

            setStore({
              ...store,
              productPage: {
                ...store.productPage,
                selectedVariant: variant.id,
              },
            });

          }}
        >
          <ShadeSelector
            variant={variant}
            isTypeShadeMatch={isTypeShadeMatch}
            shade={isTypeShadeMatch}
            promo={productPromos}
          />
        </div>
      )
    );
  };

  const CustomVariant = () => {

    return variantShade?.shade_pdp_product_name && (
      <a
        style={{ textDecoration: 'none' }}
        className={
          store?.productPage?.selectedVariant === 0
            ? 'variant show_variant variant_selected'
            : 'variant show_variant'
        }
        href={
          store?.product?.metafields?.find(
            (metafield) => metafield.key === 'shade-pdp-hardlink'
          )?.value || '#'
        }
        onClick={() => {
          return setStore({
            ...store,
            productPage: {
              ...store.productPage,
              selectedVariant: 0,
            },
          });
        }}>
        <div className={'variant_image__wrapper'}>
          <div className={'variant_image__container'}>
            <img
              className={'variant_image'}
              src={variantShade?.shade_pdp_image}
              alt={variantShade?.shade_pdp_alt_text}
            />
          </div>
        </div>
        <div className={'variant_details__container'}>
          <div className={'variant_text__container'}>
            <p className={'variant_text'}>
              {variantShade.shade_pdp_product_name.split('-')[0]}
            </p>
            <p className={'variant_text text_bold'}>
              {variantShade.shade_pdp_product_name.replace(' ', '').split('-')[1]}
            </p>
          </div>
          <div className={'variant_info__container'}>
            <IconOutlink color='#666' />
          </div>
        </div>
      </a>
    );

  };

  return (
    <>
      <ContainerTitle />
      <Variants />
      <SizeVariants data={data} />
    </>
  );
};

const SizeVariants = ({ data }) => {
  const { store, setStore } = useStore();
  const { variants = null, productPromos } = data;
  const TypeShade = store?.productPage?.types?.find(option => option.name.toLowerCase() === 'shade');
  const TypeSize = store?.productPage?.types?.find(option => option.name.toLowerCase() === 'size');

  function getCurrentVariantShade(variantId = null){

    return variantId && (
      variants.find(variant => variant.id === variantId)
    );

  }
  
  function getShadeName(){

    const shade = TypeShade?.values && (
      TypeShade?.values?.find(
        (type = null) =>
          getCurrentVariantShade(store?.productPage?.selectedVariant)?.title &&
          getCurrentVariantShade(store?.productPage?.selectedVariant)?.title?.includes(type),
      )
    );
    

    return shade;

  }

  function handleVariantChange(size){
  
    return getShadeName() && (
    
      variants.find(
        (variant = null) =>
          variant && variant.title.includes(getShadeName()) && variant.title.includes(size),
      )
    
    );
  
  }

  const enablePromo = (size) => {
    let value = false;
    productPromos?.variantIds.forEach((promoVariant) => {

      if (variants.find(variant => variant.id === Number(promoVariant))) {
        const trimSize = size.split('-')[0].replace(' ', '').toLowerCase();
        const item = variants.find(variant => variant.id === Number(promoVariant));
        value = item.name.toLowerCase().includes(trimSize) ? true : false;
      }
    });

    return value;
  };

  const SizesWithShades = () => {

    const handleSelectedSize = (size = null) => {

      if(getShadeName()){

        return setStore({
          ...store,
          productPage: {
            ...store.productPage,
            selectedVariant: handleVariantChange(size).id,
            selectedTypeSize: size,
          },
        });

      }
    };

    return (
      <div className={'variants_size_container'}>
        {(TypeSize && getShadeName()) ? (
          <div className={'variant__size'}>
            {TypeSize.values.map((size, id) => {
              const variantSize = size.replace(/^\s/g, '').split('-');

              return (
                <div
                  key={id}
                  className={
                    store?.productPage?.selectedTypeSize === size
                      ? 'variant__size_option size__selected'
                      : 'variant__size_option'
                  }
                  onClick={() => handleSelectedSize(size)}
                >
                  <p className={'option_text'}>
                    <span className={'text_bold'}>{variantSize[0]}</span> - {variantSize[1]}
                    <br />
                    {productPromos?.showPromo &&
                      enablePromo(size)
                      && (
                        <span className={'promo'}>{productPromos.promoMessage}</span>
                      )}

                  </p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  };

  const SizesWithoutShades = () => (

    <div className={'variants_size_container'}>
      {variants.map((variant) => (
        <div
          key={variant.id}
          className={classnames(
            (
              store?.productPage?.selectedVariant === variant.id
                ? 'variant__size_option size__selected'
                : 'variant__size_option'
            ),
            (
              variant.title.toLowerCase().includes('jumbo')
                ? 'variant__size_option--expand'
                : undefined
            )
          )}
          onClick={() => {
            // window.history.replaceState(null, null, `?variant=${variant.id}`);
            updateSearchParams(variant.id);

            return setStore({
              ...store,
              productPage: {
                ...store.productPage,
                selectedVariant: variant.id,
                selectedTypeSize: variant.title,
              },
            });
          }}
        >
          <p className={'option_text'}>
            {variant.title.toLowerCase().includes('jumbo') ?
              (<>
                <span className={'text_bold text_color--pink'}>New size!</span> {' '}
              </>)
              : null} {' '}
            <span className={'text_bold'}>{variant.title}</span>
            <br />
            {
              productPromos?.showPromo &&
              parseInt(
                productPromos?.variantIds?.find(
                  variantId => parseInt(variantId) === variant.id,
                ),
              ) === variant.id &&
              (
                <span className={'promo'}>{productPromos.promoMessage}</span>
              )
            }
          </p>
          {
            variant.title.toLowerCase().includes('jumbo') ?
              <SavingsBadges message={'SAVE 35%'} /> : null
          }
        </div>
      ))}
    </div>
  );

  return variants ? (
    variants.length > 2 && (TypeSize?.values?.length && TypeSize.values.length <= 2) ? (
      <SizesWithShades />
    ) : TypeSize?.values?.length && TypeSize?.values?.length > 1 && TypeSize.values.length <= 3 ? (
      <SizesWithoutShades />
    ) : variants.length > 1 && variants.length <= 2 ? (
      <SizesWithoutShades />
    ) : null
  ) : null;
};

const IconOutlink = ({ color = '#979797' }) => {
  return (
    <svg role="img" viewBox="0 0 14 14"><title>Outlink</title><path d="M11.2 1.4l-5 5c-.3.3-.3.8 0 1.1s.8.3 1.1 0l5-5v1.7a.68.68 0 0 0 .7.7.68.68 0 0 0 .7-.7V.7c0-.2-.1-.4-.2-.5-.2-.1-.4-.2-.6-.2H9.5c-.3 0-.6.3-.6.7a.68.68 0 0 0 .7.7h1.6zm2.4 6.8V4.9v7c0 .9-.7 1.7-1.5 1.7H1.5c-.8 0-1.5-.8-1.5-1.7V1.7C0 .8.7 0 1.5 0h7.3-3.4a.68.68 0 0 1 .7.7.68.68 0 0 1-.7.7H1.8c-.2 0-.4.2-.4.5v10c0 .2.2.5.4.5h10.1c.2 0 .4-.2.4-.5V8.2a.68.68 0 0 1 .7-.7c.4 0 .6.3.6.7h0z" fillRule="evenodd" fill={color} /></svg>
  );
};

const ShadeSelector = ({variant, isTypeShadeMatch, productPromos}) => {

  return (<>

    <ShadeVariantImage variant={variant} isTypeShadeMatch={isTypeShadeMatch} />
    <ShadeVariant
      variant={variant}
      isTypeShadeMatch={isTypeShadeMatch}
      shade={isTypeShadeMatch}
      promo={productPromos}
    />

  </>);

};

const ShadeVariantImage = ({ variant = null, isTypeShadeMatch = null }) => {
  return (
    (isTypeShadeMatch && (
      <div className={'variant_image__wrapper'}>
        {
          (variant !== {} && variant.availableForSale === false) &&
          <div className={'variant_image__overlay'}>
            <p>
              Out of stock
              <br />
              in this size
            </p>
          </div>
        }
        <div
          className={
            variant.availableForSale === false
              ? 'variant_image__container state__not_available'
              : 'variant_image__container'
          }
        >
          <img
            className={'variant_image'}
            src={
              variant?.metafields?.find(meta => meta.key === 'variant-shade-selector-img')?.value ||
              'https://cdn.shopify.com/s/files/1/1736/9637/t/97/assets/deep-2x-1619041327161.png' //MOCK
            }
            alt={
              variant?.metafields?.find(meta => meta.key === 'variant-modal-image-alt')?.value ||
              'https://cdn.shopify.com/s/files/1/1736/9637/t/97/assets/deep-2x-1619041327161.png' //MOCK
            }
          />
        </div>
      </div>
    )) ||
    null
  );
};

const ShadeVariant = ({ variant = {}, isTypeShadeMatch = null, promos = null }) => {

  let shade = isTypeShadeMatch?.replace(/^\s/g, '').split('-');

  if (shade?.length !== 2) {
    shade = shade?.value?.replace(/^\s/g, '').split(' ');
  }

  return (
    (isTypeShadeMatch && (
      <div className={'variant_details__container'}>
        <div className={'variant_text__container'}>
          {shade[0] ? (
            <p
              className={
                variant.title.includes('So ')
                  ? 'variant_text text_bold'
                  : 'variant_text'
              }
            >
              {shade[0]}
            </p>
          ) : (
            ''
          )}
          {shade[1] && !variant.title.includes('So ') ? (
            <p className={'variant_text text_bold'}>{shade[1]}</p>
          ) : (
            ''
          )}
          {
            promos?.showPromo &&
            promos?.promoVariants.find(variantId => parseInt(variantId) === variant.id) && (
              <span className={'promo'}>{promos?.variantPromoMessage}</span>
            )
          }
        </div>
      </div>
    )) ||
    null
  );
};

function updateSearchParams(id){

  window.history.replaceState(null, null, `?variant=${getFormatedID(id)}`);

}

function getFormatedID(id){

  const exceptNums = /[^0-9]/g;
  return id.replace(exceptNums, '');

}

export default PDPVariants;