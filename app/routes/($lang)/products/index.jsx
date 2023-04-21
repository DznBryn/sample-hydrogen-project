import { redirect } from '@shopify/remix-oxygen';

export async function loader() {
  const redirectTo = '/collections/all';
  return redirect(redirectTo);
}

export default function Products() {
  return <></>;
}