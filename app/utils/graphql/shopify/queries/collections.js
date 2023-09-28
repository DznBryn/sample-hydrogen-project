import {MONEY_FRAGMENT} from '../fragments';
import {flattenConnection} from '@shopify/hydrogen-react';

export async function getCollectionProducts(context, collectiontitle) {
  const {collection} = await context.storefront.query(PRODUCTS_QUERY, {
    variables: {handle: collectiontitle},
  });

  if (!collection) throw new Response(null, {status: 404});

  return {
    products: collection?.products
      ? flattenConnection(collection.products)
      : [],
  };
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
    descriptionHtml
    products(first: 250){
      nodes {
        id
        title
        handle
        tags
        productType
        createdAt
        images(first: 2) {
          nodes {
            id
            url
            altText
            height
            width
          }
        }
        variants(first: 10){
          nodes {
            id
            sku
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

export const PRODUCT_QUERY = `#graphql
  query Product($handle: String!) {
  product(handle: $handle) {
    id
    title
    availableForSale
    description
    descriptionHtml
    handle
    images(first: 50) {
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
