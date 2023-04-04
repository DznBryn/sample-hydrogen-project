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
    title
    products(first: 20){
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
				priceRange{
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        availableForSale
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
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    tags
    totalInventory
    variants(first:100) {
      nodes {
        id
        title
        availableForSale
        price {
          amount
        }
        image {
          url
          altText
          width
          height
        }
      }
    }
  }
}
`;
