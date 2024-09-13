'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

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
  Loader,
} from '@/components';
import { getIntl } from '@/services/intl/intl';
import { QraphiQLClientProps } from './graphiQLClient.props';
import { setBody, setErrorMessage, setSchema, setStatusCode } from '@/redux/slices/graphQlSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchSchema, handleFetch } from '@/utils';
import { auth } from '@/services/firebase';

import styles from './graphiQLClient.module.css';

export const GraphiQLClient = ({ params }: QraphiQLClientProps) => {
  const intl = getIntl(params.locale);
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

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

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace('/');
  }, [user, loading, router]);

  if (!user) return <Loader />;

  return (
    <>
      <h1 className={styles.title}>{intl.formatMessage({ id: 'client.graphql.head' })}</h1>
      <section className={styles.graphql}>
        <section className={styles.tools}>
          <div className={styles.request}>
            <EndpointInput endpoint={endpoint} sdlEndpoint={sdlEndpoint} />
            <SdlInput sdlEndpoint={sdlEndpoint} endpoint={endpoint} />
            <HeadersEditor headers={headers} />
            <QueryEditor />
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
