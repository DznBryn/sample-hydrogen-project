import {parseGid} from '@shopify/hydrogen';
import {useCustomer} from './useCustomer';
import {
  getCustomerAddresses,
  getCustomerOrders,
  getCustomerSubscription,
  getItems,
  getProucts,
  getSubscriptionPayments,
} from '~/utils/services/subscription';
import {useEffect, useState} from 'react';

//

export const useSubscriptions = () => {
  const useCustomerData = useCustomer();
  const [data, setData] = useState({
    state: 'loading',
    subscription: null,
    errro: null,
  });

  //

  useEffect(() => {
    fetchSubscription();
  }, []);

  //

  async function fetchSubscription() {
    try {
      const data = await getCustomerSubscriptionData(useCustomerData);
      setData({...data, state: 'loaded', subscription: data});
    } catch (err) {
      setData({...data, state: 'loaded', error: err});
      console.error(err);
    }
  }

  function updateCustomerSubscription(subscriptionData) {
    setData({...data, subscription: subscriptionData});
  }

  //

  return {
    data,
    updateCustomerSubscription,
  };
};

//

async function getCustomerSubscriptionData(customer) {
  if (customer?.id) {
    const subscription = {};
    const customerId = parseGid(customer.id).id;

    const [
      activeSubscription,
      inactiveSubscription,
      subscriptionOrders,
      items,
      payments,
      subscriptionAddresses,
      ogProducts,
    ] = await Promise.all([
      getCustomerSubscription(customerId, true),
      getCustomerSubscription(customerId),
      getCustomerOrders(customerId),
      getItems(customerId),
      getSubscriptionPayments(customerId),
      getCustomerAddresses(customerId),
      getProucts(customerId),
    ]);

    subscriptionAddresses && (subscription.addresses = subscriptionAddresses);

    inactiveSubscription && (subscription.inactive = inactiveSubscription);

    const activeItems = {
      ...items,
      results: items?.results?.map((item) => {
        if (activeSubscription?.results) {
          const _subscription = activeSubscription.results.find(
            (sub) => sub.public_id === item.subscription,
          );
          const payment = payments?.results?.find(
            (pay) => pay.public_id === subscription.payment,
          );

          _subscription.payment = payment;
          item.subscription = _subscription;
        }

        return item;
      }),
    };

    subscriptionOrders?.results &&
      (subscriptionOrders.results = subscriptionOrders.results.map((order) => {
        const items = [];

        activeItems.results.forEach((item) => {
          if (order.public_id === item.order) {
            items.push(item);
          }
        });

        const payment = payments?.results?.find(
          (pay) => pay.public_id === order.payment,
        );

        order.payment = payment;
        order.items = items;
        return order;
      }));

    subscriptionOrders && (subscription.orders = subscriptionOrders);
    ogProducts && (subscription.products = ogProducts);

    return subscription;
  }
}
