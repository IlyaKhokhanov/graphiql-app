/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FormattedMessage, IntlProvider } from 'react-intl';

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
  addHeader,
  setBody,
  setEndpoint,
  setErrorMessage,
  setIsFetchedSchema,
  setQuery,
  setSchema,
  setStatusCode,
  setVariables,
  startPage,
} from '@/redux/slices/graphQlSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addToLS, base64url_decode, fetchSchema, handleFetch, uid } from '@/utils';
import { auth } from '@/services/firebase';
import { getMessages } from '@/services/intl/wordbook';
import { setIsFetched } from '@/redux/slices/graphQlSlice';
import { base64url_encode } from '@/utils';

import styles from './graphiQLClient.module.css';

export const GraphiQLClient = ({ url, options, locale }: QraphiQLClientProps) => {
  const intl = getIntl(locale);
  const messages = getMessages(locale);

  const router = useRouter();
  const searchParams = useSearchParams();
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

  const callbackSetSchema = (schema: SchemaType | null) => {
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
    dispatch(startPage());

    if (url) {
      const urlAtob = base64url_decode(url);
      dispatch(setEndpoint(urlAtob.trim()));
    }

    if (options) {
      const optionsAtob = base64url_decode(options);
      const objectOptions = JSON.parse(optionsAtob) as {
        query?: string;
        variables?: string;
      };
      dispatch(setQuery(objectOptions.query ?? ''));
      dispatch(setVariables(objectOptions.variables ?? ''));

      if (searchParams) {
        searchParams.forEach((value, key) => {
          dispatch(addHeader({ id: uid(), key: key, value: value }));
        });
      }
    }
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace('/');
  }, [user, loading, router]);

  const partQuery = () => {
    const partBody = { query, variables };
    const encodeBody = base64url_encode(JSON.stringify(partBody));

    const partParam: string[] = [];
    headers.forEach((el) => {
      if (el.key && el.value) partParam.push(`${el.key}=${el.value}`);
    });
    const partSearchParam = partParam.length ? `?${partParam.join('&')}` : '';
    let partURL = ' ';
    if (endpoint) partURL = endpoint.trim();
    const encodeURL = base64url_encode(partURL);

    const newRoute = `/${locale}/GRAPHQL/${encodeURL}/${encodeBody}${partSearchParam}`;
    const simpleRoute = `/GRAPHQL/${encodeURL}/${encodeBody}${partSearchParam}`;
    const endpointURL = `${partURL}${partSearchParam}`;

    return { endpointURL, simpleRoute, newRoute };
  };

  useEffect(() => {
    const { newRoute } = partQuery();
    window.history.replaceState({}, '', newRoute);
  }, [endpoint, headers, locale, query, variables]);

  if (!user) return <Loader />;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <h1 className={styles.title}>{intl.formatMessage({ id: 'client.graphql.head' })}</h1>

      <div className={styles.wrapper}>
        <div className={styles.request}>
          <EndpointInput locale={locale} endpoint={endpoint} sdlEndpoint={sdlEndpoint} />
          <SdlInput sdlEndpoint={sdlEndpoint} endpoint={endpoint} />
          <HeadersEditor headers={headers} locale={locale} />
          <QueryEditor locale={locale} />
          <VariablesEditor locale={locale} variables={variables} />
          <Button
            type="button"
            disabled={!endpoint}
            onClick={() => {
              addToLS({
                id: user.uid,
                url: `${partQuery().simpleRoute}`,
                link: `${partQuery().endpointURL}`,
                title: 'GRAPHQL',
                client: 'graph',
              });

              void handleFetch({
                endpoint,
                headers,
                query,
                variables,
                callbackSetBody,
                callbackSetStatus,
                callbackSetIsLoading,
              });
            }}
          >
            <FormattedMessage id="graph.send.button" />
          </Button>
          <Button
            disabled={!sdlEndpoint}
            type="button"
            onClick={() =>
              void fetchSchema({
                sdlEndpoint,
                callbackSetSchema,
                callbackSetErrorMessage,
                callbackSetIsLoadingSchema,
              })
            }
          >
            <FormattedMessage id="graph.schema.button" />
          </Button>
        </div>
        <Response
          response={{
            body: body as unknown as JSON,
            status: Number(statusCode) ? Number(statusCode) : null,
          }}
          locale={locale}
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
