import React, {useState, useEffect, useRef} from 'react';
import {getCustomer} from '~/utils/graphql/shopify/queries/customer';
import apolloClient from '~/utils/graphql/sanity/apolloClient';
import {flattenConnection, parseGid} from '@shopify/hydrogen';
import {useCartState} from '~/hooks/useCart';
import getApiKeys from './getApiKeys';
import {getProductByHandle} from '../graphql/shopify/queries/collections';
import {
  GET_ANNOUNCEMENT_HEADER,
  GET_MOBILE_NAV_BAR,
  GET_HEADER_CONFIG,
  GET_SITE_WIDE_SETTINGS,
  PRODUCT_RECOMMENDATIONS,
} from '~/utils/graphql/sanity/queries';

export const showPaymentPlanVendor = getApiKeys().CURRENT_ENV.includes('US')
  ? 'afterpay'
  : 'klarna';

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);
export const useLayoutEffect = canUseDOM ? React.useLayoutEffect : () => {};

export function bindCustomEvent(ref, dataAttr, styles) {
  ref.current.addEventListener('data-change', (e) => {
    if (e.target.getAttribute(dataAttr) === 'hide') {
      e.target.classList.remove(styles.visible);
      e.target.classList.add(styles.hidden);
      if (styles.hideCB) {
        styles.hideCB();
      }
    } else {
      e.target.classList.remove(styles.hidden);
      e.target.classList.add(styles.visible);
      if (styles.showCB) {
        styles.showCB();
      }
    }
  });
}

export function createCustomEvent() {
  if (document) {
    const customEvent = document.createEvent('MutationEvent');
    customEvent.initEvent('data-change');
    return customEvent;
  }
  return false;
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export function isInfluencerLink(link) {
  const influencerParameters = [
    'utm_source=Influencer',
    'utm_source=influencer',
  ];

  return influencerParameters.some((word) => link.includes(word));
}

export function getCookie(n) {
  let a = `; ${document.cookie}`.match(`;\\s*${n}=([^;]+)`);
  return a ? a[1] : '';
}

export function eraseCookie(name) {
  createCookie(name, '', -1);
}

export function createCookie(name, value, days, isSecure = false) {
  var expires, secure;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toGMTString();
  } else expires = '';
  if (isSecure) {
    secure = 'secure;';
  } else secure = '';
  document.cookie = name + '=' + value + expires + '; path=/; ' + secure;
}

export function appendScript(src, id = '', isDefer = true, callback) {
  var po = document.createElement('script');
  po.defer = isDefer;
  po.src = src;

  if (id !== '') po.id = id;

  if (callback) po.onload = callback;

  document.getElementsByTagName('body')[0].appendChild(po);
}

export function getMetafields(metafields) {
  let parsedFields = {};
  if (metafields !== undefined && metafields !== null) {
    metafields.map((meta) => {
      return (parsedFields[meta.key] = meta.value);
    });
  }
  return parsedFields;
}

export function isProductMetafield(product = {}, key = '') {
  return Boolean(getMetafields(product.metafields)?.[key]);
}

export function getProductMetafield(product = {}, key = '') {
  return (
    product?.metafields?.find((metafield) => metafield.key === key) ?? null
  );
}

export function handleGetProductByID(_productId, products) {
  const product = products?.find((prod) => prod.handle === _productId);
  return product;
}

export function handleProductMetafieldData(
  product = {},
  key = '',
  attribute = '',
) {
  switch (attribute.toLowerCase()) {
    case 'id':
      return isProductMetafield(product, key)
        ? getProductMetafield(product, key)._id
        : '';
    case 'key':
      return isProductMetafield(product, key)
        ? getProductMetafield(product, key).key
        : '';
    case 'namespace':
      return isProductMetafield(product, key)
        ? getProductMetafield(product, key).namespace
        : '';
    case 'value':
      return isProductMetafield(product, key)
        ? getProductMetafield(product, key).value
        : '';
    default:
      return console.log(
        `Object attribute '${attribute}' not available. Please select out of these attributes: "id","key","namespace","value" `,
      );
  }
}

export function isAutoCart(items) {
  return items
    ? items.some((item) => {
        return item?.selling_plan_allocation !== undefined;
      })
    : null;
}

