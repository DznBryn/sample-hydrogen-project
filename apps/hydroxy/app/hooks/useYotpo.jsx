import getApiKeys from '~/utils/functions/getApiKeys';

export function useYotpo() {
  //
  async function getProductReviewsData(productExternalID) {
    return await getFetchedData(productExternalID);
  }

  async function getFetchedData(productExternalID) {
    try {
      const fetchedData = await fetch(getURL(), getHeader());
      const data = await fetchedData.json();

      return data?.response?.bottomline;
    } catch (e) {
      return {total_reviews: 0, average_score: 0};
    }

    function getURL() {
      return `https://api.yotpo.com/products/${
        getApiKeys().YOTPO_KEY
      }/${productExternalID}/bottomline`;
    }

    function getHeader() {
      return {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
    }
  }

  function refreshWidgets() {
    if (typeof window === 'object') {
      const yotpoSDK = window?.yotpo;

      if (yotpoSDK) {
        try {
          if (yotpoSDK.initialized) {
            yotpoSDK?.refreshWidgets();
          } else {
            yotpoSDK?.initWidgets();
          }
        } catch (e) {
          (e) => e;
        }
      }
    }
  }

  return {
    refreshWidgets,
    getProductReviewsData,
  };
}
