import { DocumentNode, gql, OperationVariables } from '@apollo/client';

import { SchemaType } from '@/components';
import { createApolloClient, createApolloClientSchema, CustomApolloError } from '@/services';
import { graphQlSchema } from './graphQlSchema';
import { ApolloFetchParam, ApolloGetSchemaParam } from './graphQl.types';
import { showToast } from '../showtoast';

export const handleFetch = async ({
  endpoint: uri,
  headers,
  query,
  variables,
  callbackSetBody,
  callbackSetStatus,
  callbackSetIsLoading,
  callbackSetErrorMessageResponse,
}: ApolloFetchParam) => {
  callbackSetIsLoading(true);

  const onErrorCallback = ({ message, status }: CustomApolloError) => {
    if (status === 500) showToast({ message: 'failed to fetch', thisError: true });
    callbackSetStatus(status);
    callbackSetBody({ message });
  };

  const headersObject = headers.reduce(
    (acc, header) => {
      if (header.key && header.value) {
        acc[header.key] = header.value;
      }
      return acc;
    },
    {} as Record<string, string>
  );

  const apolloClient = createApolloClient({ uri, onErrorCallback, headersObject });

  try {
    const result = await apolloClient.query({
      query: gql`
        ${query as DocumentNode}
      `,
      variables: JSON.parse(variables || '{}') as OperationVariables,
    });

    callbackSetBody(result.data as Record<string, string>);
    callbackSetStatus(200);
    callbackSetErrorMessageResponse('');
  } catch (error) {
    if (error instanceof Error) {
      callbackSetBody({ error: `${error.message}` });
      callbackSetErrorMessageResponse(error.message);
      if (error.message.includes('Syntax Error')) callbackSetStatus(400);
    }
  } finally {
    callbackSetIsLoading(false);
  }
};

export const fetchSchema = async ({
  sdlEndpoint,
  callbackSetSchema,
  callbackSetErrorMessage,
  callbackSetIsLoadingSchema,
}: ApolloGetSchemaParam) => {
  if (sdlEndpoint) {
    callbackSetIsLoadingSchema(true);

    const apolloClient = createApolloClientSchema(sdlEndpoint);
    try {
      const result = await apolloClient.query<{ __schema: SchemaType }>({
        query: gql(graphQlSchema),
      });

      callbackSetSchema(result.data.__schema);
      callbackSetErrorMessage('');
    } catch (err) {
      if (err instanceof Error) {
        callbackSetErrorMessage(err.message);
        callbackSetSchema(null);
      }
    } finally {
      callbackSetIsLoadingSchema(false);
    }
  }
};
