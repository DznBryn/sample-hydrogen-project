import {redirect} from '@shopify/remix-oxygen';

export default async function logout({request, context}) {
  const {session} = context;
  const formData = await request.formData();
  let redirectTo = formData.get('source');

  if (redirectTo === '/account') redirectTo = '/account/login';

  session.unset('customerAccessToken');

  return redirect(redirectTo || '/', {
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
