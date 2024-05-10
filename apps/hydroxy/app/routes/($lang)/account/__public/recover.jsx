import {json, redirect} from '@shopify/remix-oxygen';
import Layouts from '~/layouts';
import ForgotPasswordForm, {
  links as forgotPasswordStyles,
} from '~/modules/accounts/forgotPassword';
import {recoverPassword} from '~/utils/graphql/shopify/mutations/customer';

export function links() {
  return [...forgotPasswordStyles()];
}
export async function action({request, context}) {
  const formData = await request.formData();
  const email = formData.get('email') || formData.get('forgotEmail');
  const data = await recoverPassword(email, context);

  if (data?.status === 500) return data;

  return json({message: 'Success', status: 200});
}

export async function loader({context, params}) {
  const customerAccessToken = await context.session.get('customerAccessToken');
  const {lang} = params;
  if (typeof customerAccessToken === 'string') {
    return redirect(lang ? `${lang}/account` : '/account');
  }
  return new Response(null);
}

export default function Recover() {
  return (
    <Layouts.MainNavFooter>
      <ForgotPasswordForm />
    </Layouts.MainNavFooter>
  );
}