export function getCartQuantity(items) {
  let quantity = 0;
  items.forEach((item) => {
    quantity += item.quantity;
  });
  return quantity;
}

export function prepProduct(product) {
  const preppedProduct = product;
  preppedProduct.media = [];
  product.images.nodes.map((image) => {
    return preppedProduct.media.push({details: {src: image}});
  });
  preppedProduct.externalId = product.id;
  preppedProduct.slug = product.handle;
  preppedProduct.name = product.title;
  for (let it = 0; it < preppedProduct.variants.length; it++) {
    preppedProduct.variants[it].price = preppedProduct.variants[it].price
      .toString()
      .replace(/00$/, '');
  }
  if (product.variants?.length > 0) {
    preppedProduct.variants[0].externalId = product?.variants[0].id;
  }

  return preppedProduct;
}

export function isInViewPort(element, callback) {
  if (element?.getBoundingClientRect()) {
    var bounding = element.getBoundingClientRect();
    if (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth) &&
      bounding.bottom - bounding.height * 0.5 <=
        (window.innerHeight || document.documentElement.clientHeight)
    ) {
      callback();
      return true;
    } else {
      return false;
    }
  }
}

export function useIsMounted() {
  const isMounted = useRef(false);
  useLayoutEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
}

export function useIsFirstRender() {
  const isFirstRender = useRef(true);
  useEffect(() => {
    setTimeout(() => {
      isFirstRender.current = false;
    }, 0);
  }, []);
  return isFirstRender;
}

export function isElementInView(el) {
  if (el?.getBoundingClientRect()) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}

export function triggerAnalyticsOnScroll(
  parentElement,
  filteredProducts,
  collection,
) {
  if (window && parentElement) {
    const rect = parentElement;
    let inViewItems = [];
    let prevItems = [];
    rect.childNodes.forEach((node, index) => {
      if (node.id && isElementInView(node)) {
        const productId = node.id.replace('product-', '');
        const prod = filteredProducts.find((item) => item.handle === productId);
        if (
          !inViewItems.find((viewItem) => viewItem.id === window.btoa(prod?.id))
        ) {
          return inViewItems.push({
            name: `${prod?.title}`,
            id: `${window.btoa(prod?.id)}`,
            price: parseFloat(
              prod?.priceRange?.minVariantPrice?.amount,
            )?.toFixed(2),
            brand: 'TULA SkinCare',
            category: `${prod?.productType}`,
            list: `${collection}`,
            position: index,
          });
        }
      }
    });
    if (window?.dataLayer && inViewItems.length > 0) {
      window.dataLayer.push({
        event: 'productImpression',
        ecommerce: {
          currencyCode: 'USD',
          impressions: inViewItems,
        },
      });
    }

    window.addEventListener('scroll', () => {
      let newInViewItems = [];

      rect.childNodes.forEach((node, index) => {
        if (node !== null) {
          if (node.id && isElementInView(node)) {
            const productId = node.id.replace('product-', '');
            const prod = filteredProducts.find(
              (item) => item.handle === productId,
            );
            if (
              !inViewItems.find(
                (viewItem) =>
                  parseInt(viewItem.id) === parseInt(prod.externalId),
              )
            ) {
              return newInViewItems.push({
                name: `${prod?.title}`,
                id: `${window.btoa(prod?.id)}`,
                price: parseFloat(
                  prod?.priceRange?.minVariantPrice?.amount,
                )?.toFixed(2),
                brand: 'TULA SkinCare',
                category: `${prod?.productType}`,
                list: `${collection}`,
                position: index,
              });
            }
          }
        }
      });

      if (newInViewItems.length !== 0) {
        if (
          window?.dataLayer &&
          JSON.stringify(prevItems) !== JSON.stringify(newInViewItems)
        ) {
          inViewItems = inViewItems.concat(newInViewItems);

          window.dataLayer.push({
            event: 'productImpression',
            ecommerce: {
              currencyCode: 'USD',
              impressions: newInViewItems,
            },
          });
        }
        prevItems = newInViewItems;
      }
    });
  }
}

async function fetchLoyaltyCustomerData(url, request) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  const customer = await response.json();

  if (!customer) {
    return null;
  }

  return customer;
}

