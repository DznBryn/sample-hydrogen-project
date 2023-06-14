import { json } from '@shopify/remix-oxygen';
import { Form, useActionData } from '@remix-run/react';
import { useRef } from 'react';
import { resetPassword } from '~/utils/graphql/shopify/mutations/customer';

export const action = async ({
  request,
  context,
  params: { lang, id, resetToken },
}) => {
  if (
    !id ||
    !resetToken ||
    typeof id !== 'string' ||
    typeof resetToken !== 'string'
  ) {
    return json({
      message: 'Wrong token. Please try to reset your password again.',
    }, { status: 400 });
  }

  const formData = await request.formData();

  const password = formData.get('password');
  const passwordConfirm = formData.get('passwordConfirm');

  if (
    !password ||
    !passwordConfirm ||
    typeof password !== 'string' ||
    typeof passwordConfirm !== 'string' ||
    password !== passwordConfirm
  ) {
    return json({
      message: 'Please provide matching passwords',
    }, { status: 400 });
  }

  const data = new resetPassword({
    id,
    lang,
    password,
    resetToken
  }, context);

  return data;
};

export const meta = () => {
  return {
    title: 'Reset Password',
  };
};

export default function Reset() {
  const actionData = useActionData();

  const passwordInput = useRef(null);
  const passwordConfirmInput = useRef(null);

  return (
    <div className="flex justify-center my-24 px-4">
      <div className="max-w-md w-full">
        <h1 className="text-4xl">Reset Password.</h1>
        <p className="mt-4">Enter a new password for your account.</p>
        <Form
          method="post"
          noValidate
          className="pt-6 pb-8 mt-4 mb-4 space-y-3"
        >
          {actionData?.message && (
            <div className="flex items-center justify-center mb-6 bg-zinc-500">
              <p className="m-4 text-s text-contrast">{actionData.message}</p>
            </div>
          )}
          <div className="mb-3">
            <input
              ref={passwordInput}
              className={'mb-1'}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              aria-label="Password"
              minLength={8}
              required
              autoFocus
            />

          </div>
          <div className="mb-3">
            <input
              ref={passwordConfirmInput}
              className={'mb-1'}
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              autoComplete="current-password"
              placeholder="Re-enter password"
              aria-label="Re-enter password"
              minLength={8}
              required
              autoFocus
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-primary text-contrast rounded py-2 px-4 focus:shadow-outline block w-full"
              type="submit"
            >
              Save
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}


