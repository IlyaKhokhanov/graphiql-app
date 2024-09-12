/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { useAuthState } from 'react-firebase-hooks/auth';

import { RestClientProps } from './restClient.props';
import { RestRequest, Response, Loader } from '@/components';

import { addToLS, base64url_decode, base64url_encode, showToast, uid } from '@/utils';
import { fetcher } from '@/utils/fetcher';

import { getMessages } from '@/services/intl/wordbook';
import { auth } from '@/services/firebase';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  addHeader,
  addParam,
  setBody,
  setContentType,
  setIsFetched,
  setResponse,
  setWorkUrl,
  startPage,
} from '@/redux/slices/restClientSlice';

import styles from './restClient.module.css';

const stringifyBody = (body: string, contentType: string, forFetch = false, space = -1) => {
  let spaceActual = space;
  if (spaceActual < 0) spaceActual = forFetch ? 0 : 2;

  let result = body;

  try {
    if (contentType !== 'text/plain') result = JSON.stringify(JSON.parse(body), null, spaceActual);
  } catch {
    null;
  }
  if (forFetch) result = encodeURIComponent(result);

  return result;
};

export const RestClient = ({ method, url, options, locale }: RestClientProps) => {
  const dispatch = useAppDispatch();
  const { workUrl, workMethod, body, paramInputs, headerInputs, isFetched, response, contentType } =
    useAppSelector((state) => state.restClient);

  const [user, loading] = useAuthState(auth);
  const messages = getMessages(locale);

  const router = useRouter();

  const requestBuilder = (forFetch = false): { urlReq: string; optionsReq: RequestInit } => {
    const headersArr: string[] = [];
    headerInputs.forEach((el) => {
      if (el.key && el.value) headersArr.push(`${el.key}=${el.value}`);
    });

    const myParams: Record<string, string> = {};
    if (forFetch && body) {
      myParams.body = stringifyBody(body, contentType, false, 0);
      paramInputs.forEach((el) => {
        if (el.key && el.value) {
          const varName = `"{{${el.key}}}"`;
          if (myParams.body.indexOf(varName) >= 0) {
            myParams.body = myParams.body.replaceAll(varName, el.value);
          } else {
            myParams[el.key] = el.value;
          }
        }
      });
      console.log(myParams.body);
      myParams.body = stringifyBody(myParams.body, contentType, true);
    } else {
      paramInputs.forEach((el) => {
        if (el.key && el.value) {
          myParams[el.key] = el.value;
        }
      });
      if (body) {
        myParams.body = stringifyBody(body, contentType, false);
      }
    }
    myParams.contentType = contentType;

    const optionsReq: RequestInit = {
      method: workMethod,
      headers: myParams,
    };
    const paramURL = headersArr.length ? `?${headersArr.join('&')}` : '';
    const endpointURL = workUrl.trim();
    const urlReq = `${endpointURL ? endpointURL : ' '}${paramURL}`;

    return { urlReq, optionsReq };
  };

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace('/');
  }, [user, loading, router]);

  useEffect(() => {
    dispatch(startPage(method.toUpperCase()));
    dispatch(setContentType('text/plain'));

    if (url) {
      const urlAtob = base64url_decode(url);
      const [urlString, headers] = urlAtob.split('?');
      if (headers) {
        const optionArr = headers.split('&');
        optionArr?.forEach((el) => {
          const [key, value] = el.split('=');
          dispatch(addHeader({ id: uid(), key: key, value: value }));
        });
      }
      dispatch(setWorkUrl(urlString.trim()));
    }

    if (options) {
      const optionsAtob = base64url_decode(options);
      const objectOptions = JSON.parse(optionsAtob) as {
        headers?: Record<string, string>;
      };

      let body = '';
      let contentType = 'text/plain';
      Object.entries(objectOptions.headers as unknown as string[]).forEach((el: string[]) => {
        const [key, value] = el;
        if (key === 'body') {
          body = value;
        } else if (key === 'contentType') {
          contentType = value;
        } else {
          dispatch(addParam({ id: uid(), key, value }));
        }
      });
      body = stringifyBody(body, contentType);
      dispatch(setBody(body));
      dispatch(setContentType(contentType));
    }
  }, []);

  useEffect(() => {
    if (isFetched) {
      const { urlReq, optionsReq } = requestBuilder(true);
      void fetcher({ url: urlReq, options: optionsReq }).then(({ body, status }) => {
        dispatch(setResponse({ status, body: body as JSON }));
        dispatch(setIsFetched(false));
      });
    }
  }, [isFetched]);

  useEffect(() => {
    const { urlReq, optionsReq } = requestBuilder();
    const newRoute = `/${locale}/${workMethod}/${base64url_encode(urlReq)}/${base64url_encode(JSON.stringify(optionsReq))}?Content-Type=${contentType}`;
    window.history.replaceState({}, '', newRoute);
  }, [workMethod, workUrl, paramInputs, headerInputs, body, contentType]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (workUrl) {
      try {
        if (contentType !== 'text/plain') JSON.stringify(JSON.parse(body));
      } catch {
        showToast({ message: messages['rest.error.json'], thisError: true });
        return;
      }

      const { urlReq, optionsReq } = requestBuilder();

      addToLS({
        id: user!.uid,
        url: `/${workMethod}/${base64url_encode(urlReq)}/${base64url_encode(JSON.stringify(optionsReq))}?Content-Type=${contentType}`,
        link: urlReq,
        title: workMethod,
        client: 'rest',
      });
      dispatch(setIsFetched(true));
    }
  };

  if (!user) return <Loader />;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <div className={styles.container}>
        <h1 className={styles.header}>
          <FormattedMessage id="rest.header" />
        </h1>
        <div className={styles.wrapper}>
          <RestRequest locale={locale} onSubmit={onSubmit} />
          <Response locale={locale} response={response} isFetched={isFetched} />
        </div>
      </div>
    </IntlProvider>
  );
};
