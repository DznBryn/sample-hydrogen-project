import { useState, useMemo, useEffect } from 'react';
import algoliasearch from 'algoliasearch/dist/algoliasearch-lite.esm.browser';

const hitsPerPage = 1000;

export function useSearch(algoliaKeys) {

  const {appID, writeAPIKey} = algoliaKeys;

  const client = useMemo(() => algoliasearch(appID, writeAPIKey), [algoliaKeys]);
  const index = useMemo(() => client.initIndex('shopify_products'), [client]);

  const [state, setState] = useState({
    status: '',
    hits: [],
  });

  useEffect(() => {

    setState({...state, status: 'idle'});
    
  }, []);

  async function search(query){

    if(state.status !== 'searching'){

      setState({...state, status: 'searching'});
      const result = await index.search(query, {hitsPerPage});
      setState({ hits: result.hits, status: 'completed'});

    }

  }

  return {
    search,
    hits: state.hits,
    status: state.status,
  };

}