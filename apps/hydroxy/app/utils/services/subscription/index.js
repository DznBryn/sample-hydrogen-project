import {flattenConnection} from '@shopify/hydrogen';
import {API_METHODS} from '~/utils/constants';
import {SUBSCRIPTION_PRODUCTS_QUERY} from '~/utils/graphql/shopify/queries/collections';

const CryptoJS = require('crypto-js'); // npm install crypto-js

// Constants
const MERCHANT_ID = 'ddc74d7e95fd11eab8c3bc764e10b970';
const STOREFRONT_API_KEY = 'Vx6x$iLx}pD7OIJeGJE=~hk^N2I#%{~r';

// This function generates the OG Authorization header for a given customer
export const generateOGAuthorization = (customerId) => {
  const ts = Math.floor(new Date().getTime() / 1000);
  const hash = CryptoJS.HmacSHA256(`${customerId}|${ts}`, STOREFRONT_API_KEY);
  const sig = CryptoJS.enc.Base64.stringify(hash);
  return JSON.stringify({
    public_id: MERCHANT_ID,
    sig_field: customerId,
    ts,
    sig,
  });
};

export async function getCustomerSubscription(customerId, live = false) {
  const url = `https://restapi.ordergroove.com/subscriptions?live=${live}&page_size=100`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: generateOGAuthorization(customerId),
  };
  try {
    const response = await fetch(url, {headers});

    if (!response.ok) {
      // Handle non-successful responses (e.g., 4xx or 5xx status codes)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseJson = await response.json();
    const subscriptions = {...responseJson};

    return subscriptions;
  } catch (error) {
    return error.message;
  }
}

export async function getSubscriptionPayment(customerId, payment_id) {
  const url = `https://restapi.ordergroove.com/payments/${payment_id}/`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: generateOGAuthorization(customerId),
  };
  try {
    const response = await fetch(url, {headers});

    if (!response.ok) {
      // Handle non-successful responses (e.g., 4xx or 5xx status codes)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const subscription = await response.json();
    return subscription;
  } catch (error) {
    return error.message;
  }
}

export async function getSubscriptionPayments(customerId) {
  const url = `https://restapi.ordergroove.com/payments/?customer=${customerId}`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: generateOGAuthorization(customerId),
  };
  try {
    const response = await fetch(url, {headers});

    if (!response.ok) {
      // Handle non-successful responses (e.g., 4xx or 5xx status codes)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const payments = await response.json();
    return payments;
  } catch (error) {
    return error.message;
  }
}

export async function getSubscription(customerId, subscriptionId) {
  const url = `https://restapi.ordergroove.com/subscriptions/${subscriptionId}/`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: generateOGAuthorization(customerId),
  };
  try {
    const response = await fetch(url, {headers});

    if (!response.ok) {
      // Handle non-successful responses (e.g., 4xx or 5xx status codes)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const subscription = await response.json();
    return subscription;
  } catch (error) {
    return error.message;
  }
}

export async function getOrderItem(customerId, orderId) {
  const url = `https://restapi.ordergroove.com/orders/${orderId}/`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: generateOGAuthorization(customerId),
  };
  try {
    const response = await fetch(url, {headers});

    if (!response.ok) {
      // Handle non-successful responses (e.g., 4xx or 5xx status codes)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const order = await response.json();

    return order;
  } catch (error) {
    return error.message;
  }
}

export async function getCustomerOrders(customerId, pageSize = null) {
  const url = `https://restapi.ordergroove.com/orders/?status=1&customer=${customerId}&page_size=${
    pageSize ?? 100
  }`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: generateOGAuthorization(customerId),
  };
  try {
    const response = await fetch(url, {headers});

    if (!response.ok) {
      // Handle non-successful responses (e.g., 4xx or 5xx status codes)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const orders = await response.json();
    // console.log('orders', orders);

    return orders;
  } catch (error) {
    return error.message;
  }
}

export async function getItems(customerId) {
  const url = 'https://restapi.ordergroove.com/items/?status=1';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: generateOGAuthorization(customerId),
  };
  try {
    const response = await fetch(url, {headers});
    if (!response.ok) {
      // Handle non-successful responses (e.g., 4xx or 5xx status codes)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const items = await response.json();
    return items;
  } catch (error) {
    return error.message;
  }
}

