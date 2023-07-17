import Layouts from '~/layouts';
import { flattenConnection } from '@shopify/hydrogen-react';
import { useLoaderData } from 'react-router';
import { PRODUCTS_QUERY } from '~/utils/graphql/shopify/queries/collections';
import { GET_CART_PAGE_CONFIG, GET_PLP_FILTER_MENU } from '~/utils/graphql/sanity/queries';
import { json } from '@shopify/remix-oxygen';
import PLP, { links as plpStyles } from '../../../modules/plp';
import { getCMSContent, getCMSDoc } from '~/utils/functions/eventFunctions';

export const links = () => {
  return [
    ...plpStyles()
  ];
};

export const loader = async ({ params, context }) => {

  const { handle } = params;
  const { collection } = await context.storefront.query(PRODUCTS_QUERY, {variables: {handle}});
  if (!collection) throw new Response(null, { status: 404 });

  const cartPageConfig = await getCMSContent(context, GET_CART_PAGE_CONFIG);
  const filtersOptions = await getCMSContent(context, GET_PLP_FILTER_MENU);

  return json({
    // handle,
    cartPageConfig,
    filtersOptions,
    collection: {
      title: collection?.title ?? '',
      products: collection?.products
        ? flattenConnection(collection.products)
        : [],
    },
  });

};
export default function PLPPage() {
  const { 
    // handle, 
    cartPageConfig,
    filtersOptions,
    collection, 
  } = useLoaderData();

  return (
    
    <Layouts.MainNavFooter>
      {/* {
        collection.title !== '' ? (
          <>
            <summary>
              Collection: {collection.title} ({handle})
            </summary>
            <pre>{JSON.stringify(collection.products, null, 2)}</pre>
          </>
        ) : (
          <>Collection not found</>
        )
      } */}
      <PLP
        collection={collection}
        filtersOptions={filtersOptions}
        cartConfig={getCMSDoc(cartPageConfig, 'DefaultCart')}
      />
    </Layouts.MainNavFooter>

  );
}
