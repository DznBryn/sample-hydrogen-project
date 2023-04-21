import {flattenConnection} from '@shopify/hydrogen-react';
import {useLoaderData} from 'react-router';
import {PRODUCTS_QUERY} from '~/utils/graphql/queries/collections';
import {json} from '@shopify/remix-oxygen';

export const loader = async ({params, context}) => {
  const {handle} = params;
  const {collection} = await context.storefront.query(PRODUCTS_QUERY, {
    variables: {
      handle,
    },
  });

  if (!collection) {
    throw new Response(null, {status: 404});
  }
  return json({
    handle,
    collection: {
      title: collection?.title ?? '',
      products: collection?.products
        ? flattenConnection(collection.products)
        : [],
    },
  });
};
export default function PLP() {
  const {handle, collection} = useLoaderData();
  return collection.title !== '' ? (
    <div className="outline outline-2 outline-blue-300 p-4 my-2">
      <summary>
        Collection: {collection.title} ({handle})
      </summary>
      <pre>{JSON.stringify(collection.products, null, 2)}</pre>
    </div>
  ) : (
    <></>
  );
}
