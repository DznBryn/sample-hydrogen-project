import { useEffect, useMemo } from 'react';
import { useCollection } from '~/hooks/useCollection';
import ListrakRec, { links as listrakRecStyles } from '../listrakRec';
import ProductBoxLoading, { links as productBoxLoadingStyles } from '../productBoxLoading';
import PLPProductBox, { links as plpProductBoxStyles } from '../plpProductBox';
import { useYotpo } from '~/hooks/useYotpo';
import { useSearch } from '~/hooks/useSearch';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...listrakRecStyles(),
    ...productBoxLoadingStyles(),
    ...plpProductBoxStyles(),
  ];
};

const SearchPage = ({ listrak, searchQuery, algoliaKeys }) => {

  const {refreshWidgets} = useYotpo();

  const { state, products: allProducts } = useCollection('all');
  const { search, status, hits } = useSearch(algoliaKeys);
  
  const results = useMemo(
    () => (getResults() || []),
    [hits, state]
  );

  useEffect(() => {

    refreshWidgets();

  });

  useEffect(() => {

    if (status === 'idle' && searchQuery !== '') search(searchQuery);

  }, [status]);

  function getResults(){

    if (hits.length > 0 && state === 'loaded'){

      const titles = hits.map((hit) => hit.title);
      
      return allProducts.filter((product) => (titles.indexOf(product.title) !== -1));

    }

  }

  return (

    <div className={'searchPage'}>
      {
        (
          (status === 'searching') || 
          (status === 'completed' && hits.length > 0 && results.length === 0)
        ) &&
        <div className={'searchPageProducts'}>
          {
            Array.from(Array(4), (value, index) => <ProductBoxLoading key={index} />)
          }
        </div>
      }

      {
        (
          (searchQuery === '') ||
          (status === 'completed' && hits.length === 0)
        ) &&
        <div className={'searchTitle'}>
          <h1>
            Your search for <strong>&quot;{searchQuery}&quot;</strong> did not yield any results.
          </h1>
          <ListrakRec listrak={listrak} />
        </div>
      }

      {
        (status === 'completed' && hits.length > 0 && results.length > 0) &&
        <>
          <div className={'searchTitle'}>
            <h1>
              Showing results for <strong>&quot;{searchQuery}&quot;</strong>
            </h1>
            <div className={'searchPageTag'}>
              Products ({results.length} results)
            </div>
          </div>
          <div className={'searchPageProducts'}>
            {results.map((product, index) => {
              return <PLPProductBox product={product} key={index} />;
            })}
          </div>
        </>
      }

    </div>

  );
};
export default SearchPage;