export async function getSubscriptionProduct(customerId, productId) {
  const url = `https://restapi.ordergroove.com/products/product_id/${productId}`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: generateOGAuthorization(customerId),
  };
  try {
    const response = await fetch(url, {headers});

    if (!response.ok) {
      // Handle non-successful responses (e.g., 4xx or 5xx status codes)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const product = await response.json();
    return product;
  } catch (error) {
    return error.message;
  }
}

export async function getSubscriptionProducts(customerId, pageSize = null) {
  const url = `https://restapi.ordergroove.com/products?page_size=${
    pageSize ?? 50
  }`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: generateOGAuthorization(customerId),
  };
  try {
    const response = await fetch(url, {headers});

    if (!response.ok) {
      // Handle non-successful responses (e.g., 4xx or 5xx status codes)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const products = await response.json();
    return products;
  } catch (error) {
    return error.message;
  }
}

export async function getCollectionProducts(context, collectiontitle) {
  const {collection} = await context.storefront.query(
    SUBSCRIPTION_PRODUCTS_QUERY,
    {
      variables: {handle: collectiontitle},
      cache: context.storefront.CacheLong(),
    },
  );

  if (!collection) throw new Response(null, {status: 404});

  return {
    products: collection?.products
      ? flattenConnection(collection.products)
      : [],
  };
}

export async function getCustomerAddresses(customerId) {
  const url = `https://restapi.ordergroove.com/addresses/?customer=${customerId}&live=true&page_size=100`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: generateOGAuthorization(customerId),
  };
  try {
    const response = await fetch(url, {headers});

    if (!response.ok) {
      // Handle non-successful responses (e.g., 4xx or 5xx status codes)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const addresses = await response.json();
    return addresses;
  } catch (error) {
    return error.message;
  }
}

export async function reactivateSubscription(subscriptionItem) {
  const url = `https://restapi.ordergroove.com/subscriptions/${subscriptionItem.public_id}/reactivate`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: generateOGAuthorization(subscriptionItem.customer),
  };

  const handleSubscriptionStartDate = (date) => {
    const dateObject = new Date(date);

    const currentYear = new Date().getFullYear();

    dateObject.setFullYear(currentYear + 1);

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();

    // Format the updated date string
    const updatedDate = `${year}-${month < 10 ? '0' : ''}${month}-${
      day < 10 ? '0' : ''
    }${day}`;

    return updatedDate;
  };

  try {
    const response = await fetch(url, {
      method: API_METHODS.PATCH,
      headers,
      body: JSON.stringify({
        every: subscriptionItem.every,
        every_period: subscriptionItem.every_period,
        start_date: handleSubscriptionStartDate(subscriptionItem.start_date),
      }),
    });

    if (!response.ok) {
      // Handle non-successful responses (e.g., 4xx or 5xx status codes)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const subscription = await response.json();
    return subscription;
  } catch (error) {
    return error.message;
  }
}

export async function changeFrequency(subscriptionItem) {
  const url = `https://restapi.ordergroove.com/subscriptions/${subscriptionItem.public_id}/change_frequency`;
  const headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: generateOGAuthorization(subscriptionItem.customer),
  };

  try {
    const response = await fetch(url, {
      method: API_METHODS.PATCH,
      headers,
      body: JSON.stringify({
        every: subscriptionItem.every,
        every_period: subscriptionItem.every_period,
      }),
    });

    if (!response.ok) {
      // Handle non-successful responses (e.g., 4xx or 5xx status codes)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const subscription = await response.json();
    return subscription;
  } catch (error) {
    return error.message;
  }
}

export async function skipSubscriptionOrder(subscriptionItem) {
  const url = `https://restapi.ordergroove.com/orders/${subscriptionItem.public_id}/skip_subscription/`;
  const headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: generateOGAuthorization(subscriptionItem.customer),
  };

  try {
    const response = await fetch(url, {
      method: API_METHODS.PATCH,
      headers,
      body: JSON.stringify({subscription: subscriptionItem.subscription_id}),
    });

    if (!response.ok) {
      // Handle non-successful responses (e.g., 4xx or 5xx status codes)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const subscription = await response.json();
    return subscription;
  } catch (error) {
    return error.message;
  }
}

