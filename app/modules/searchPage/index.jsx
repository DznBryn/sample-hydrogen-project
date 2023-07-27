import { useCollection } from '~/hooks/useCollection';
import ListrakRec, { links as listrakRecStyles } from '../listrakRec';
import ProductBoxLoading, { links as productBoxLoadingStyles } from '../productBoxLoading';
import PLPProductBox, { links as plpProductBoxStyles } from '../plpProductBox';

import styles from './styles.css';
import { useEffect, useState } from 'react';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...listrakRecStyles(),
    ...productBoxLoadingStyles(),
    ...plpProductBoxStyles(),
  ];
};

let results = [];

const SearchPage = ({ listrak, searchQuery }) => {

  // useYotpoReviewsRefresh();

  const { state, products: allProducts } = useCollection('all');
  const [searchState, setSearchState] = useState('idle');

  useEffect(() => {

    if (state === 'loaded') {

      if (searchState === 'idle' && results.length === 0) {

        if (searchQuery !== '') {
          setSearchState('searching');
          search(searchQuery);
        }

      }

    }

  }, [state]);

  function search(searchQuery) {

    results = allProducts.filter((product) => (
      testSearch(product.title) ||
      testSearch(product?.alt_title) ||
      testSearch(product?.tags)
    ));

    setSearchState('done');

    function testSearch(data) {

      const regex = new RegExp(searchQuery, 'i');

      if (Array.isArray(data)) {

        return data.find(value => regex.test(value));

      } else {

        return regex.test(data);

      }

    }

  }

  return (

    <div className={'searchPage'}>
      {
        (searchState === 'idle') &&
        <div className={'searchPageProducts'}>
          {
            Array.from(Array(4), (value, index) => <ProductBoxLoading key={index} />)
          }
        </div>
      }

      {
        (searchState === 'done' && results.length === 0) &&
        <div className={'searchTitle'}>
          <h1>
            Your search for  <strong>&quot;{searchQuery}&quot;</strong> did not yield any results.
          </h1>
          <ListrakRec listrak={listrak} />
        </div>
      }

      {
        (searchState === 'done' && results.length > 0) &&
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