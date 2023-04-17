import { Form, useActionData } from '@remix-run/react';
import { json, redirect } from '@shopify/remix-oxygen';
import { login } from '~/utils/mutations/customer';

export async function action({ request, context, params }) {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);
  const { session, storefront } = context;

  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    return json({ message: 'Invalid Credentials.' }, { status: 400 });
  }

  try {
    const customerAccessToken = await login(context, { email, password });
    session.set('customerAccessToken', customerAccessToken);

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
  const actionData = useActionData();
  console.log('Your response from Form data:', actionData);
  return (
    <div>
      <Form
        method='post'
        noValidate
        action='/account/login'
      >
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Email address"
          aria-label="Email address"
          autoFocus   
        />
        <input
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
        <button
          type="submit"
        >
          Login
        </button>
      </Form>
    </div>
  );
}
