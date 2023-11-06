import {useLoaderData} from '@remix-run/react';
import {flattenConnection} from '@shopify/hydrogen-react';
import { COLLECTIONS_QUERY } from '~/utils/graphql/shopify/queries/collections';

export const meta = () => [
  { title: 'Collections' },
  { description: 'Tula featured collections',}
];

export async function loader({context}) {
  const collections = await context.storefront.query(COLLECTIONS_QUERY);

  if (!collections) {
    throw new Response(null, {status: 404});
  }

  return collections;
}

export default function CollectionPage() {
  const {collections} = useLoaderData();
  const data = flattenConnection(collections);
  return data?.map((item = null) =>
    item ? (
      <>
        <pre>{JSON.stringify(item, null, 2)}</pre>
      </>
    ) : (
      <></>
    ),
  );
}
