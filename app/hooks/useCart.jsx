import { useFetcher, useMatches } from '@remix-run/react';
import { flattenConnection } from '@shopify/hydrogen';

export function useCartState() {

  const [root] = useMatches();

  const { id, checkoutUrl, totalQuantity, lines, cost } = root.data.cart ?? { id: '', checkoutUrl: '', totalQuantity: 0, cost: 0 };
  const items = lines ? flattenConnection(lines) : [];

  function getItems() {

    return items.map(item => {

      const { merchandise, quantity } = item;

      return {
        id: merchandise.product.id.split('Product/')[1],
        ['line_item_id']: item.id,
        merchandiseId: merchandise.id,
        ['variant_id']: merchandise.id.split('ProductVariant/')[1],
        title: `${merchandise.product.title} - ${merchandise.title}`,
        handle: merchandise.product.handle,
        quantity,
        image: merchandise.image,
        cost: item.cost,
      };

    });

  }

  function getSubtotalPrice() {
    return (cost) ? (parseFloat(cost?.subtotalAmount?.amount)).toFixed(2).replace('.', '') : '';
  }

  function getCurrencyCode() {
    return (cost) ? cost.subtotalAmount.currencyCode : '';
  }
 
  return {
    id,
    items: getItems(),
    totalQuantity,
    subtotalPrice: getSubtotalPrice(),
    currencyCode: getCurrencyCode(),
    inventory: {
      status: ''
    },
    checkoutUrl,
  };

}

export function useCartActions() {
  const fetcher = useFetcher();
 
  const addItems = (items) => {
    return items.map(item => fetcher.submit(item, { method: 'POST', action: '/cart' }));
  };

  const updateItems = async (items) => {
    const formData = new FormData();
    formData.set('lines', JSON.stringify([items]));
    formData.set('cartAction', 'UPDATE_CART');

    return fetch('/cart', {
      method: 'POST',
      body: formData,
    }).then(res => res).catch(error => console.log(error));
  };

  const removeItems = (ids) => {

    const formData = new FormData();
    formData.set('linesIds', JSON.stringify(ids));
    formData.set('cartAction', 'REMOVE_FROM_CART');

    return fetch('/cart', {
      method: 'POST',
      body: formData,
    }).then(res => res).catch(error => console.log(error));

  };

  return {
    addItems,
    updateItems,
    removeItems,
  };

}