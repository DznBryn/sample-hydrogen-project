import { useEffect, useMemo } from 'react';
import { useFetcher, useMatches } from '@remix-run/react';
import { getCollectionProductsWithCMSData } from '~/utils/functions/eventFunctions';

export function useCollection(slug) {

  const [root] = useMatches();
  const productsCMSData = root.data.globalCMSData.products;

  const fetcher = useFetcher();
  const {state, data} = fetcher;

  useEffect(() => {
    
    if(slug && state === 'idle' && data === undefined){
    
      fetcher.load(`/collections/${slug}`);
    
    }

  }, []);

  function getState(){

    let s;

    if(state === 'idle' && data === undefined) s = 'idle';
    if(state === 'loading') s = 'loading';
    if(data !== undefined) s = 'loaded';

    return s;

  }

  const collectionWithCMSData = useMemo (
    () => getCollectionProductsWithCMSData(fetcher.data?.collection, productsCMSData),
    [fetcher.data?.collection, productsCMSData]
  );

  return {
    state: getState(),
    products: collectionWithCMSData?.products,
    title: collectionWithCMSData?.title,
    slug: fetcher.data?.handle,
  };

}