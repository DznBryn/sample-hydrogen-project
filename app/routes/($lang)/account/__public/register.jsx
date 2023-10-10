import { json, redirect } from '@shopify/remix-oxygen';
import Layouts from '~/layouts';
import { login, register } from '~/utils/graphql/shopify/mutations/customer';
import Register, { links as registerStyles } from '~/modules/accounts/register';

export function links() {
  return [...registerStyles()];
}

export async function action({ request, context, params }) {
  const { session, storefront } = context;
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);

  if (password.length > 8) {
    return json({ message: 'The email address you entered is too long. Please enter a valid email address.', field: ['password'], code: 'TOO_LONG' });
  }

  try {
    const res = await register(context, Object.fromEntries(formData));

    if (res?.length > 0) {
      return res;
    }

    const data = await login(context, { email, password });
    if (data?.accessToken) {
      session.set('customerAccessToken', data.accessToken);
      return redirect(params.lang ? `${params.lang}/account` : '/account', {
        headers: {
          'Set-Cookie': await session.commit()
        }
      });
    }
    return data?.[0] ?? {
      message: 'Uh-Oh! Something went wrong',
      status: 400
    };
  } catch (error) {
    if (storefront.isApiError(error)) {
      console.log(error);
      return { message: error, status: 400 };
    }
    return { message: error, status: 400 };
  }

}

export async function loader({ context, params }) {
  const customerAccessToken = await context.session.get('customerAccessToken');
  if (customerAccessToken) {
    return redirect(params.lang ? `${params.lang}/account` : '/account');
  }
  return null;
}

export default function RegisterPage() {
  return (
    <Layouts.MainNavFooter>
      <Register />
    </Layouts.MainNavFooter>
  );
}


