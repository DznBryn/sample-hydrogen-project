import { json, redirect } from '@shopify/remix-oxygen';
import React from 'react';
import { activateAccount } from '~/utils/graphql/mutations/customer';

export async function action({ request, context, params }) {
  if (!params?.id || !params?.activationToken || typeof params.id !== 'string' || typeof params.activationToken) {
    return json({
      message: 'Wrong token'
    }, {
      status: 400
    });
  }

  const formData = await request.formData();
  const { password, verifyPassword } = Object.fromEntries(formData);

  if (
    !password || !verifyPassword || typeof password !== 'string' || typeof verifyPassword !== 'string' ||
    password !== verifyPassword
  ) {
    return json({
      message: 'Password does not much'
    }, {
      status: 400
    });
  }

  const { session, storefront } = context;

  try {
    await activateAccount(params?.id, context, { password, verifyPassword });
    return redirect(params?.lang ? `${params.lang}/account` : '/account', {
      headers: {
        'Set-Cookie': await session.commit(),
      },
    });
  } catch (error) {
    if (storefront.isApiError(error)) {
      return json({ message: 'Something went wrong. Please contact TULA support.' }, { status: 400 });
    }

    return json({ message: 'We could not activate your account.' }, { status: 400 });
  }
}

export function meta() {
  return {
    title: 'Activate Account'
  };
}

export default function ActivatePage() {
  // TODO: This component is for when a user needs to activate their account provide by a activation link
  return (
    <div>ActivatePage</div>
  );
}
