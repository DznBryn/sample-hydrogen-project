import {redirect} from '@shopify/remix-oxygen';

export default async function logout(context) {
  const {session} = context;
  session.unset('customerAccessToken');
  return redirect(
    `${context?.storefront?.i18n?.pathPrefix ?? ''}/account/login`,
    {
      headers: {
        'Set-Cookie': await session.commit(),
      },
    },
  );
}

export async function loader({context}) {
  return redirect(context?.storefront?.i18n?.pathPrefix ?? '/');
}

export const action = async ({context}) => {
  return logout(context);
};
