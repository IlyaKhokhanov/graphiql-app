'use client';

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
import { getIntl } from '@/services/intl/intl';
import { QraphiQLClientProps } from './graphiQLClient.props';
import { setBody, setErrorMessage, setSchema, setStatusCode } from '@/redux/slices/graphQlSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchSchema, handleFetch } from '@/utils';

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

  const callbackSetBody = (data: Record<string, string>) => {
    dispatch(setBody(data));
  };

  const callbackSetStatus = (statusCode: number) => {
    dispatch(setStatusCode('' + statusCode));
  };

  const callbackSetSchema = (schema: SchemaType) => {
    dispatch(setSchema(schema));
  };

  const callbackSetErrorMessage = (message: string) => {
    setErrorMessage(message);
  };

  return (
    <>
      <h1 className={styles.title}>{intl.formatMessage({ id: 'client.graphql.head' })}</h1>
      <section className={styles.graphql}>
        <section className={styles.tools}>
          <div className={styles.request}>
            <EndpointInput endpoint={endpoint} sdlEndpoint={sdlEndpoint} />
            <SdlInput sdlEndpoint={sdlEndpoint} />
            <HeadersEditor headers={headers} />
            <QueryEditor query={query} />
            <VariablesEditor variables={variables} />
            <Button
              type="button"
              onClick={() =>
                void handleFetch({
                  endpoint,
                  headers,
                  query,
                  variables,
                  callbackSetBody,
                  callbackSetStatus,
                })
              }
            >
              Send query
            </Button>
            <Button
              type="button"
              onClick={() =>
                void fetchSchema({
                  endpoint,
                  sdlEndpoint,
                  callbackSetSchema,
                  callbackSetErrorMessage,
                })
              }
            >
              Get schema
            </Button>
          </div>
          <section className={styles.documentation}>
            <GraphQlDocumentation errorMessage={errorMessage} schema={schema} />
          </section>
        </section>

        <section className={styles.response}>
          <GraphQlResponse body={body} statusCode={statusCode ? statusCode : ''} />
        </section>
      </section>
    </>
  );
};
