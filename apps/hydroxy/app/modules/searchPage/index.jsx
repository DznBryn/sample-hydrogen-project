import {Suspense, useEffect, useMemo} from 'react';
import {useCollection} from '~/hooks/useCollection';
import ListrakRec, {links as listrakRecStyles} from '../listrakRec';
import ProductBoxLoading, {
  links as productBoxLoadingStyles,
} from '../productBoxLoading';
import PLPProductBox, {
  links as plpProductBoxStyles,
} from '../plp/plpProductBox';
import {useSearch} from '~/hooks/useSearch';

import styles from './styles.css';
import {Await, useMatches} from '@remix-run/react';
import {getCMSDoc, getIdFromGid} from '~/utils/functions/eventFunctions';

export const links = () => {
  return [
    {rel: 'stylesheet', href: styles},
    ...listrakRecStyles(),
    ...productBoxLoadingStyles(),
    ...plpProductBoxStyles(),
  ];
};

const SearchPage = ({searchQuery, algoliaKeys}) => {
  const [root] = useMatches();

  const {state, products: allProducts} = useCollection('all');
  const {search, status, hits} = useSearch(algoliaKeys);

  const results = useMemo(() => getResults() || [], [hits, state]);

  useEffect(() => {
    if (status === 'idle' && searchQuery !== '') search(searchQuery);
  }, [status]);

  function getResults() {
    if (hits.length > 0 && state === 'loaded') {
      const titles = hits.map((hit) => hit.title);

      return allProducts.filter(
        (product) => titles.indexOf(product.title) !== -1,
      );
    }
  }

  return (
    <div className={'searchPage'}>
      {(status === 'searching' ||
        (status === 'completed' &&
          hits.length > 0 &&
          results.length === 0)) && (
        <div className={'searchPageProducts'}>
          {Array.from(Array(4), (value, index) => (
            <ProductBoxLoading key={index} />
          ))}
        </div>
      )}

      {(searchQuery === '' ||
        (status === 'completed' && hits.length === 0)) && (
        <div className={'searchTitle'}>
          <h1>
            Your search for <strong>&quot;{searchQuery}&quot;</strong> did not
            yield any results.
          </h1>
          <Suspense>
            <Await resolve={root.data.listrakRec}>
              {(listrakRec) => (
                <ListrakRec listrak={getCMSDoc(listrakRec, 'Search')} />
              )}
            </Await>
          </Suspense>
        </div>
      )}

      {status === 'completed' && hits.length > 0 && results.length > 0 && (
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
              return (
                <PLPProductBox
                  product={product}
                  key={index}
                  analytics={{
                    click: {
                      actionField: {list: 'Homepage'},
                      products: [
                        {
                          name: product?.title,
                          id: getIdFromGid(product?.id),
                          price: parseInt(
                            product?.priceRange?.minVariantPrice?.amount,
                          )?.toFixed(2),
                          category: product?.productType,
                          variant: '',
                          position: index,
                        },
                      ],
                    },
                  }}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
export default SearchPage;
