import Layouts from '~/layouts';
import {flattenConnection} from '@shopify/hydrogen-react';
import {useLoaderData} from 'react-router';
import {
  NAV_COLLECTION_CAROUSEL,
  PRODUCTS_QUERY,
} from '~/utils/graphql/shopify/queries/collections';
import {
  GET_CART_PAGE_CONFIG,
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

  const {collection} = await context.storefront.query(query, {
    variables: {handle},
    cache: context.storefront.CacheLong(),
  });
  if (!collection) throw new Response(null, {status: 404});

  const cartPageConfig = await getCMSContent(context, GET_CART_PAGE_CONFIG);
  const filtersOptions = await getCMSContent(context, GET_PLP_FILTER_MENU);
  const collectionsCMSData = await getCMSContent(
    context,
    GET_PRODUCT_COLLECTIONS,
  );

  return json({
    cartPageConfig,
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

  const {cartPageConfig, filtersOptions, collectionsCMSData, collection} =
    useLoaderData();

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
        cartConfig={getCMSDoc(cartPageConfig, 'DefaultCart')}
      />
    </Layouts.MainNavFooter>
  );
}
