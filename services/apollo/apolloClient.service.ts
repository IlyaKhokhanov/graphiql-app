import { onError } from '@apollo/client/link/error';
import {
  ApolloClient,
  ApolloLink,
  FetchResult,
  HttpLink,
  InMemoryCache,
  NextLink,
  Operation,
  ServerParseError,
} from '@apollo/client';
import { Observable } from '@apollo/client/utilities';

import { ApolloServiceParam } from '..';

export const createApolloClient = ({ uri, headersObject, onErrorCallback }: ApolloServiceParam) => {
  const proxyUri = `/api/graphQlProxy?url=${encodeURIComponent(uri)}`;

  const httpLink = new HttpLink({ uri: proxyUri });

  const errorLink = onError(({ networkError, graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) => {
        onErrorCallback({ status: 400, message: `${message}` });
      });
    }

    if (networkError) {
      const badRequest = networkError as ServerParseError;
      onErrorCallback({ status: badRequest.statusCode, message: `${badRequest.message}` });
    }
  });

  const authLink = new ApolloLink((operation: Operation, forward: NextLink) => {
    operation.setContext(({ headers: existingHeaders = {} }) => ({
      headers: {
        ...existingHeaders,
        ...headersObject,
      },
    }));

    return forward(operation).flatMap((result: FetchResult) => {
      return Observable.of(result);
    });
  });

  return new ApolloClient({
    link: ApolloLink.from([authLink, errorLink, httpLink]),
    cache: new InMemoryCache(),
  });
};

export const createApolloClientSchema = (uri: string) => {
  const proxyUri = `/api/graphQlProxy?url=${encodeURIComponent(uri)}`;

  const httpLink = new HttpLink({ uri: proxyUri });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};
