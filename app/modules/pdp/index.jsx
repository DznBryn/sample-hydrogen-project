import { useEffect, useRef } from 'react';
import classnames from 'classnames';
import {
  isProductMetafield,
  getProductMetafield,
  handleProductMetafieldData,
} from '~/utils/functions/eventFunctions';
import getApiKeys from '~/utils/functions/getApiKeys';
import PDPGallery, { links as pdpGalleryStyles } from '../pdpGallery';
import PDPDetails, { links as pdpDetailsStyles } from '../pdpDetails';
import PDPMoreDetailsList, { links as pdpMoreDetailsListStyles } from '../pdpMoreDetailsList';
import PDPRealResults, { links as pdpRealResultsStyles } from '../pdpRealResults';
import PDPExclusiveProductBannerRelease, { links as pdpExclusiveProductBannerReleaseStyles } from '../pdpExclusiveProductBannerRelease';
import PDPBenefits, { links as pdpBenefitsStyles } from '../pdpBenefits';
import PDPFormulate, { links as pdpFormulateStyles } from '../pdpFormulate';
import PDPHowToUse, { links as pdpHowToUseStyles } from '../pdpHowToUse';
import PDPListrakRec, { links as pdpListrakRecStyles } from '../pdpListrakRec';
import PDPYotPo, { links as pdpYotPoStyles } from '../pdpYotPo';
import FireWorkPDPCarousel, { links as fireWorkPDPCarouselStyles } from '../fireWorkPDPCarousel';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...pdpGalleryStyles(),
    ...pdpDetailsStyles(),
    ...pdpMoreDetailsListStyles(),
    ...pdpRealResultsStyles(),
    ...pdpExclusiveProductBannerReleaseStyles(),
    ...pdpBenefitsStyles(),
    ...pdpFormulateStyles(),
    ...pdpHowToUseStyles(),
    ...pdpListrakRecStyles(),
    ...pdpYotPoStyles(),
    ...fireWorkPDPCarouselStyles(),
  ];
};

