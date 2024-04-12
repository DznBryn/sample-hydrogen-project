import Layouts from '~/layouts';
import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from 'react-router';
import {flattenConnection} from '@shopify/hydrogen-react';
import {PRODUCTS_QUERY} from '~/utils/graphql/shopify/queries/collections';
import InfluencerPage, {
  links as influencerPageStyles,
} from '~/modules/influencerPage';
import {
  GET_CART_PAGE_CONFIG,
  GET_INFLUENCER_PAGE,
  GET_PRODUCT_COLLECTIONS,
} from '~/utils/graphql/sanity/queries';
import {
  getCMSContent,
  getCMSDoc,
  getCMSProductsWithShopifyData,
  getCollectionWithCMSData,
  getPageOnCMSBySlug,
} from '~/utils/functions/eventFunctions';
import {useMatches} from '@remix-run/react';
import {useMemo} from 'react';

export const links = () => {
  return [...influencerPageStyles()];
};

export const loader = async ({params, context}) => {
  let allCollection;

  const {handle} = params;

  const [cartPageConfig, influencerPagesOnCMS, collectionsCMSData] =
    await Promise.all([
      getCMSContent(context, GET_CART_PAGE_CONFIG),
      getCMSContent(context, GET_INFLUENCER_PAGE),
      getCMSContent(context, GET_PRODUCT_COLLECTIONS),
    ]);

  const influencerPage = getPageOnCMSBySlug(influencerPagesOnCMS, handle);

  if (!influencerPage)
    throw new Response(null, {status: 404, statusText: 'Not Found'});

  /**
   * if the handle matches with any influencer page on CMS...
   */

  const {collection: shopifyInfluencerCollection} =
    await context.storefront.query(PRODUCTS_QUERY, {
      variables: {handle: influencerPage.plpCollection.collectionId},
    });
  if (!shopifyInfluencerCollection) throw new Response(null, {status: 404});

  allCollection = shopifyInfluencerCollection;

  /**
   * it's necessary to fetch the 'all' collection from Shopify
   * to populate the 'influencerPage.influencerProducts' with
   * Shopify data. So, if the above fetched collection is not
   * 'all', we fetch it below.
   */

  if (influencerPage.plpCollection.collectionId !== 'all') {
    const {collection: shopifyAllCollection} = await context.storefront.query(
      PRODUCTS_QUERY,
      {variables: {handle: 'all'}},
    );
    if (!shopifyAllCollection) throw new Response(null, {status: 404});

    allCollection = shopifyAllCollection;
  }

  return json({
    pageContent: {
      ...influencerPage,
      influencerProducts: getCMSProductsWithShopifyData(
        influencerPage.influencerProducts,
        allCollection,
      ),
      plpCollection: {
        ...influencerPage.plpCollection,
        products: flattenConnection(shopifyInfluencerCollection.products),
      },
    },
    cartPageConfig,
    collectionsCMSData,
  });
};

export default function PLPPage() {
  const [root] = useMatches();
  const {productsCMSData} = root.data;
  const {pageContent, cartPageConfig, collectionsCMSData} = useLoaderData();

  pageContent.plpCollection = useMemo(
    () =>
      getCollectionWithCMSData(
        pageContent.plpCollection,
        productsCMSData,
        collectionsCMSData,
      ),
    [pageContent.plpCollection, productsCMSData],
  );

  return (
    <Layouts.MainNavFooter>
      <InfluencerPage
        influencer={pageContent}
        cartConfig={getCMSDoc(cartPageConfig, 'DefaultCart')}
      />
    </Layouts.MainNavFooter>
  );
}
