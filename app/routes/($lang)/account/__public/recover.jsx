import { Form, useLoaderData } from '@remix-run/react';
import { redirect } from '@shopify/remix-oxygen';
import React from 'react';
import { recoverPassword } from '~/utils/graphql/shopify/mutations/customer';

export async function action({ request, context }) {
  const data = await request.formData();
  const email = data.get('email');

  return {
    data: await recoverPassword({ email }, context)
  };
}
export async function loader({ context, params }) {
  const customerAccessToken = await context.session.get('customerAccessToken');
  const { lang } = params;
  if (customerAccessToken) {
    return redirect(lang ? `${lang}/account` : '/account');
  }
  return new Response(null);
}
export const meta = () => {
  return {
    title: 'Recover Password',
  };
};
export default function Recover() {
  const { data } = useLoaderData()
  console.log("Recover data:", data)
  return (
    <Form
      method="post"
      noValidate
      className=''
    >
      <input
        className=''
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="Email address"
        aria-label="Email address"
        autoFocus
      />
      <button type='submit'>Reset Link</button>
    </Form>
  );
}