const PDP = ({
  product = {},
  cart = {},
  listrak,
  autoDeliveryInfo,
  shadeVariantsOos,
  exclusiveProductBannerContent,
  concealerImages
}) => {

  const details = useRef({
    title: {
      name: product.name,
      alt: handleProductMetafieldData(product, 'alt_title', 'value'),
    },
    reviews: {
      average: isProductMetafield(product, 'reviews_average')
        ? getProductMetafield(product, 'reviews_average').value
        : 0,
      count: isProductMetafield(product, 'reviews_count')
        ? getProductMetafield(product, 'reviews_count').value
        : 0,
    },
    tags: product.tags ? product.tags : [],
    productImages: product?.media ?? [],
    pricing: {
      minPrice: product.minPrice ? product.minPrice : 0,
      maxPrice: product.maxPrice ? product.maxPrice : 0,
      variants: product.variants ? product.variants : [],
    },
    productPromos: product?.productPromos ? product.productPromos : {},
    autoDeliveryInfo,
    videos: isProductMetafield(product, 'videos')
      ? getProductMetafield(product, 'videos').value
      : '',
    ['selling_plans']: cart || {},
    ['variants_title']: isProductMetafield(product, 'variants-title')
      ? handleProductMetafieldData(product, 'variants-title', 'value')
      : '',
    ['variants_oos']: isProductMetafield(product, 'variants-oos')
      ? getProductMetafield(product, 'variants-oos').value
      : '',
    variants: product.variants ? product.variants : [],
    ['variant_shade']: {
      ['shade_pdp_product_name']: isProductMetafield(product, 'shade-pdp-product-name')
        ? getProductMetafield(product, 'shade-pdp-product-name').value
        : null,
      ['shade_pdp_hardlink']: isProductMetafield(product, 'shade-pdp-hardlink')
        ? getProductMetafield(product, 'shade-pdp-hardlink').value
        : null,
      ['shade_pdp_image']: isProductMetafield(product, 'shade-pdp-image')
        ? getProductMetafield(product, 'shade-pdp-image').value
        : null,
      ['shade_pdp_alt_text']: isProductMetafield(product, 'shade-pdp-alt-text')
        ? getProductMetafield(product, 'shade-pdp-alt-text').value
        : null,
    },
    description: product.description ? product.description : '',
    descriptionHtml: product.descriptionHtml ? product.descriptionHtml : '',
    size: handleProductMetafieldData(product, 'size_in_oz', 'value'),
    suitableFor: handleProductMetafieldData(product, 'suitable_for', 'value'),
    tabs: [
      {
        _id: 0,
        label: 'What\'s In & Out',
        contents: [
          {
            _id: handleProductMetafieldData(product, 'ingredients_list', 'id'),
            key: handleProductMetafieldData(product, 'ingredients_list', 'key'),
            namespace: handleProductMetafieldData(product, 'ingredients_list', 'namespace'),
            value: handleProductMetafieldData(product, 'ingredients_list', 'value'),
          },
          {
            _id: handleProductMetafieldData(product, 'free_from', 'id'),
            key: handleProductMetafieldData(product, 'free_from', 'key'),
            namespace: handleProductMetafieldData(product, 'free_from', 'namespace'),
            value: handleProductMetafieldData(product, 'free_from', 'value'),
          },
          {
            _id: handleProductMetafieldData(product, 'full_ingredients_list', 'id'),
            key: handleProductMetafieldData(product, 'full_ingredients_list', 'key'),
            namespace: handleProductMetafieldData(product, 'full_ingredients_list', 'namespace'),
            value: handleProductMetafieldData(product, 'full_ingredients_list', 'value'),
          },
          {
            _id: handleProductMetafieldData(product, 'fsc-verified', 'id'),
            key: handleProductMetafieldData(product, 'fsc-verified', 'key'),
            namespace: handleProductMetafieldData(product, 'fsc-verified', 'namespace'),
            value: handleProductMetafieldData(product, 'fsc-verified', 'value'),
          },
        ],
      },
      {
        _id: 1,
        label: 'Benefits & Results',
        contents: [
          {
            _id: handleProductMetafieldData(product, 'benefits_text', 'id'),
            key: handleProductMetafieldData(product, 'benefits_text', 'key'),
            namespace: handleProductMetafieldData(product, 'benefits_text', 'namespace'),
            value: handleProductMetafieldData(product, 'benefits_text', 'value'),
          },
          {
            _id: handleProductMetafieldData(product, 'results_text_right', 'id'),
            key: handleProductMetafieldData(product, 'results_text_right', 'key'),
            namespace: handleProductMetafieldData(product, 'results_text_right', 'namespace'),
            value: handleProductMetafieldData(product, 'results_text_right', 'value'),
          },
        ],
      },
      {
        _id: 2,
        label: 'How To Use',
        contents: [
          {
            _id: handleProductMetafieldData(product, 'how_to_use_text', 'id'),
            key: handleProductMetafieldData(product, 'how_to_use_text', 'key'),
            namespace: handleProductMetafieldData(product, 'how_to_use_text', 'namespace'),
            value: handleProductMetafieldData(product, 'how_to_use_text', 'value'),
          },
        ],
      },
    ],
    tabSections: {
      list: ['Clinical Results', 'Benefits', 'ingredients', 'how to use', 'reviews'],
      results: product.tabs?.find(tab => {
        return tab.name.includes('Result') || tab.name.toLowerCase().includes('clinical');
      }),
      benefits: product.tabs?.find(tab => {
        return tab.name.includes('Benefit');
      }),
      formulate: product.tabs?.find(tab => {
        return tab.name.includes('Formulate') || tab.name.toLowerCase().includes('ingredients');
      }),
      howToUse: product.tabs?.find(tab => {
        return tab.name.includes('HowToUse') || tab.name.toLowerCase().includes('how');
      }),
    },
  });

  useEffect(() => {
    window && window.scrollTo(0, 0);
    if (window?.dataLayer) {
      window.dataLayer.push({
        event: 'productDetailView',
        ecommerce: {
          currencyCode: 'USD',
          detail: {
            products: [
              {
                name: `${product?.title}`,
                id: `${product.id}`,
                price: `${parseFloat(product?.priceRange?.minVariantPrice?.amount)?.toFixed(2)}`,
                brand: 'TULA Skincare',
                category: `${product.productType}`,
                variant: `${details.current.variants[0].externalId}`,
                quantity: 1,
              },
            ],
          },
        },
      });
    }
  }, []);


  useEffect(() => {
    if (window?.postscript) {
      window.postscript.event('page_view', {
        'shop_id': getApiKeys().POSTSCRIPT.shopId, // your Postscript Shop ID
        'url': window.location.href, // the current page
        'search_params': { 'variant': `${details.current.variants[0].externalId}` },
        'page_type': 'product',
        'referrer': document.referrer, // the referring page
        'resource': { // information about the product
          'category': `${product.type}`,
          'name': `${product.name}`,
          'price_in_cents': `${product.minPrice}`,
          'resource_id': `${details.current.variants[0].externalId}`,
          'resource_type': 'product',
          'sku': `${details.current.variants[0].sku}`,
          'variant_id': `${details.current.variants[0].externalId}`,
          'vendor': 'TULA Skincare'
        }
      });
    }
  }, []);


  const RenderSections = ({ components = null }) =>
    components &&
    components.map(({ classes = '', component }) => (
      <div className={classnames('section', classes)} key={component}>{component}</div>
    ));

  const getTabNames = (tabs = []) => {
    const tabNames = [];

    tabs.length > 0 &&
      tabs.forEach(
        tab =>
          tab?.tabName &&
          tabNames.push({
            id: tab.tabName.replace(/\s/g, ''),
            name: tab.tabName,
          }),
      );

    return tabNames;
  };

  const exclusiveProductBannerVisibility = exclusiveProductBannerContent?.available && (exclusiveProductBannerContent?.slugWhereItShouldAppear === product?.slug);

  const components = [
    {
      classes: `${'section__product_details'}`,
      component: (
        <>
          <div className={classnames('container', 'col_1')}>
            <PDPGallery
              productImages={details.current.productImages}
              videos={details.current.videos}
              variants={details.current.variants}
              productId={product.externalId}
              details={details.current}
              isExclusiveProduct={!!product?.exclusiveAtcColor}
            />

            {exclusiveProductBannerVisibility && <PDPExclusiveProductBannerRelease content={exclusiveProductBannerContent} />}
          </div>


          <div className={classnames('container', 'col_2')}>
            <PDPDetails product={product} details={details.current} shadeVariantsOos={shadeVariantsOos} concealerImages={concealerImages} />
          </div>
        </>
      ),
    },
    {
      classes: '',
      component: (
        <PDPMoreDetailsList
          data={getTabNames([
            details.current.tabSections['results'],
            details.current.tabSections['benefits'],
            details.current.tabSections['formulate'],
            details.current.tabSections['howToUse'],
          ])}
        />
      ),
    },
    {
      classes: '',
      component: details.current.tabSections['results'] && (
        <PDPRealResults data={details.current.tabSections['results']} />
      ),
    },
    {
      classes: '',
      component: details.current.tabSections['benefits'] && (
        <PDPBenefits data={details.current.tabSections['benefits']} />
      ),
    },
    {
      classes: '',
      component: details.current.tabSections['formulate'] && (
        <PDPFormulate data={details.current.tabSections['formulate']} />
      ),
    },
    {
      classes: '',
      component: details.current.tabSections['howToUse'] && (
        <PDPHowToUse data={details.current.tabSections['howToUse']} />
      ),
    },
    {
      classes: '',
      component: <FireWorkPDPCarousel playlist="g4P8eg" />,
    },
    {
      classes: '',
      component: <PDPListrakRec listrak={listrak} />
    },
    {
      classes: '',
      component:
        !details.current.tags.find(tag => tag.toLowerCase().replace(' ', '-') === 'gift-card') ? (<PDPYotPo product={product} />)
          : (
            <div className={'giftcard_description__container'}>
              <div
                className={'giftcard_description'}
                dangerouslySetInnerHTML={{ __html: details.current.descriptionHtml }}
              />
            </div>
          ),
    },
  ];

  return (
    (product && (
      <div id={'pdpWrapper'} className="minHeight">
        <div className={classnames('page__container')}>{RenderSections({ components })}</div>
      </div>
    )) ||
    null
  );
};

export default PDP;