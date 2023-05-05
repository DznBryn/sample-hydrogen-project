import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: 'https://mstl3bgb.api.sanity.io/v1/graphql/production/default',
  cache: new InMemoryCache(),
  ssrMode: true,
});

export default apolloClient;
