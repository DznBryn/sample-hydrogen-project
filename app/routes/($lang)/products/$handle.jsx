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
  console.log('SOmething is ',product.variants[0].id)
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
  console.log('SHOW FORMS: ', { root, variantId, fetcher });

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

// export function AddToCartButton({
//   children,
//   lines,
//   className = '',
//   variant = 'primary',
//   width = 'full',
//   disabled,
//   analytics,
//   ...props
// }) {
//   const [root] = useMatches();
//   const selectedLocale = root?.data?.selectedLocale;
//   const fetcher = useFetcher();
//   const fetcherIsNotIdle = fetcher.state !== 'idle';

//   return (
//     <fetcher.Form action="/cart" method="post">
//       <input type="hidden" name="cartAction" value={CartAction.ADD_TO_CART} />
//       <input type="hidden" name="countryCode" value={selectedLocale.country} />
//       <input type="hidden" name="lines" value={JSON.stringify(lines)} />
//       <input type="hidden" name="analytics" value={JSON.stringify(analytics)} />
//       <Button
//         as="button"
//         type="submit"
//         width={width}
//         variant={variant}
//         className={className}
//         disabled={disabled ?? fetcherIsNotIdle}
//         {...props}
//       >
//         {children}
//       </Button>
//     </fetcher.Form>
//   );
// }