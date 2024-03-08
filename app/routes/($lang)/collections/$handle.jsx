import {PRODUCTS_QUERY} from '~/utils/graphql/shopify/queries/collections';
import {
  GET_CART_PAGE_CONFIG,
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

export const meta = ({data}) => {
  const collection = data?.collection;

  return [
    {title: collection?.seo?.title || collection?.title},
    {
      description:
        collection?.seo?.description || `Collection ${collection.title}`,
    },
  ];
};

export const loader = async ({params, context}) => {
  const {handle} = params;

  const [{collection}, filtersOptions, collectionsCMSData, cartPageConfig] =
    await Promise.all([
      context.storefront.query(PRODUCTS_QUERY, {
        variables: {handle},
        cache: context.storefront.CacheLong(),
      }),
      getCMSContent(context, GET_PLP_FILTER_MENU),
      getCMSContent(context, GET_PRODUCT_COLLECTIONS),
      getCMSContent(context, GET_CART_PAGE_CONFIG),
    ]);

  if (!collection) throw new Response(null, {status: 404});

  return json({
    filtersOptions,
    collectionsCMSData,
    cartPageConfig,
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
  const {productsCMSData} = root.data;
  const {filtersOptions, collectionsCMSData, collection, cartPageConfig} =
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
