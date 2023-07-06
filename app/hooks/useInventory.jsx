import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router-dom';

export function useInventory({ id = '', slug = '' }) {
  const fetcher = useFetcher();
  const { state, data } = fetcher;
  const [inventory, setInventory] = useState({
    quantity: 0,
    availableForSale: false,
    status: 'idle',
  });
  useEffect(() => {
    if (id !== '' && state === 'idle' && data === undefined) {
      fetcher.load(`/products/${slug}`);
    }
    if (id !== '' && state === 'idle' && data !== undefined && inventory.quantity !== data?.product?.totalInventory ) {
      setInventory({
        quantity: data?.product?.totalInventory ?? 0,
        availableForSale: data?.product?.variants?.find((v) => v.id === id)?.availableForSale ?? false,
        status: state ?? 'idle',
      });
    }
  }, [state]);

  return inventory;

}