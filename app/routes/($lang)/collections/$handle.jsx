import {PRODUCTS_QUERY} from '~/utils/graphql/shopify/queries/collections';
import {
  GET_PLP_FILTER_MENU,
  GET_PRODUCT_COLLECTIONS,
} from '~/utils/graphql/sanity/queries';
import {
  getCMSContent,
  getCMSDoc,
  getCollectionWithCMSData,
} from '~/utils/functions/eventFunctions';
import PLP, {links as plpStyles} from '../../../modules/plp';
import {flattenConnection} from '@shopify/hydrogen-react';
import {useMatches} from '@remix-run/react';
import {useLoaderData} from 'react-router';
import {json} from '@shopify/remix-oxygen';
import Layouts from '~/layouts';
import {useMemo} from 'react';

export const links = () => {
  return [...plpStyles()];
};

export const loader = async ({params, context}) => {
  const {handle} = params;

  const [{collection}, filtersOptions, collectionsCMSData] = await Promise.all([
    context.storefront.query(PRODUCTS_QUERY, {
      variables: {handle},
      cache: context.storefront.CacheLong(),
    }),
    getCMSContent(context, GET_PLP_FILTER_MENU),
    getCMSContent(context, GET_PRODUCT_COLLECTIONS),
  ]);

  if (!collection) throw new Response(null, {status: 404});

  return json({
    filtersOptions,
    collectionsCMSData,
    collection: {
      ...collection,
      handle,
      metafields: collection?.metafields || [],
      title: collection?.title ?? '',
      products: collection?.products
        ? flattenConnection(collection.products)
        : [],
    },
  });
};

export default function PLPPage() {
  const [root] = useMatches();
  const {productsCMSData, mainNavFooterCMSData} = root.data;
  const {CartPageConfig} = mainNavFooterCMSData;

  const {filtersOptions, collectionsCMSData, collection} = useLoaderData();

  const collectionWithCMSData = useMemo(
    () =>
      getCollectionWithCMSData(collection, productsCMSData, collectionsCMSData),
    [collection, productsCMSData],
  );

  return (
    <Layouts.MainNavFooter>
      <PLP
        collection={collectionWithCMSData}
        filtersOptions={filtersOptions}
        cartConfig={getCMSDoc(CartPageConfig, 'DefaultCart')}
      />
    </Layouts.MainNavFooter>
  );
}
