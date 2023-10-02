import Layouts from '~/layouts';
import { json, redirect } from '@shopify/remix-oxygen';
import { login } from '~/utils/graphql/shopify/mutations/customer';
import LoginForm, { links as loginFormStyles } from '../../../../modules/accounts/login';

export const links = () => {
  return [
    ...loginFormStyles()
  ];
};

export async function action({ request, context, params }) {
  const { session, storefront } = context;
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);

  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    return json({ message: 'Invalid Credentials.' }, { status: 400 });
  }

  try {
    const data = await login(context, { email, password });
    if (data?.length > 0 && data?.[0]?.code) {
      return data;
    }
    if (data?.accessToken){
      session.set('customerAccessToken', data.accessToken);
    }

    return redirect(params.lang ? `${params.lang}/account` : '/account', {
      headers: {
        'Set-Cookie': await session.commit()
      }
    });
  } catch (error) {
    if (storefront.isApiError(error)) {
      return json({ message: 'Something went wrong. Please contact TULA support.' }, { status: 400 });
    }

    return json({ message: 'Account not found! Please try again or sign up.' }, { status: 400 });
  }
}

export async function loader({ context, params }) {
  const customerAccessToken = await context.session.get('customerAccessToken');
  if (customerAccessToken) {
    return redirect(params.lang ? `${params.lang}/account` : '/account');
  }
  return null;
}

export const meta = () => {
  return {
    title: 'Login',
  };
};

export default function LoginPage() {

  return (
    <Layouts.MainNavFooter>
      <LoginForm />
    </Layouts.MainNavFooter>
  );
}