export async function getLoyaltyCustomerData({
  url = 'https://services.tula.com/identify-customer',
  email = '',
  customerId = '',
  env = '',
  useCache = false,
}) {
  let customer = {};

  if (useCache) {
    const cachedCustomer = getCookie('customer');

    if (cachedCustomer) {
      customer = JSON.parse(cachedCustomer);

      return customer;
    }
  }

  const request = {
    user: {
      email,
      customerId,
    },
    env,
  };

  customer = await fetchLoyaltyCustomerData(url, request);

  if (!customer) {
    return 'Failed to fetch the customer';
  }

  createCookie('customer', JSON.stringify(customer));

  return customer;
}

export function triggerAnalyticsProductClick(analytics) {
  if (window?.dataLayer) {
    window.dataLayer.push({
      event: 'productClick',
      ecommerce: analytics,
    });
  }
}

export function triggerAnalyticsQuizEvents(eventType, quizID, quizType) {
  const eventFormatted =
    eventType && eventType.charAt(0).toUpperCase() + eventType.slice(1);
  const event = `skinQuiz${eventFormatted}`;

  if (window?.dataLayer) {
    window.dataLayer.push({
      event,
      ['quiz_id']: quizID,
      ['quiz_type']: quizType,
    });
  }
}

export function generateUUID() {
  let dt = new Date().getTime();

  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    },
  );

  return uuid;
}

export function getCartTotalForFreeShipping() {
  const {items, subtotalPrice} = useCartState();
  const giftCardID = getApiKeys().GIFT_CARD_ID;
  let totalPrice = subtotalPrice / 100;

  items.forEach((item) => {
    if (item.id === giftCardID) totalPrice -= item.price / 100;
  });

  return totalPrice;
}

export function getCurrency() {
  return getApiKeys().CURRENCY_SYMBOL;
}

export function triggerAnalyticsLoyaltyEvents(
  eventType,
  details = {
    source: '',
    type: '',
    product: '',
    userAcceptsMarketing: '',
    reward: '',
  },
) {
  const event = `loyalty${eventType}`;
  const obj = {event, details};

  if (window?.dataLayer) {
    window.dataLayer.push(obj);
  }
}

export function addClickEventOnWidgetElement(
  elementSelector,
  action,
  maxTries = 60,
) {
  let tries = 0;

  (function findElement() {
    tries += 1;

    const el = document.querySelector(elementSelector);

    if (el) {
      el.addEventListener('click', action);
    } else {
      if (tries <= maxTries) window.setTimeout(findElement.bind(this), 500);
    }
  })();
}

export function getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
}

/**
 *   GraphQL functions
 */

export function convertStorefrontIdToExternalId(str) {
  const result = decodeURIComponent(window?.atob(str));
  return Number(result.split('Product/')[1]);
}

export function updateListrakCart(items, token, cartLink, isAutoDelivery) {
  if (typeof window === 'object') {
    if (window._ltk?.SCA) {
      items.forEach((item) => {
        const curTotal = item.cost.totalAmount.amount;
        window._ltk.SCA.AddItemWithLinks(
          parseGid(item.merchandise.product.id).id,
          item.quantity,
          curTotal,
          item.merchandise.product.title,
          item.merchandise.image.url,
          'http://www.tula.com/' + item.merchandise.product.handle,
        );
      });

      window._ltk.SCA.Meta1 = token;
      window._ltk.SCA.CartLink = cartLink;

      if (isAutoDelivery) {
        window._ltk.SCA.Meta1 = 'Auto-Delivery';
      }

      window._ltk.SCA.Submit();
    }
  } else {
    return false;
  }
}

export function isAutoDeliveryInCart(items) {
  return (
    items?.find((item) => item?.sellingPlanAllocation?.sellingPlan?.id) ?? false
  );
}

export function getCartTotalForFreeShippingGraphQL() {
  const {items, subtotalPrice} = useCartState();
  const giftCardID = getApiKeys().GIFT_CARD_ID;
  let totalPrice = Number(subtotalPrice);
  items.forEach((item) => {
    if (
      convertStorefrontIdToExternalId(item.variant.product.id) === giftCardID
    ) {
      totalPrice -= Number(item.variant.price);
    }
  });
  return totalPrice;
}

/**
 * CMS functions
 */

