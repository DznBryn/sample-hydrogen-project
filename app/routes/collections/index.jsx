import {useLoaderData} from '@remix-run/react';
import {COLLECTIONS_QUERY} from '~/utils/queries/collections';

export const meta = () => {
  return {
    title: 'Collections',
    description: 'Tula featured collections',
  };
};

export async function loader({context}) {
  return await context.storefront.query(COLLECTIONS_QUERY);
}

export default function CollectionPage() {
  const {collections} = useLoaderData();
  return 
}