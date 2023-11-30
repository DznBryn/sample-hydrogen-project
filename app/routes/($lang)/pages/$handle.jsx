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
} from '~/utils/graphql/sanity/queries';
import {
  getCMSContent,
  getCMSDoc,
  getCMSProductsWithShopifyData,
  getPageOnCMSBySlug,
} from '~/utils/functions/eventFunctions';

export const links = () => {
  return [...influencerPageStyles()];
};

export const loader = async ({params, context}) => {
  let allCollection;

  const {handle} = params;

  const [cartPageConfig, influencerPagesOnCMS] = await Promise.all([
    getCMSContent(context, GET_CART_PAGE_CONFIG),
    getCMSContent(context, GET_INFLUENCER_PAGE),
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
  });
};

export default function PLPPage() {
  const {pageContent, cartPageConfig} = useLoaderData();

  return (
    <Layouts.MainNavFooter>
      <InfluencerPage
        influencer={pageContent}
        cartConfig={getCMSDoc(cartPageConfig, 'DefaultCart')}
      />
    </Layouts.MainNavFooter>
  );
}
