'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { DocumentNode, OperationVariables, gql } from '@apollo/client';

import {
  QueryEditor,
  VariablesEditor,
  GraphQlResponse,
  GraphQlDocumentation,
  Button,
  HeadersEditor,
  SchemaType,
} from '@/components';
import { createApolloClient } from '@/services';
import { graphQlSchema } from './graphQlSchema';

export const GraphiQLClient = () => {
  const [endpoint, setEndpoint] = useState<string>('');
  const [sdlEndpoint, setSdlEndpoint] = useState<string>('');
  const [headers, setHeaders] = useState<Array<Record<string, string>>>([]);
  const [query, setQuery] = useState<DocumentNode | string>('');
  const [variables, setVariables] = useState<string>('');
  const [body, setBody] = useState<Record<string, string>>({});
  const [schema, setSchema] = useState<SchemaType | null>(null);
  const [statusCode, setStatusCode] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFetch = useCallback(async () => {
    const apolloClient = createApolloClient(endpoint);
    try {
      const result = await apolloClient.query({
        query: gql`
          ${query as DocumentNode}
        `,
        variables: JSON.parse(variables || '{}') as OperationVariables,
      });

      setBody(result.data as Record<string, string>);
      setStatusCode('' + 200);
    } catch (error) {
      setStatusCode('' + 400);
      if (error instanceof Error) {
        setBody({ message: error.message });
      }
    }
  }, [endpoint, query, variables]);

  const fetchSchema = useCallback(async () => {
    if (sdlEndpoint) {
      const apolloClient = createApolloClient(endpoint);
      try {
        const result = await apolloClient.query<{ __schema: SchemaType }>({
          query: gql(graphQlSchema),
        });

        setSchema(result.data.__schema);
      } catch (err) {
        if (err instanceof Error) {
          setErrorMessage(err.message);
        }
      }
    }
  }, [sdlEndpoint, endpoint]);

  useEffect(() => {
    void fetchSchema();
  }, [sdlEndpoint, fetchSchema]);

  const changeEndpoint = (e: ChangeEvent<HTMLInputElement>) => {
    setEndpoint(e.target.value);
    setSdlEndpoint(`${e.target.value}?sdl`);
  };

  return (
    <>
      <div>
        <label>Endpoint URL: </label>
        <input type="text" value={endpoint} onChange={changeEndpoint} />
      </div>
      <div>
        <label>SDL URL: </label>
        <input type="text" value={sdlEndpoint} onChange={(e) => setSdlEndpoint(e.target.value)} />
      </div>
      <HeadersEditor headers={headers} setHeaders={setHeaders} />
      <QueryEditor query={query} setQuery={setQuery} />
      <VariablesEditor variables={variables} setVariables={setVariables} />
      <Button onClick={() => void handleFetch()}>Send query</Button>
      <GraphQlResponse body={body} statusCode={statusCode ? statusCode : 'Empty'} />
      <GraphQlDocumentation errorMessage={errorMessage} schema={schema} />
    </>
  );
};
