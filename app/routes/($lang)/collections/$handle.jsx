import Layouts from '~/layouts';
import {flattenConnection} from '@shopify/hydrogen-react';
import {useLoaderData} from 'react-router';
import {
  NAV_COLLECTION_CAROUSEL,
  PRODUCTS_QUERY,
} from '~/utils/graphql/shopify/queries/collections';
import {
  GET_PLP_FILTER_MENU,
  GET_PRODUCT_COLLECTIONS,
} from '~/utils/graphql/sanity/queries';
import {json} from '@shopify/remix-oxygen';
import PLP, {links as plpStyles} from '../../../modules/plp';
import {
  getCMSContent,
  getCMSDoc,
  getCollectionWithCMSData,
} from '~/utils/functions/eventFunctions';
import {useMatches} from '@remix-run/react';
import {useMemo} from 'react';

export const links = () => {
  return [...plpStyles()];
};

export const loader = async ({params, context, request}) => {
  const {handle} = params;
  const searchParams = new URLSearchParams(request.url.split('?')[1]);
  const customQueryName = searchParams.get('query');

  let query;

  switch (customQueryName) {
    case 'NAV_COLLECTION_CAROUSEL':
      query = NAV_COLLECTION_CAROUSEL;
      break;

    default:
      query = PRODUCTS_QUERY;
  }

  const [{collection}, filtersOptions, collectionsCMSData] = await Promise.all([
    context.storefront.query(query, {
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
  const productsCMSData = root.data.globalCMSData.products;
  const {CartPageConfig} = root.data.globalCMSData.mainNavFooter;

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
