'use client';

import { useCallback } from 'react';
import { DocumentNode, OperationVariables, gql } from '@apollo/client';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import {
  QueryEditor,
  VariablesEditor,
  GraphQlResponse,
  GraphQlDocumentation,
  Button,
  HeadersEditor,
  SchemaType,
  EndpointInput,
  SdlInput,
} from '@/components';
import { createApolloClient } from '@/services';
import { graphQlSchema } from './graphQlSchema';
import { getIntl } from '@/services/intl/intl';

import { QraphiQLClientProps } from './graphiQLClient.props';
import {
  setBody,
  setErrorMessage,
  setQuery,
  setSchema,
  setStatusCode,
  setVariables,
} from '@/redux/slices/graphQlSlice';

import styles from './graphiQLClient.module.css';

export const GraphiQLClient = ({ params }: QraphiQLClientProps) => {
  const intl = getIntl(params.locale);

  const dispatch = useAppDispatch();
  const {
    body,
    endpoint,
    errorMessage,
    headers,
    query,
    schema,
    sdlEndpoint,
    statusCode,
    variables,
  } = useAppSelector((state) => state.graphQlSlice);

  const handleFetch = useCallback(async () => {
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

      dispatch(setBody(result.data as Record<string, string>));
      dispatch(setStatusCode('' + 200));
    } catch (error) {
      dispatch(setStatusCode('' + 400));
      if (error instanceof Error) {
        dispatch(setBody({ message: error.message }));
      }
    }
  }, [endpoint, query, variables, headers, dispatch]);

  const fetchSchema = useCallback(async () => {
    if (sdlEndpoint) {
      const apolloClient = createApolloClient(endpoint);
      try {
        const result = await apolloClient.query<{ __schema: SchemaType }>({
          query: gql(graphQlSchema),
        });

        dispatch(setSchema(result.data.__schema));
      } catch (err) {
        if (err instanceof Error) {
          setErrorMessage(err.message);
        }
      }
    }
  }, [sdlEndpoint, endpoint, dispatch]);

  return (
    <>
      <h1 className={styles.title}>{intl.formatMessage({ id: 'client.graphql.head' })}</h1>
      <section className={styles.graphql}>
        <section className={styles.tools}>
          <div className={styles.request}>
            <EndpointInput />
            <SdlInput />
            <HeadersEditor headers={headers} />
            <QueryEditor query={query} setQuery={setQuery} />
            <VariablesEditor variables={variables} setVariables={setVariables} />
            <Button onClick={() => void handleFetch()}>Send query</Button>
            <Button onClick={() => void fetchSchema()}>Get schema</Button>
            <section className={styles.documentation}>
              <GraphQlDocumentation errorMessage={errorMessage} schema={schema} />
            </section>
          </div>
        </section>

        <section className={styles.response}>
          <GraphQlResponse body={body} statusCode={statusCode ? statusCode : ''} />
        </section>
      </section>
    </>
  );
};
