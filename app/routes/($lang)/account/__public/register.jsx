import {json, redirect} from '@shopify/remix-oxygen';
import Layouts from '~/layouts';
import {login, register} from '~/utils/graphql/shopify/mutations/customer';
import Register, {links as registerStyles} from '~/modules/accounts/register';

export function links() {
  return [...registerStyles()];
}

export async function action({request, context, params}) {
  const {session, storefront} = context;
  const formData = await request.formData();
  const {email, password} = Object.fromEntries(formData);

  if (password.length < 5) {
    return [
      {
        message:
          'The password you entered is less than 5 characters. Please enter a valid password.',
        field: ['password'],
        code: 'TOO_SHORT',
      },
    ];
  }

  try {
    const res = await register(context, Object.fromEntries(formData));

    if (res?.length > 0) {
      return res;
    }

    const data = await login(context, {email, password});
    if (data?.accessToken) {
      session.set('customerAccessToken', data.accessToken);
      if (
        formData?.get('form_location') &&
        formData.get('form_location') !== ''
      ) {
        return json(data, {
          headers: {
            'Set-Cookie': await session.commit(),
          },
        });
      }
      return redirect(params.lang ? `${params.lang}/account` : '/account', {
        headers: {
          'Set-Cookie': await session.commit(),
        },
      });
    }
    return (
      data?.[0] ?? {
        message: 'Uh-Oh! Something went wrong',
        status: 400,
      }
    );
  } catch (error) {
    if (storefront.isApiError(error)) {
      console.log(error);
      return {message: error, status: 400};
    }
    return {message: error, status: 400};
  }
}

export async function loader({context, params}) {
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
