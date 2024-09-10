import { DocumentNode, gql, OperationVariables } from '@apollo/client';

import { SchemaType } from '@/components';
import { createApolloClient } from '@/services';
import { graphQlSchema } from './graphQlSchema';
import { ApolloFetchParam, ApolloGetSchemaParam } from './graphQl.types';

export const handleFetch = async ({
  endpoint,
  headers,
  query,
  variables,
  callbackSetBody,
  callbackSetStatus,
}: ApolloFetchParam) => {
  const apolloClient = createApolloClient(endpoint);

  const headersObject = headers.reduce(
    (acc, header) => {
      if (header.key && header.value) {
        acc[header.key] = header.value;
      }
      return acc;
    },
    {} as Record<string, string>
  );

  try {
    const result = await apolloClient.query({
      query: gql`
        ${query as DocumentNode}
      `,
      variables: JSON.parse(variables || '{}') as OperationVariables,
      context: {
        headers: headersObject,
      },
    });

    callbackSetBody(result.data as Record<string, string>);
    callbackSetStatus(200);
  } catch (error) {
    callbackSetStatus(400);
    if (error instanceof Error) {
      callbackSetBody({ message: error.message });
    }
  }
};

export const fetchSchema = async ({
  endpoint,
  sdlEndpoint,
  callbackSetSchema,
  callbackSetErrorMessage,
}: ApolloGetSchemaParam) => {
  if (sdlEndpoint) {
    const apolloClient = createApolloClient(endpoint);
    try {
      const result = await apolloClient.query<{ __schema: SchemaType }>({
        query: gql(graphQlSchema),
      });

      callbackSetSchema(result.data.__schema);
    } catch (err) {
      if (err instanceof Error) {
        callbackSetErrorMessage(err.message);
      }
    }
  }
};
