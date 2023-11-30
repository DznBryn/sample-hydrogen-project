import Layouts from '~/layouts';
import {useLoaderData} from 'react-router';
import {PRODUCTS_QUERY} from '~/utils/graphql/shopify/queries/collections';
import ComparePage, {links as styleComparePage} from '~/modules/comparePage';
import {useMatches} from '@remix-run/react';
import {useMemo} from 'react';
import {
  getCMSContent,
  getCollectionWithCMSData,
} from '~/utils/functions/eventFunctions';
import {GET_PRODUCT_COLLECTIONS} from '~/utils/graphql/sanity/queries';
import {flattenConnection} from '@shopify/hydrogen';

export const links = () => styleComparePage();

export async function loader({request, context}) {
  let collection = [];
  let collectionsCMSData = [];

  const url = new URL(request.url);
  const collectionHandle = url.searchParams.get('c');
  const productsToShow = url.searchParams.get('p');

  if (collectionHandle !== null) {
    const [collectionsCMSFetchedData, data] = await Promise.all([
      getCMSContent(context, GET_PRODUCT_COLLECTIONS),
      context.storefront.query(PRODUCTS_QUERY, {
        variables: {handle: collectionHandle},
      }),
    ]);

    if (!data) throw new Response(null, {status: 404});

    collectionsCMSData = collectionsCMSFetchedData;
    collection = data.collection;
  }

  return {
    collectionsCMSData,
    productsToShow,
    collection: {
      ...collection,
      handle: collectionHandle,
      products: collection?.products
        ? flattenConnection(collection.products)
        : [],
    },
  };
}

export default function Compare() {
  const [root] = useMatches();
  const {collection, collectionsCMSData, productsToShow} = useLoaderData();

  const productsCMSData = root.data.globalCMSData.products;

  const collectionWithCMSData = useMemo(
    () =>
      getCollectionWithCMSData(collection, productsCMSData, collectionsCMSData),
    [collection, productsCMSData],
  );

  const filteredProducts = useMemo(
    () => getFilterProducts(collectionWithCMSData, productsToShow),
    [collectionWithCMSData, productsToShow],
  );

  /** */

  return (
    <Layouts.MainNavFooter>
      <ComparePage
        products={filteredProducts}
        collectionHandle={collectionWithCMSData.handle}
      />
    </Layouts.MainNavFooter>
  );
}

function getFilterProducts(collectionWithCMSData, productsToShow) {
  const products = collectionWithCMSData.products;
  const filteredProducts = products.filter((value) =>
    productsToShow?.includes(value.handle),
  );

  return filteredProducts || [];
}
