import { useMatches } from '@remix-run/react';
import { flattenConnection } from '@shopify/hydrogen';

export function useCartState() {

  const [root] = useMatches();

  const { id, checkoutUrl, totalQuantity, lines, cost } = root.data.cart;
  const items = lines ? flattenConnection(lines) : [];

  function getItems() {

    return items.map(item => {

      const { merchandise, quantity } = item;

      return {
        id: merchandise.product.id.split('Product/')[1],
        ['variant_id']: merchandise.id.split('ProductVariant/')[1],
        quantity,
      };

    });

  }

  function getSubtotalPrice() {

    return (cost) ? (parseFloat(cost?.subtotalAmount?.amount)).toFixed(2).replace('.', '') : '';

  }

  function getCurrencyCode(){

    return (cost) ? cost.subtotalAmount.currencyCode : '';

  }

  return {
    id,
    items: getItems(),
    totalQuantity,
    subtotalPrice: getSubtotalPrice(),
    currencyCode: getCurrencyCode(),
    checkoutUrl,
  };

}