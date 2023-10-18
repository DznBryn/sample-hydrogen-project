import {useEffect, useMemo} from 'react';
import {useFetcher, useMatches} from '@remix-run/react';
import {getCollectionWithCMSData} from '~/utils/functions/eventFunctions';

export function useCollection(slug, customQuery) {
  const [root] = useMatches();
  const productsCMSData = root.data.globalCMSData.products;

  const fetcher = useFetcher();
  const {state, data} = fetcher;

  useEffect(() => {
    if (slug && state === 'idle' && data === undefined) {
      const endpoint = customQuery
        ? `/collections/${slug}?query=${customQuery}`
        : `/collections/${slug}`;
      fetcher.load(endpoint);
    }
  }, []);

  function getState() {
    let s;

    if (state === 'idle' && data === undefined) s = 'idle';
    if (state === 'loading') s = 'loading';
    if (data !== undefined) s = 'loaded';

    return s;
  }

  const collectionWithCMSData = useMemo(
    () => getCollectionWithCMSData(fetcher.data?.collection, productsCMSData),
    [fetcher.data?.collection, productsCMSData],
  );

  return {
    state: getState(),
    products: collectionWithCMSData?.products,
    title: collectionWithCMSData?.title,
    slug: fetcher.data?.handle,
  };
}
