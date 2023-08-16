import { useEffect, useRef } from 'react';
import { useLayoutEffect } from '~/utils/functions/eventFunctions';
import { useStore } from '~/hooks/useStore';
import SavingsBadges, { links as badgesStyles } from '../badges';
import classnames from 'classnames';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...badgesStyles(),
  ];
};

export const isArrayEmpty = (array = [], value = 0) => Array.isArray(array) && array.length > value;

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
          ) : types.find(type => type?.name === selectedOption?.name.toLowerCase()) ? (
            !types
              .find(type => type?.name === selectedOption?.name.toLowerCase())
              .values.find(v => v === selectedOption?.value) ? (
                types
                  .find(type => type?.name === selectedOption?.name.toLowerCase())
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
    variants.forEach(variant => variant.selectedOptions && getTypes(variant.selectedOptions));
  }

  return types;
};

const VariantAvailable = ({ variant = null, children }) =>
  variant !== {} && variant.availableForSale === false ? (
    <div className={'variant_image__overlay'}>{children}</div>
  ) : null;

const ShadeVariantImage = ({ variant = null, isTypeShadeMatch = null }) => {
  return (
    (isTypeShadeMatch && (
      <div className={'variant_image__wrapper'}>
        <VariantAvailable variant={variant}>
          <p>
            Out of stock
            <br />
            in this size
          </p>
        </VariantAvailable>
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
              ' '
            }
            alt={
              variant?.metafields?.find(meta => meta.key === 'variant-modal-image-alt')?.value ||
              ' '
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
          {promos?.showPromo &&
            promos?.promoVariants.find(variantId => parseInt(variantId) === variant.id) && (
            <span className={'promo'}>{promos?.variantPromoMessage}</span>
          )}
        </div>
      </div>
    )) ||
    null
  );
};

