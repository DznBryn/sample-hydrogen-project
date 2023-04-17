export async function login({storefront}, {email, password}) {
  const data = await storefront.mutate(LOGIN_MUTATION, {
    variables: {
      input: {
        email,
        password
      }
    }
  });

  if(data?.customerAccessTokenCreate?.customerAccessToken?.accessToken){
    return data?.customerAccessTokenCreate?.customerAccessToken?.accessToken;
  }

  // Should change this error handle?
  throw new Error(
    data?.customerAccessTokenCreate?.customerUserErrors.join(', '),
  );
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
