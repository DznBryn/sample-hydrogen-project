import { useEffect } from 'react';
import { useFetcher } from '@remix-run/react';

export function useCollection(slug) {

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

  return {
    state: getState(),
    products: fetcher.data?.collection?.products,
    title: fetcher.data?.collection?.title,
    slug: fetcher.data?.handle,
  };

}