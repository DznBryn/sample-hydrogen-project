export const MONEY_FRAGMENT = `#graphql
  fragment MoneyFragment on MoneyV2 {
    currencyCode
    amount
  }
`;

export const IMAGE_FRAGMENT = `#graphql
	fragment ImageFragment on Image {
    id
    url
    altText
    width
    height
  }
`;