export async function getCMSContent(context, query, variables) {
  const {SANITY_DATASET_DOMAIN, SANITY_CDN_DATASET_DOMAIN, SANITY_API_TOKEN} =
    context.env;
  const isPreviewMode = context.session.get('previewMode') === 'true';

  const API_URL = isPreviewMode
    ? SANITY_DATASET_DOMAIN
    : SANITY_CDN_DATASET_DOMAIN;

  const result = await apolloClient(API_URL, SANITY_API_TOKEN).query({
    query,
    variables,
  });

  return Object.values(result.data)[0];
}

export function getCMSDoc(content, docName) {
  return content.find((doc) => doc.name === docName);
}

export function getCollectionWithCMSData(
  collection,
  productsCMSData,
  collectionsCMSData,
) {
  let collectionCopy = {...collection};

  if (collectionsCMSData) {
    const collectionCMSDoc = collectionsCMSData.find(
      (data) => collectionCopy.handle === data.collectionId,
    );
    if (collectionCMSDoc) collectionCopy = {...collectionCMSDoc, ...collection};
  }

  if (collectionCopy?.products) {
    collectionCopy.products = collectionCopy?.products.map((product) => {
      const CMSData = productsCMSData?.find(
        (data) => product.handle === data.productId,
      );
      return {...product, ...CMSData};
    });
  }

  return collectionCopy;
}

export function getProductWithCMSData(product, productsCMSData) {
  const CMSData = productsCMSData.find(
    (data) => data.productId === product.handle,
  );

  return CMSData ? {...product, ...CMSData} : product;
}

export function getCMSProductsWithShopifyData(
  aProducts = [],
  shopifyAllCollection,
) {
  let newArray = [];

  if (aProducts.length > 0) {
    newArray = aProducts.map((product) => {
      const shopifyProduct = shopifyAllCollection?.products?.nodes.find(
        ({handle}) => handle === product.productId,
      );
      return {...shopifyProduct, ...product};
    });
  }

  return newArray.filter((data) => data.id); //only products found in Shopify all collection
}

export function getPageOnCMSBySlug(pagesOnCMS, slug) {
  let page = undefined;

  if (pagesOnCMS && slug)
    page = pagesOnCMS.find((data) => data.pageSlug === slug);

  return page;
}

export async function getMainNavFooterCMSData(context) {
  const [
    AnnouncementHeaders,
    MobileNavbar,
    HeaderConfig,
    SiteWideSettings,
    ProductRecommendation,
  ] = await Promise.all([
    getCMSContent(context, GET_ANNOUNCEMENT_HEADER),
    getCMSContent(context, GET_MOBILE_NAV_BAR),
    getCMSContent(context, GET_HEADER_CONFIG),
    getCMSContent(context, GET_SITE_WIDE_SETTINGS),
    getCMSContent(context, PRODUCT_RECOMMENDATIONS, {
      id: '51e2980f-ea26-4fd5-878d-cf57dfa63208',
    }),
  ]);
  const recommendations = {
    productList: [],
    name: ProductRecommendation?.name ?? '',
    title: ProductRecommendation?.title ?? '',
  };
  if (ProductRecommendation) {
    await ProductRecommendation.Products.forEach(async (product) => {
      if (product && product?.productId) {
        const response = await getProductByHandle(context, product?.productId);
        if (response)
          return recommendations.productList.push(response?.product);
      }
    });
  }

  return {
    AnnouncementHeaders,
    MobileNavbar,
    HeaderConfig,
    SiteWideSettings,
    ProductRecommendation: recommendations,
  };
}

/**
 * Shopify data functions
 */

export async function getCustomerData(context, customerAccessToken) {
  let customer = {
    id: '',
    firstName: '',
    email: '',
    phone: '',
  };

  if (typeof customerAccessToken === 'string') {
    customer = await getCustomer(context, customerAccessToken);

    customer.addresses = flattenConnection(customer.addresses);
    customer.orders = flattenConnection(customer.orders);
  }

  return customer;
}

/**
 *
 */

export function getIsLocal() {
  if (typeof window === 'object') {
    if (window.location.hostname === 'localhost') {
      return true;
    }
  }
  return false;
}

export function pushQueryParam(key, value) {
  const url = new URL(location.href);
  url.searchParams.set(key.toString(), value.toString());

  window.history.replaceState(null, null, url.search);
}
