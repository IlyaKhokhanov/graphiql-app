'use client';

import { useState } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  DocumentNode,
  OperationVariables,
} from '@apollo/client';

import {
  QueryEditor,
  VariablesEditor,
  GraphQlResponse,
  GraphQlDocumentation,
  Button,
  HeadersEditor,
} from '@/components';
import { createApolloClient } from '@/services';

export const GraphiQLClient = () => {
  const [endpoint, setEndpoint] = useState<string>('');
  const [sdlEndpoint, setSdlEndpoint] = useState<string>('');
  const [headers, setHeaders] = useState<Array<Record<string, string>>>([]);
  const [query, setQuery] = useState<DocumentNode | string>('');
  const [variables, setVariables] = useState<string>('');
  const [body, setBody] = useState<Record<string, string>>({});
  const [statusCode, setStatusCode] = useState<string | null>(null);
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject> | null>(null);

  const handleFetch = async () => {
    const apolloClient = createApolloClient(endpoint);
    setClient(apolloClient);

    try {
      const result = await apolloClient.query({
        query: query as DocumentNode,
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
  };

  return (
    <>
      <div>
        <label>Endpoint URL: </label>
        <input type="text" value={endpoint} onChange={(e) => setEndpoint(e.target.value)} />
      </div>
      <div>
        <label>SDL URL: </label>
        <input
          type="text"
          value={sdlEndpoint || `${endpoint}?sdl`}
          onChange={(e) => setSdlEndpoint(e.target.value)}
        />
      </div>
      <HeadersEditor headers={headers} setHeaders={setHeaders} />
      <QueryEditor query={query} setQuery={setQuery} />
      <VariablesEditor variables={variables} setVariables={setVariables} />
      <Button onClick={void handleFetch}>Send query</Button>
      <GraphQlResponse body={body} statusCode={statusCode ? statusCode : 'Empty'} />
      <GraphQlDocumentation client={client} sdlEndpoint={sdlEndpoint} />
    </>
  );
};
