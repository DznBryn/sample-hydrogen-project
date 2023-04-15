/* eslint-disable react/prop-types */
import { flattenConnection } from '@shopify/hydrogen-react';
import { useLoaderData } from 'react-router';
import { PRODUCT_QUERY } from '~/utils/queries/collections';
import { json } from '@shopify/remix-oxygen';
import { useFetcher, useMatches } from '@remix-run/react';

export const loader = async ({ params, context }) => {
  const { handle } = params;
  const { product } = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
    },
  });

  if (!product) {
    throw new Response(null, { status: 404 });
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
  const { handle, product } = useLoaderData();
  return product ? (
    <div className="outline outline-2 outline-blue-300 p-4 my-2">
      <summary>
        Collection: {product?.title ?? ''} ({handle})
      </summary>
      <div>
        <ProductForm variantId={product.variants[0].id} />
      </div>
      <pre>{JSON.stringify(product, null, 2)}</pre>
    </div>
  ) : (
    <></>
  );
}

export function ProductForm({ variantId }) {
  const [root] = useMatches();
  const selectedLocale = root?.data?.selectedLocale;
  const fetcher = useFetcher();
  const lines = [{ merchandiseId: variantId, quantity: 1 }];

  return (
    <fetcher.Form action="/cart" method="post">
      <input type="hidden" name="cartAction" value={'ADD_TO_CART'} />
      <input
        type="hidden"
        name="countryCode"
        value={selectedLocale?.country ?? 'US'}
      />
      <input type="hidden" name="lines" value={JSON.stringify(lines)} />
      <button type="submit">
        Add to cart
      </button>
    </fetcher.Form>
  );
}
