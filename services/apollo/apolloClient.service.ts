import { ApolloClient, InMemoryCache } from '@apollo/client';

export const createApolloClient = (uri: string) => {
  return new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });
};
