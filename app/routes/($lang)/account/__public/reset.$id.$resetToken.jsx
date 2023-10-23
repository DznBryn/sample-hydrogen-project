import { json } from '@shopify/remix-oxygen';
import { resetPassword } from '~/utils/graphql/shopify/mutations/customer';
import ResetPasswordForm, { links as resetPasswordStyles } from '~/modules/accounts/resetPassword';
import Layouts from '~/layouts';

export function links() {
  return [
    ...resetPasswordStyles(),
  ];
}

export const meta = () => {
  return {
    title: 'Reset Password',
  };
};

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
    return json(
      {
        message: 'Wrong token. Please try to reset your password again.',
      },
      { status: 400 },
    );
  }

  const formData = await request.formData();

  const password = formData.get('password');
  const passwordConfirm = formData.get('confirmPassword');

  if (
    !password ||
    !passwordConfirm ||
    typeof password !== 'string' ||
    typeof passwordConfirm !== 'string' ||
    password !== passwordConfirm
  ) {
    return json(
      {
        message: 'Please provide matching passwords',
      },
      { status: 400 },
    );
  }

  const data = await resetPassword(
    {
      id,
      lang,
      password,
      resetToken,
    },
    context,
  );

  return data;
};

export default function Reset() {
  return <Layouts.MainNavFooter>
    <ResetPasswordForm />
  </Layouts.MainNavFooter>;
}


