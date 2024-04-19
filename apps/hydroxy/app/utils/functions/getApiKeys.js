function getApiKeys() {
  switch (getEnv()) {
    case 'US_STG':
      return {
        CURRENCY_SYMBOL: '$',
        LISTRAK_IDS: {
          list_id: 345013,
          birthday_segment_id: 431,
          externalEventName: 11771,
          fieldGroupName: 51,
          fieldName: 7810,
        },
        SHOW_FIREWORK: true,
        FEATURE_FLAGS: {
          LOYALTY: true,
        },
        // API_TYPE: storePlatformApiType
      };

    case 'US_PROD':
      return {
        CURRENCY_SYMBOL: '$',
        LISTRAK_IDS: {
          list_id: 345013,
          birthday_segment_id: 431,
          externalEventName: 11771,
          fieldGroupName: 51,
          fieldName: 7810,
        },
        SHOW_FIREWORK: true,
        FEATURE_FLAGS: {
          LOYALTY: true,
        },
        // API_TYPE: storePlatformApiType
      };

    case 'CA_PROD':
      return {
        CURRENCY_SYMBOL: '$',
        LISTRAK_IDS: {
          list_id: 346002,
          birthday_segment_id: 25869,
          externalEventName: 13307,
          fieldGroupName: 2873,
          fieldName: 26307,
        },
        SHOW_FIREWORK: false,
        FEATURE_FLAGS: {
          LOYALTY: false,
        },
        // API_TYPE: storePlatformApiType
      };

    case 'UK_PROD':
      return {
        CURRENCY_SYMBOL: '£',
        LISTRAK_IDS: {
          list_id: 346019,
          birthday_segment_id: 26799,
          externalEventName: 13330,
          fieldGroupName: 2948,
          fieldName: 26886,
        },
        SHOW_FIREWORK: false,
        FEATURE_FLAGS: {
          LOYALTY: false,
        },
        // API_TYPE: storePlatformApiType
      };
  }
}

function getEnv() {
  /**
   * I made this function to keep the apiGetEnv as a function.
   * Here, we are checking the domain to define the enviroment
   * that the application is running. Definetely, the best
   * approach would be to get the storefront.getShopifyDomain
   * function's return, since it would work on server end too.
   * But we only have access to the storefront API data on
   * the loader function (server end), and the only way to
   * access this data would be within a component, usign the
   * hook useMatches. It's a palliative solution to avoid
   * transform getApiKeys in a custom hook and have all the
   * work to update it's implementation on the whole app.
   */

  if (typeof window === 'object') {
    const {host} = window.location;

    if (host.includes('staging-hydroxy.tula.com')) {
      return 'US_STG';
    } else if (
      host.includes('tulaskincare.ca') ||
      host.includes('tula-hydroxy-ca') ||
      host.includes('ca-preview')
    ) {
      return 'CA_PROD';
    } else if (
      host.includes('tulaskincare.co.uk') ||
      host.includes('tula-hydroxy-uk') ||
      host.includes('uk-preview')
    ) {
      return 'UK_PROD';
    } else if (host.includes('tula.com')) {
      return 'US_PROD';
    } else {
      return 'US_STG';
    }
  } else {
    //on server end - need to check if it will bring no problem on differents envs

    return 'US_STG';
  }
}

export default getApiKeys;
