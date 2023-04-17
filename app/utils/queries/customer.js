import logout from '~/routes/($lang)/account/__private/logout';
import {MONEY_FRAGMENT} from './fragments';

export async function getCustomer(context, customerAccessToken) {
  const {storefront} = context;
  const data = await storefront.query(CUSTOMER_QUERY, {
    variables: {
      customerAccessToken,
      country: storefront?.i18n?.country,
      language: storefront?.i18n?.language,
    },
  });

  if (!data || !data?.customer) {
    throw await logout(context);
  }

  return data.customer; 
}


const CUSTOMER_QUERY = `#graphql
  query CustomerDetails(
    $customerAccessToken: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      phone
      email
      acceptsMarketing
      defaultAddress {
        id
        formatted
        firstName
        lastName
        company
        address1
        address2
        country
        province
        city
        zip
        phone
      }
      addresses(first: 6){
        nodes {
          id
          firstName
          lastName
          formatted
          address1
          address2
          city
          company
          country
          countryCodeV2
          province
          zip
          phone
        }
      }
      orders(first: 250, sortKey: PROCESSED_AT, reverse: true) {
        nodes{
          id
          orderNumber
          processedAt
          financialStatus
          fulfillmentStatus
          currentTotalPrice {
            ...MoneyFragment
          }
          lineItems(first: 5) {
            nodes {
              title
              quantity
              discountedTotalPrice {
                ...MoneyFragment
              }
              originalTotalPrice {
                ...MoneyFragment
              }
            }
          }
        }
      }
    }
  }
  ${MONEY_FRAGMENT}
`;
