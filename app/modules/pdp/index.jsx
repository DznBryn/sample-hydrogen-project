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

  const details = useRef(getDetailsObj());

  useEffect(() => {

    if (typeof window === 'object') {

      window.scrollTo(0, 0);

      if (window?.dataLayer) setUpAnalytics();
      if (window?.postscript) setUpPostscript();

    }

  }, []);

  //utils

  function setUpAnalytics() {

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

  function setUpPostscript() {

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

  function getDetailsObj() {

    function getTitleObj(key) {

      return {
        name: product.name,
        alt: handleProductMetafieldData(product, key, 'value'),
      };

    }

    function getPricingObj() {

      return (
        {
          minPrice: product.minPrice ? product.minPrice : 0,
          maxPrice: product.maxPrice ? product.maxPrice : 0,
          variants: product.variants ? product.variants : [],
        }
      );

    }

    function getVideosData() {

      return (
        isProductMetafield(product, 'videos')
          ? getProductMetafield(product, 'videos').value
          : ''
      );

    }

    function getVariantsTitle() {

      return (
        isProductMetafield(product, 'variants-title')
          ? handleProductMetafieldData(product, 'variants-title', 'value')
          : ''
      );

    }

    function getVariantsOOS() {

      return (
        isProductMetafield(product, 'variants-oos')
          ? getProductMetafield(product, 'variants-oos').value
          : ''
      );

    }

    function getVariantShadeObj() {

      const getData = (key) => (
        isProductMetafield(product, key)
          ? getProductMetafield(product, key).value
          : null
      );

      return {
        ['shade_pdp_product_name']: getData('shade-pdp-product-name'),
        ['shade_pdp_hardlink']: getData('shade-pdp-hardlink'),
        ['shade_pdp_image']: getData('shade-pdp-image'),
        ['shade_pdp_alt_text']: getData('shade-pdp-alt-text'),
      };

    }

    function getReviewsObj() {

      const getData = (key) => (
        isProductMetafield(product, key)
          ? getProductMetafield(product, key).value
          : 0
      );

      return {
        average: getData('reviews_average'),
        count: getData('reviews_count'),
      };

    }

    function getTabs() {

      const getData = (key) => ({
        _id: handleProductMetafieldData(product, key, 'id'),
        key: handleProductMetafieldData(product, key, 'key'),
        namespace: handleProductMetafieldData(product, key, 'namespace'),
        value: handleProductMetafieldData(product, key, 'value'),
      });

      return [
        {
          _id: 0,
          label: 'What\'s In & Out',
          contents: [
            getData('ingredients_list'),
            getData('free_from'),
            getData('full_ingredients_list'),
            getData('fsc-verified'),
          ],
        },
        {
          _id: 1,
          label: 'Benefits & Results',
          contents: [
            getData('benefits_text'),
            getData('results_text_right'),
          ],
        },
        {
          _id: 2,
          label: 'How To Use',
          contents: [
            getData('how_to_use_text'),
          ],
        },
      ];

    }

    function getTabsSections() {

      function getData(...keys) {

        return product.tabs?.find(tab => {
          let found = false;
          keys.forEach(key => {
            found = (tab.name.includes(key));
          });
          return found;
        });

      }

      return {
        list: ['Clinical Results', 'Benefits', 'ingredients', 'how to use', 'reviews'],
        results: getData('Result', 'clinical'),
        benefits: getData('Benefit'),
        formulate: getData('Formulate', 'ingredients'),
        howToUse: getData('HowToUse', 'how'),
      };

    }

    return {
      autoDeliveryInfo,
      title: getTitleObj('alt_title'),
      description: product.description ? product.description : '',
      descriptionHtml: product.descriptionHtml ? product.descriptionHtml : '',
      tags: product.tags ? product.tags : [],
      pricing: getPricingObj(),
      reviews: getReviewsObj(),
      videos: getVideosData(),
      productImages: product?.media ?? [],
      selling_plans: cart || {},
      size: handleProductMetafieldData(product, 'size_in_oz', 'value'),
      productPromos: product?.productPromos ? product.productPromos : {},
      suitableFor: handleProductMetafieldData(product, 'suitable_for', 'value'),
      variants: product.variants ? product.variants : [],
      variants_oos: getVariantsOOS(),
      variants_title: getVariantsTitle(),
      variant_shade: getVariantShadeObj(),
      tabs: getTabs(),
      tabSections: getTabsSections(),
    };

  }

  function getTabNames() {

    const tabNames = [];
    const tabs = [
      getTabSections('results'),
      getTabSections('benefits'),
      getTabSections('formulate'),
      getTabSections('howToUse'),
    ];

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
  }

  function getTabSections(section) {

    return details.current.tabSections[section];

  }

  //comps

  const TopSection = () => {

    function getExclusiveProductBannerVisibility() {

      return (
        exclusiveProductBannerContent?.available &&
        (exclusiveProductBannerContent?.slugWhereItShouldAppear === product?.slug)
      );

    }

    return (

      <div className={classnames('section', 'section__product_details')}>

        <div className={classnames('container', 'col_1')}>
          <PDPGallery
            productImages={details.current.productImages}
            videos={details.current.videos}
            variants={details.current.variants}
            productId={product.externalId}
            details={details.current}
            isExclusiveProduct={!!product?.exclusiveAtcColor}
          />

          {getExclusiveProductBannerVisibility() && <PDPExclusiveProductBannerRelease content={exclusiveProductBannerContent} />}
        </div>


        <div className={classnames('container', 'col_2')}>
          <PDPDetails product={product} details={details.current} shadeVariantsOos={shadeVariantsOos} concealerImages={concealerImages} />
        </div>

      </div>

    );

  };

  const ContentSection = ({ children }) => {

    return (
      <div className={classnames('section')}>
        {children}
      </div>
    );

  };

  const BottomSection = () => {

    const isGiftCard = details.current.tags.find(tag => tag.toLowerCase().replace(' ', '-') === 'gift-card');

    return (

      <ContentSection>
        {
          (!isGiftCard)
            ? (<PDPYotPo product={product} />)
            : (
              <div className={'giftcard_description__container'}>
                <div
                  className={'giftcard_description'}
                  dangerouslySetInnerHTML={{ __html: details.current.descriptionHtml }}
                />
              </div>
            )
        }
      </ContentSection>


    );

  };

  //render

  return (<>

    <TopSection />

    <ContentSection>
      <PDPMoreDetailsList data={getTabNames()} />
    </ContentSection>

    {
      getTabSections('results') && <ContentSection>
        <PDPRealResults data={getTabSections('results')} />
      </ContentSection>
    }

    {
      getTabSections('benefits') && <ContentSection>
        <PDPBenefits data={getTabSections('benefits')} />
      </ContentSection>
    }

    {
      getTabSections('formulate') && <ContentSection>
        <PDPFormulate data={getTabSections('formulate')} />
      </ContentSection>
    }

    {
      getTabSections('howToUse') && <ContentSection>
        <PDPHowToUse data={getTabSections('howToUse')} />
      </ContentSection>
    }

    <ContentSection>
      <FireWorkPDPCarousel playlist="g4P8eg" />
    </ContentSection>

    <ContentSection>
      <PDPListrakRec listrak={listrak} />
    </ContentSection>

    <BottomSection />

  </>);
};

export default PDP;