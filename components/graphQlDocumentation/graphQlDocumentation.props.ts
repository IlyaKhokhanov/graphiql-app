import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

export type GraphQlDocumentationProps = {
  client: ApolloClient<NormalizedCacheObject> | null;
  sdlEndpoint: string;
};
