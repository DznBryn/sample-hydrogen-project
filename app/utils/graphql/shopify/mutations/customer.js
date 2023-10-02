import {json, redirect} from '@shopify/remix-oxygen';

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
    console.log(
      'SUCCESS: ',
      data?.customerAccessTokenCreate?.customerAccessToken,
    );
    return data?.customerAccessTokenCreate?.customerAccessToken;
  }
  if (data?.customerAccessTokenCreate?.customerUserErrors) {
    console.log('ERROR: ', data?.customerAccessTokenCreate?.customerUserErrors);
    return data?.customerAccessTokenCreate?.customerUserErrors;
  }
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
  console.log('REGISTER: ', data?.customerCreate?.customerUserErrors);
  if (!data?.customerCreate?.customer?.id) {
    return data?.customerCreate?.customerUserErrors;
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

export async function recoverPassword(email, {storefront}) {
  try {
    await storefront.mutate(CUSTOMER_RECOVER_MUTATION, {
      variables: {email},
    });
    return json({resetRequested: true});
  } catch (error) {
    console.log(error);
    return {
      message: 'Something went wrong. Please try again later.',
      status: 500,
    };
  }
}

export async function resetPassword({id, lang, password, resetToken}, context) {
  const {session, storefront} = context;
  try {
    const data = await storefront.mutate(CUSTOMER_RESET_MUTATION, {
      variables: {
        id: `gid://shopify/Customer/${id}`,
        input: {
          password,
          resetToken,
        },
      },
    });

    const {accessToken} = data?.customerReset?.customerAccessToken ?? {};

    if (!accessToken) {
      throw new Error(data?.customerReset?.customerUserErrors.join(', '));
    }

    session.set('customerAccessToken', accessToken);

    return redirect(lang ? `${lang}/account` : '/account', {
      headers: {
        'Set-Cookie': await session.commit(),
      },
    });
  } catch (error) {
    if (storefront.isApiError(error)) {
      return json(
        {
          message: 'Something went wrong. Please try again later.',
        },
        {status: 400},
      );
    }

    return json(
      {
        message: 'Sorry. We could not update your password.',
      },
      {status: 400},
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

const CUSTOMER_RESET_MUTATION = `#graphql
  mutation customerReset($id: ID!, $input: CustomerResetInput!) {
    customerReset(id: $id, input: $input) {
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

// ADDRESS API
export const CREATE_ADDRESS_MUTATION = `#graphql
  mutation customerAddressCreate(
    $address: MailingAddressInput!
    $customerAccessToken: String!
  ) {
    customerAddressCreate(
      address: $address
      customerAccessToken: $customerAccessToken
    ) {
      customerAddress {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const UPDATE_DEFAULT_ADDRESS_MUTATION = `#graphql
  mutation customerDefaultAddressUpdate(
    $addressId: ID!
    $customerAccessToken: String!
  ) {
    customerDefaultAddressUpdate(
      addressId: $addressId
      customerAccessToken: $customerAccessToken
    ) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const UPDATE_ADDRESS_MUTATION = `#graphql
  mutation customerAddressUpdate(
    $address: MailingAddressInput!
    $customerAccessToken: String!
    $id: ID!
  ) {
    customerAddressUpdate(
      address: $address
      customerAccessToken: $customerAccessToken
      id: $id
    ) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const DELETE_ADDRESS_MUTATION = `#graphql
  mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
    customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
      customerUserErrors {
        code
        field
        message
      }
      deletedCustomerAddressId
    }
  }
`;
