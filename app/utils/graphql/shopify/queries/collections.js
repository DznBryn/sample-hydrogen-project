import {MONEY_FRAGMENT} from '../fragments';
import {flattenConnection} from '@shopify/hydrogen-react';

export async function getCollectionProducts(context, collectiontitle) {
  const {collection} = await context.storefront.query(PRODUCTS_QUERY, {
    variables: {handle: collectiontitle},
    cache: context.storefront.CacheLong(),
  });

  if (!collection) throw new Response(null, {status: 404});

  return {
    products: collection?.products
      ? flattenConnection(collection.products)
      : [],
  };
}

export async function getProductByHandle(context, handle) {
  const {product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {handle},
    cache: context.storefront.CacheLong(),
  });

  if (!product) return null;

  return {product};
}

export const COLLECTIONS_QUERY = `#graphql
  query Collections {
    collections(first: 10) {
      nodes {
        id
        title
        handle
      }
    }
  }
`;

export const PRODUCTS_QUERY = `#graphql
  query Collection($handle: String!) {
  collection(handle: $handle){
    handle
    title
    description
    metafields(identifiers:[
      { namespace: "global", key: "sub_title"},
    ]) {
      key
      value
    }
    products(first: 250){
      nodes {
        id
        title
        handle
        tags
        productType
        images(first: 2) {
          nodes {
            url
            altText
            height
            width
          }
        }
        variants(first: 10){
          nodes {
            id
            price{
              amount
            }
            compareAtPrice{
              amount
            }
          }
        }
        priceRange{
          minVariantPrice {
            ...MoneyFragment
          }
          maxVariantPrice {
            ...MoneyFragment
          }
        }
        availableForSale
        totalInventory
      }
    }
  }
}
${MONEY_FRAGMENT}
`;

export const SUBSCRIPTION_PRODUCTS_QUERY = `#graphql
  query Collection($handle: String!) {
  collection(handle: $handle){
    products(first: 250){
      nodes {
        id
        title
        handle
        tags
        images(first: 2) {
          nodes {
            id
            url
            altText
            height
            width
          }
        }
        variants(first: 25){
          nodes {
            id
            sku
            title
            image{ 
              id
              url
              altText
              height
              width    
            }
            price{
              amount
            }
            compareAtPrice{
              amount
            }
            unitPrice{
              amount
            }
            quantityAvailable
            availableForSale
          }
        }
				
      }
    }
  }
}

`;

export const PRODUCT_QUERY = `#graphql
  query Product($handle: String!) {
  product(handle: $handle) {
    id
    title
    availableForSale
    description
    descriptionHtml
    handle
    metafields(identifiers:[
      {namespace: "global", key: "size_in_oz"},
      {namespace: "global", key: "videos"},
      {namespace: "global", key: "variants-title"},
      {namespace: "global", key: "shade-pdp-hardlink"},
      {namespace: "global", key: "shade-pdp-product-name"},
      {namespace: "global", key: "shade-pdp-image"},
      {namespace: "global", key: "shade-pdp-alt-text"},
      {namespace: "global", key: "suitable_for"},
    ]){
      key
      value
    }
    images(first: 200) {
      nodes {
        id
        url
        altText
        height
        width
      }
    }
    isGiftCard
  	priceRange {
      minVariantPrice {
        ...MoneyFragment
      }
      maxVariantPrice {
        ...MoneyFragment
      }
    }
    tags
    productType
    totalInventory
    variants(first:100) {
      nodes {
        id
        title
        sku
        availableForSale
        metafields(identifiers:[
      		{namespace: "global", key: "variant-shade-selector-img"},
          {namespace: "global", key: "variant-modal-image-alt"},
        ]){
          key
          value
        }
        price {
          amount
        }
        compareAtPrice{
          amount
        }
        unitPrice{
          amount
        }
        image {
          url
          altText
          width
          height
        }
        selectedOptions{
          name
          value
        }
      }
    }
  }
}
${MONEY_FRAGMENT}
`;

export const NAV_COLLECTION_CAROUSEL = `#graphql
  query Collection($handle: String!) {
  collection(handle: $handle){
    products(first: 250){
      nodes {
        title
        handle
        images(first: 1) {
          nodes {
            url
            altText
          }
        }
      }
    }
  }
}
`;

export const HOMEPAGE_RECS_PRODUCTS_QUERY = `#graphql
  query Collection($handle: String!) {
  collection(handle: $handle){
    handle
    title
    description
    metafields(identifiers:[
      { namespace: "global", key: "sub_title"},
    ]) {
      key
      value
    }
    products(first: 4){
      nodes {
        id
        title
        handle
        tags
        productType
        images(first: 2) {
          nodes {
            url
            altText
            height
            width
          }
        }
        variants(first: 10){
          nodes {
            id
            price{
              amount
            }
          }
        }
        priceRange{
          minVariantPrice {
            ...MoneyFragment
          }
          maxVariantPrice {
            ...MoneyFragment
          }
        }
        availableForSale
        totalInventory
      }
    }
  }
}
${MONEY_FRAGMENT}
`;
