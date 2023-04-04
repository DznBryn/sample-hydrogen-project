import {flattenConnection} from '@shopify/hydrogen-react';
import {useLoaderData} from 'react-router';
import {PRODUCT_QUERY} from '~/utils/queries/collections';
import {json} from '@shopify/remix-oxygen';

export const loader = async ({params, context}) => {
  const {handle} = params;
  const {product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
    },
  });

  if (!product) {
    throw new Response(null, {status: 404});
  }

  const data = product
    ? {
        ...product,
        images: flattenConnection(product.images),
        variants: flattenConnection(product.variants),
      }
    : null;

  return json({
    handle,
    product: data,
  });
};

export default function PDP() {
  const {handle, product} = useLoaderData();
  return product ? (
    <div className="outline outline-2 outline-blue-300 p-4 my-2">
      <summary>
        Collection: {product?.title ?? ''} ({handle})
      </summary>
      <pre>{JSON.stringify(product, null, 2)}</pre>
    </div>
  ) : (
    <></>
  );
}
