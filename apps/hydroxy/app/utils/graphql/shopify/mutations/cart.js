import {IMAGE_FRAGMENT, MONEY_FRAGMENT} from '../fragments';

export async function cartCreate({input, storefront}) {
  const {cartCreate} = await storefront.mutate(CREATE_CART_MUTATION, {
    variables: {input},
  });

  return cartCreate;
}

export async function cartAddItems({cartId, lines, storefront}) {
  const {cartLinesAdd} = await storefront.mutate(ADD_LINES_MUTATION, {
    variables: {cartId, lines},
  });

  return cartLinesAdd;
}

export async function cartRemoveItems({cartId, lineIds, storefront}) {
  const {cartLinesRemove} = await storefront.mutate(
    REMOVE_LINE_ITEMS_MUTATION,
    {
      variables: {
        cartId,
        lineIds,
      },
    },
  );

  if (!cartLinesRemove) {
    throw new Error('No data returned from remove lines mutation');
  }
  return cartLinesRemove;
}

export async function cartUpdate({cartId, lines, storefront}) {
  const {cartLinesUpdate} = await storefront.mutate(
    UPDATE_LINE_ITEMS_MUTATION,
    {
      variables: {
        cartId,
        lines,
      },
    },
  );

  if (!cartLinesUpdate) {
    throw new Error('No data returned from update line items mutation');
  }

  return cartLinesUpdate;
}

export async function cartUpdateCustomerIdentity({
  cartId,
  buyerIdentity,
  storefront,
}) {
  const {cartBuyerIdentityUpdate} = await storefront.mutate(UPDATE_CART_BUYER, {
    variables: {
      cartId,
      buyerIdentity,
    },
  });

  if (!cartBuyerIdentityUpdate) {
    throw new Error(
      'No data returned from cart buyer identity update mutation',
    );
  }

  return cartBuyerIdentityUpdate;
}

export async function cartDiscountCodeUpdate({
  cartId,
  discountCodes,
  storefront,
}) {
  const {cartDiscountCodesUpdate} = await storefront.mutate(
    UPDATE_CART_DISCOUNT,
    {
      variables: {
        cartId,
        discountCodes,
      },
    },
  );

  if (!cartDiscountCodesUpdate) {
    throw new Error('No data returned from discount code items mutation');
  }

  return cartDiscountCodesUpdate;
}

export const UPDATE_CART_DISCOUNT = `#graphql
  mutation(
    $cartId: ID!,
    $discountCodes: [String!]!,
    $country: CountryCode = ZZ,
    $language: LanguageCode,
  ) @inContext(country: $country, language: $language){
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      cart {
        id
        discountCodes {
            applicable
            code
        }
      }
      userErrors {
        message
        field
        code
      }
    }
  }

`;

const USER_ERROR_FRAGMENT = `#graphql
  fragment ErrorFragment on CartUserError {
    message
    field 
    code
  }`;

const LINES_CART_FRAGMENT = `#graphql
  fragment CartLinesFragment on Cart {
    id
    totalQuantity
  }
`;

export const CREATE_CART_MUTATION = `#graphql
  mutation ($input: CartInput!, $country: CountryCode = ZZ, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    cartCreate(input: $input) {
      cart {
        ...CartLinesFragment
      }
      errors: userErrors {
        ...ErrorFragment
      }
    }
  }
  ${LINES_CART_FRAGMENT}
  ${USER_ERROR_FRAGMENT}
`;

export const ADD_LINES_MUTATION = `#graphql
  mutation ($cartId: ID!, $lines: [CartLineInput!]!, $country: CountryCode = ZZ, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    cartLinesAdd (cartId: $cartId, lines: $lines) {
      cart {
        ...CartLinesFragment
      }
      errors: userErrors {
        ...ErrorFragment
      }
    }
  }
  ${LINES_CART_FRAGMENT}
  ${USER_ERROR_FRAGMENT}
`;

export const REMOVE_LINE_ITEMS_MUTATION = `#graphql
  mutation ($cartId: ID!, $lineIds: [ID!]!, $language: LanguageCode, $country: CountryCode)
  @inContext(country: $country, language: $language) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartLinesFragment
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
                    tags
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
      }
      errors: userErrors {
        ...ErrorFragment
      }
    }
  }
  ${MONEY_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${LINES_CART_FRAGMENT}
  ${USER_ERROR_FRAGMENT}
`;

export const UPDATE_LINE_ITEMS_MUTATION = `#graphql
  mutation ($cartId: ID!, $lines: [CartLineUpdateInput!]!, $language: LanguageCode, $country: CountryCode)
  @inContext(country: $country, language: $language){
    cartLinesUpdate(cartId: $cartId, lines: $lines){
      cart {
        ...CartLinesFragment
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
                    tags
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
      },
      userErrors {
        ...ErrorFragment
      }
    }
  }
  ${MONEY_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${LINES_CART_FRAGMENT}
  ${USER_ERROR_FRAGMENT}
`;

export const UPDATE_CART_BUYER = `#graphql
  mutation(
    $cartId: ID!
    $buyerIdentity: CartBuyerIdentityInput!
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language){
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart {
        id
        buyerIdentity {
          email
          countryCode
          phone        
        }
      }
      userErrors {
        message
        field
        code
      }
    }
  }

`;
