// import {json} from '@shopify/remix-oxygen';
import {IMAGE_FRAGMENT, MONEY_FRAGMENT} from '../fragments';

export async function getCart(context, cartId) {
  const cartData = await context.storefront.query(CART_QUERY, {
    variables: {
      cartId,
      country: context.storefront?.i18n?.country,
      language: context.storefront?.i18n?.language,
    },
    cache: context.storefront.CacheNone(),
  });

  return cartData.cart;
}

const CART_FRAGMENT = `#graphql
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    buyerIdentity {
      countryCode
      customer {
        id
        email
        firstName
        lastName
        displayName
      }
      email
      phone
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          attributes {
            key
            value
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            amountPerQuantity {
              amount
              currencyCode
            }
            compareAtAmountPerQuantity {
              amount
              currencyCode
            }
          }
          sellingPlanAllocation {
            sellingPlan {
              id
            }
          }
          merchandise {
            ... on ProductVariant{
              id
              availableForSale
              compareAtPrice {
                ...MoneyFragment
              }
              price {
                ...MoneyFragment
              }
              requiresShipping
              title
              image {
                ...ImageFragment
              }
              product {
                handle
                title
                id
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
    cost {
      subtotalAmount {
        ...MoneyFragment
      }
      totalAmount {
        ...MoneyFragment
      }
      totalDutyAmount {
        ...MoneyFragment
      }
      totalTaxAmount {
        ...MoneyFragment
      }
    }
    note
    attributes {
      key
      value
    }
    discountCodes {
      code
    }
    
  }
  ${MONEY_FRAGMENT}
  ${IMAGE_FRAGMENT}
`;
export const CART_QUERY = `#graphql
  query CartQuery($cartId: ID!) {
    cart(id: $cartId){
      ...CartFragment
    }
  }
  ${CART_FRAGMENT}
`;
