import {json} from '@shopify/remix-oxygen';

export async function login({storefront}, {email, password}) {
  const data = await storefront.mutate(LOGIN_MUTATION, {
    variables: {
      input: {
        email,
        password,
      },
    },
  });

  if (data?.customerAccessTokenCreate?.customerAccessToken?.accessToken) {
    return data?.customerAccessTokenCreate?.customerAccessToken?.accessToken;
  }

  // Should change this error handle?
  throw new Error(
    data?.customerAccessTokenCreate?.customerUserErrors.join(', '),
  );
}

export async function register({storefront}, customerObj) {
  const data = await storefront.mutate(REGISTER_MUTATION, {
    variables: {
      input: {
        firstName: customerObj?.firstName,
        lastName: customerObj?.lastName,
        email: customerObj?.email,
        password: customerObj?.password,
        acceptsMarketing: false,
      },
    },
  });
  console.log('Show data', customerObj.acceptsMarketing);
  if (!data?.customerCreate?.customer?.id) {
    console.log(data?.customerCreate?.customerUserErrors);
    throw new Error(data?.customerCreate?.customerUserErrors.join(', '));
  }
}

export async function activateAccount(
  id,
  {session, storefront},
  {password, verifyPassword},
) {
  const data = await storefront.mutate(CUSTOMER_ACTIVATE_MUTATION, {
    variables: {
      id: `gid://shopify/Customer/${id}`,
      input: {
        password,
        verifyPassword,
      },
    },
  });

  const {customerAccessToken} =
    data?.customerActivate?.customerAccessToken ?? {};

  if (!customerAccessToken) {
    throw new Error(data?.customerActivate?.customerUserErrors.join(', '));
  }

  return session.set('customerAccessToken', customerAccessToken);
}

export async function recoverPassword({email}, context) {
  if (!email || typeof email !== 'string') {
    return json(
      {
        message: 'Please provide an email.',
      },
      {status: 400},
    );
  }

  try {
    await context.storefront.mutate(CUSTOMER_RECOVER_MUTATION, {
      variables: {email},
    });

    return json({resetRequested: true});
  } catch (error) {
    return (
      {
        message: 'Something went wrong. Please try again later.',
      },
      {status: 400}
    );
  }
}

const LOGIN_MUTATION = `#graphql
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!){
    customerAccessTokenCreate(input: $input){
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const REGISTER_MUTATION = `#graphql
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer{
        id
        firstName
      },
      customerUserErrors {
        code
        field 
        message
      }
    }
  }
`;

const CUSTOMER_ACTIVATE_MUTATION = `#graphql
  mutation customerActivate($id: ID!, $input: CustomerActivateInput!){
    customerActivate(id: $id, input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const CUSTOMER_RECOVER_MUTATION = `#graphql
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
