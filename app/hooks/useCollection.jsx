import {useEffect} from 'react';
import {useFetcher, useMatches} from '@remix-run/react';
import {getCollectionWithCMSData} from '~/utils/functions/eventFunctions';

const cachedCollections = [];

export function useCollection(slug) {
  const [root] = useMatches();
  const {productsCMSData} = root.data;

  const fetcher = useFetcher();
  const {state, data} = fetcher;

  useEffect(() => {
    if (
      slug &&
      state === 'idle' &&
      data === undefined &&
      !collectionIsCached()
    ) {
      const endpoint = `/collections/${slug}`;
      fetcher.load(endpoint);
    }
  }, []);

  useEffect(() => {
    if (data !== undefined && !collectionIsCached()) {
      cachedCollections.push(
        getCollectionWithCMSData(data?.collection, productsCMSData),
      );
    }
  }, [data]);

  function collectionIsCached() {
    return cachedCollections.some((collection) => collection.handle === slug);
  }

  function getCachedCollection() {
    return (
      cachedCollections.find((collection) => collection.handle === slug) || {}
    );
  }

  function getState() {
    let s;

    if (state === 'idle' && data === undefined) s = 'idle';
    if (state === 'loading') s = 'loading';
    if (collectionIsCached()) s = 'loaded';

    return s;
  }

  return {
    state: getState(),
    products: getCachedCollection()?.products,
    title: getCachedCollection()?.title,
    slug,
  };
}
