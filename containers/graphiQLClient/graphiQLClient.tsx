'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IntlProvider } from 'react-intl';

import {
  QueryEditor,
  VariablesEditor,
  GraphQlDocumentation,
  Button,
  HeadersEditor,
  SchemaType,
  EndpointInput,
  SdlInput,
  Loader,
  Response,
} from '@/components';
import { getIntl } from '@/services/intl/intl';
import { QraphiQLClientProps } from './graphiQLClient.props';
import {
  setBody,
  setErrorMessage,
  setIsFetchedSchema,
  setSchema,
  setStatusCode,
} from '@/redux/slices/graphQlSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchSchema, handleFetch } from '@/utils';
import { auth } from '@/services/firebase';
import { getMessages } from '@/services/intl/wordbook';
import { setIsFetched } from '@/redux/slices/graphQlSlice';

import styles from './graphiQLClient.module.css';

export const GraphiQLClient = ({ params }: QraphiQLClientProps) => {
  const intl = getIntl(params.locale);
  const messages = getMessages(params.locale);

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
    isFetched,
    isFetchedSchema,
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
    dispatch(setErrorMessage(message));
  };

  const callbackSetIsLoading = (fetching: boolean) => {
    dispatch(setIsFetched(fetching));
  };

  const callbackSetIsLoadingSchema = (fetching: boolean) => {
    dispatch(setIsFetchedSchema(fetching));
  };

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace('/');
  }, [user, loading, router]);

  if (!user) return <Loader />;

  return (
    <IntlProvider locale={params.locale} messages={messages}>
      <h1 className={styles.title}>{intl.formatMessage({ id: 'client.graphql.head' })}</h1>

      <div className={styles.wrapper}>
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
                callbackSetIsLoading,
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
                callbackSetIsLoadingSchema,
              })
            }
          >
            Get schema
          </Button>
        </div>
        <Response
          response={{
            body: body as unknown as JSON,
            status: Number(statusCode) ? Number(statusCode) : null,
          }}
          locale={params.locale}
          isFetched={isFetched}
        />
      </div>

      <div className={styles.documentation}>
        {isFetchedSchema && <Loader />}
        {!isFetchedSchema && <GraphQlDocumentation errorMessage={errorMessage} schema={schema} />}
      </div>
    </IntlProvider>
  );
};
