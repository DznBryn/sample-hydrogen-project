import { Form, Link } from '@remix-run/react';
import { json, redirect } from '@shopify/remix-oxygen';
import { login, register } from '~/utils/graphql/shopify/mutations/customer';

export async function action({ request, context, params }) {
  const { session, storefront } = context;
  const formData = await request.formData();
  const { email, password} = Object.fromEntries(formData);

  if (
    !email ||
    !password ||
    typeof email !== 'string' ||
    typeof password !== 'string'
  ) {
    return json({ message: 'Email and Password are required' }, { status: 400 });
  }

  try {
    await register(context, Object.fromEntries(formData));

    const customerAccessToken = await login(context, { email, password });
    session.set('customerAccessToken', customerAccessToken);

    return redirect(params.lang ? `${params.lang}/account` : '/account', {
      headers: {
        'Set-Cookie': await session.commit()
      }
    });
  } catch (error) {
    if (storefront.isApiError(error)) {
      console.log(error);
      return json({ message: 'Something went wrong. Please contact TULA support.' }, { status: 400 });
    }
    console.log(error);
    return json({ message: 'Account could not be created with this email. User might already exist, try to login instead' }, { status: 400 });
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
    <div>
      <h1>Create an account</h1>
      <Form
        method='post'
        noValidate
        action='/account/register'
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 15,
        }}
      >
        <input
          id="firstName"
          name="firstName"
          type="text"
          autoComplete="firstName"
          required
          placeholder="First Name"
          aria-label="First Name"
          autoFocus
        />
        <input
          id="lastName"
          name="lastName"
          type="text"
          autoComplete="lastName"
          required
          placeholder="Last Name"
          aria-label="Last Name"
          autoFocus
        />
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
        <input 
          id="phone" 
          name="phone" 
          type="tel" 
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
          aria-describedby="phone-format" 
        />
        <small id="phone-format">Format: 123-456-7890</small>
        <label htmlFor="agree-checkbox">
          <input 
            type="checkbox" 
            id="acceptsMarketing" 
            name="acceptsMarketing" 
            aria-describedby="agree-checkbox-format" 
          />
          <small id="agree-checkbox-format">Please check this box to agree to the terms and conditions</small>
        </label>

        <button
          type="submit"
        >
          Sign up
        </button>
      </Form>
      <br />
      <Link to={'/account/login'}>Sign in</Link>
    </div>
  );
}