export async function changeProduct(subscriptionItem, newProduct) {
  const url = `https://restapi.ordergroove.com/items/${subscriptionItem.public_id}/change_product/`;
  const headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: generateOGAuthorization(
      subscriptionItem.subscription.customer,
    ),
  };

  try {
    const response = await fetch(url, {
      method: API_METHODS.PATCH,
      headers,
      body: JSON.stringify({product: newProduct}),
    });

    if (!response.ok) {
      // Handle non-successful responses (e.g., 4xx or 5xx status codes)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const cancelOrder = await response.json();
    return cancelOrder;
  } catch (error) {
    return error.message;
  }
}

export async function cancelSubscription(subscriptionItem) {
  const url = `https://restapi.ordergroove.com/subscriptions/${subscriptionItem.public_id}/cancel`;
  const headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: generateOGAuthorization(subscriptionItem.customer),
  };
  try {
    const response = await fetch(url, {
      method: API_METHODS.PATCH,
      headers,
      body: JSON.stringify({cancel_reason: subscriptionItem.cancelReason}),
    });

    if (!response.ok) {
      // Handle non-successful responses (e.g., 4xx or 5xx status codes)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const subscription = await response.json();
    return subscription;
  } catch (error) {
    return error.message;
  }
}

export async function cancelOrder(order) {
  const url = `https://restapi.ordergroove.com/orders/${order.public_id}/cancel`;
  const headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: generateOGAuthorization(order.customer),
  };
  try {
    const response = await fetch(url, {
      method: API_METHODS.PATCH,
      headers,
    });

    if (!response.ok) {
      // Handle non-successful responses (e.g., 4xx or 5xx status codes)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const subscription = await response.json();
    return subscription;
  } catch (error) {
    return error.message;
  }
}

export async function changeSubscriptionDate(subscriptionItem) {
  const url = `https://restapi.ordergroove.com/subscriptions/${subscriptionItem.public_id}/change_next_order_date`;
  const headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: generateOGAuthorization(subscriptionItem.customer),
  };
  try {
    const response = await fetch(url, {
      method: API_METHODS.PATCH,
      headers,
      body: JSON.stringify({
        order_date: subscriptionItem.changeDate,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const subscription = await response.json();
    return subscription;
  } catch (error) {
    return error.message;
  }
}

export async function changeShippingAddress(subscriptionItem) {
  const url = `https://restapi.ordergroove.com/orders/${subscriptionItem.public_id}/change_shipping/`;
  const headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: generateOGAuthorization(subscriptionItem.customer),
  };
  try {
    const response = await fetch(url, {
      method: API_METHODS.PATCH,
      headers,
      body: JSON.stringify({
        shipping_address: subscriptionItem.shipping_address,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const subscription = await response.json();
    return subscription;
  } catch (error) {
    return error.message;
  }
}

export async function changeAllShippingAddress(subscriptionItem) {
  const url = `https://restapi.ordergroove.com/addresses/${subscriptionItem.shipping_address}/use_for_all/`;
  const headers = {
    accept: 'text/plain',
    Authorization: generateOGAuthorization(subscriptionItem.customer),
  };
  try {
    const response = await fetch(url, {
      method: API_METHODS.POST,
      headers,
    });

    if (!response.ok) {
      const results = await response.json();
      throw new Error(
        `HTTP error! Status: ${response.status} - ${results?.detail}`,
      );
    }
    const subscription = await response.json();
    return subscription;
  } catch (error) {
    return error.message;
  }
}

export async function getProucts(customerId) {
  const url =
    'https://restapi.ordergroove.com/products/?group_type=sku_swap&page_size=100';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: generateOGAuthorization(customerId),
  };
  try {
    const response = await fetch(url, {
      method: API_METHODS.GET,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const products = await response.json();
    return products;
  } catch (error) {
    return error.message;
  }
}
