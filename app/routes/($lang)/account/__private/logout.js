import {redirect, json} from '@shopify/remix-oxygen';

export default async function logout({request, context}, noRedirect = false) {
  const {session, storefront} = context;
  session.unset('customerAccessToken');
  console.log('logout', {storefront, request: request.url});
  // Redirect to the current page

  if (noRedirect) return json({message: 'Success', status: 200});

  return redirect('/', {
    headers: {
      'Set-Cookie': await session.commit(),
    },
  });
}

export async function loader({request, context}) {
  return logout({request, context});
}

export const action = async ({request, context}) => {
  return logout({request, context});
};