const SizeVariants = ({ data }) => {
  const {store, setStore} = useStore();
  const { variants = null, productPromos } = data;
  const TypeShade = store?.productPage?.types?.find(option => option.name.toLowerCase() === 'shade');
  const TypeSize = store?.productPage?.types?.find(option => option.name.toLowerCase() === 'size');

  const getCurrentVariantShade = (variantId = null) =>
    variantId && variants.find(variant => variant.id === variantId);
  const getShadeName = () =>
    TypeShade?.values &&
    TypeShade?.values?.find(
      (type = null) =>
        getCurrentVariantShade(store?.productPage?.selectedVariant)?.name &&
        getCurrentVariantShade(store?.productPage?.selectedVariant)?.name?.includes(type),
    );

  const handleVariantChange = size =>
    getShadeName() &&
    variants.find(
      (variant = null) =>
        variant && variant.title.includes(getShadeName()) && variant.title.includes(size),
    );

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
      return setStore({
        ...store,
        productPage: {
          ...store.productPage,
          selectedVariant: handleVariantChange(size).id,
          selectedTypeSize: size,
        },
      });
    };

    return (
      <div className={'variants_size_container'}>
        {TypeSize ? (
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
          className={
            `
                    ${store?.productPage?.selectedVariant === variant.id
          ? 'variant__size_option size__selected'
          : 'variant__size_option'
        }
                        ${variant.title.toLowerCase().includes('jumbo') && 'variant__size_option--expand'}`
          }
          onClick={() => {
            window.history.replaceState(null, null, `?variant=${variant.id}`);

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
            {productPromos?.showPromo &&
              parseInt(
                productPromos?.variantIds?.find(
                  variantId => parseInt(variantId) === variant.id,
                ),
              ) === variant.id && (
              <span className={'promo'}>{productPromos.promoMessage}</span>
            )}
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

const DropdownVariants = ({ data = null }) => {
  const cardVariantId = useRef(null);
  const {store, setStore} = useStore();
  const { variants } = data;

  const handleSelectedVariant = () =>
    setStore({
      ...store,
      productPage: {
        ...store.productPage,
        selectedVariant: parseInt(cardVariantId.current.value),
      },
    });

  return (
    <div className={'dropdown__variants'}>
      <select
        ref={cardVariantId}
        value={store?.productPage?.selectedVariant}
        onChange={handleSelectedVariant}
        onClick={handleSelectedVariant}
      >
        {variants.map(variant => (
          <option key={variant._id} value={variant.id}>
            {variant.title}
          </option>
        ))}
      </select>
    </div>
  );
};

const VariantsContainer = ({ data = null }) => {
  const {store, setStore} = useStore();
  const { variants, variants_title: variantsTitle, productPromos, variant_shade: variantShade } = data;
  const TypeShade = store?.productPage?.types?.find(option => option.name.toLowerCase() === 'shade');
  const TypeSize = store?.productPage?.types?.find(option => option.name.toLowerCase() === 'size');

  const variantsWraperScrollLeft = useRef(0);
  const variantsWraper = useRef(null);

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
        {Boolean(TypeShade && TypeSize) &&
          variants.map(
            variant =>
              variant.title.includes(store?.productPage?.selectedTypeSize) && (
                <Variant key={variant._id} variant={variant} />
              ),
          )}
        {Boolean(TypeShade && !TypeSize) &&
          variants.map(variant => <Variant key={variant._id} variant={variant} />)}
        <CustomVariant />
      </div>
    );

  };

  const Variant = ({ variant = null }) => {
    const isTypeShadeMatch = TypeShade.values.find((typeValue = null) =>
      variant.title.includes(typeValue),
    );

    const getVariantClassnames = () =>
      store?.productPage?.selectedVariant !== null
        ? store?.productPage?.selectedVariant === variant.id
          ? variant.availableForSale === false
            ? classnames(
              'variant',
              'show_variant',
              'variant_selected',
              'state__not_available',
            )
            : classnames('variant', 'show_variant', 'variant_selected')
          : classnames('variant', 'show_variant')
        : classnames('variant');

    return (
      variant && (
        <div
          className={getVariantClassnames()}
          onClick={() => {

            variantsWraperScrollLeft.current = variantsWraper.current.scrollLeft;

            window.history.replaceState(null, null, `?variant=${variant.id}`);

            return setStore({
              ...store,
              productPage: {
                ...store.productPage,
                selectedVariant: variant.id,
              },
            });
          }}
        >
          <ShadeVariantImage variant={variant} isTypeShadeMatch={isTypeShadeMatch} />
          <ShadeVariant
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

const PDPVariants = ({ classes, details = {} }) => {
  const isGiftCard = useRef(
    details?.tags?.find(tag => tag.toLowerCase().replace(' ', '-') === 'gift-card'),
  );

  const types = useRef(getVariantTypes(details.variants));

  const {store, setStore} = useStore();

  useEffect(() => {

    if (details?.variants) {
      window.location.search.includes('?variant=') &&
        window.location.search.replace('?variant=', '') !== ''
        ? getParamsVariantId(window.location.search.replace('?variant=', ''))
        : store?.productPage?.addToCart?.selling_plan_id && store.productPage.addToCart.selling_plan_id !== 0 ?
          setStore({
            ...store,
            productPage: {
              ...store?.productPage,
              types: types.current,
              selectedVariant: (details.variants.length <= 3 || (details.variants.length > 3 && isGiftCard.current)) ? details.variants[0].id : 0,
              selectedTypeSize: getSelectedTypeSize(types.current)?.values[0] ?? null,
              addToCart: {
                ...store?.productPage?.addToCart,
                ['selling_plan_id']: 0,
                discount: 0,
              },
            },
          })
          : setStore({
            ...store,
            productPage: {
              ...store?.productPage,
              types: types.current,
              selectedVariant: (details.variants.length <= 3 || (details.variants.length > 3 && isGiftCard.current)) ? details.variants[0].id : 0,
              selectedTypeSize: getSelectedTypeSize(types.current)?.values[0] ?? null,
            },
          });

    }
  }, []);


  const getSelectedTypeSize = (types = null) =>
    types && types.find(type => type.name.toLowerCase() === 'size');

  const getParamsVariantId = (variantId) => {
    const isVariantExist = Boolean(
      details?.variants.find(variant => variant.id === variantId),
    );

    return isVariantExist
      ? setStore({
        ...store,
        productPage: {
          ...store.productPage,
          types: types.current,
          selectedVariant: variantId,
          selectedTypeSize: getSelectedTypeSize(types.current)?.values[0] ?? null,
        },
      })
      : setStore({
        ...store,
        productPage: {
          ...store.productPage,
          types: types.current,
          selectedVariant: details?.variants.length <= 2 ? details.variants[0].id : 0,
          selectedTypeSize: getSelectedTypeSize(types.current)?.values[0] ?? null,
        },
      });
  };

  return (
    ((details?.variants && (details?.variants.length > 1)) && (
      <div className={classnames('variants_container', classes)}>
        {!isGiftCard.current ? (
          <VariantsContainer data={details} />
        ) : (
          <DropdownVariants data={details} />
        )}
      </div>
    )) || <></>
  );
};

const IconOutlink = ({ color = '#979797'}) => {
  return (
    <svg role="img" viewBox="0 0 14 14"><title>Outlink</title><path d="M11.2 1.4l-5 5c-.3.3-.3.8 0 1.1s.8.3 1.1 0l5-5v1.7a.68.68 0 0 0 .7.7.68.68 0 0 0 .7-.7V.7c0-.2-.1-.4-.2-.5-.2-.1-.4-.2-.6-.2H9.5c-.3 0-.6.3-.6.7a.68.68 0 0 0 .7.7h1.6zm2.4 6.8V4.9v7c0 .9-.7 1.7-1.5 1.7H1.5c-.8 0-1.5-.8-1.5-1.7V1.7C0 .8.7 0 1.5 0h7.3-3.4a.68.68 0 0 1 .7.7.68.68 0 0 1-.7.7H1.8c-.2 0-.4.2-.4.5v10c0 .2.2.5.4.5h10.1c.2 0 .4-.2.4-.5V8.2a.68.68 0 0 1 .7-.7c.4 0 .6.3.6.7h0z" fillRule="evenodd" fill={color}/></svg>
  );
};

export default PDPVariants;