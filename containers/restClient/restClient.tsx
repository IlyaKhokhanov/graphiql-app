/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { useAuthState } from 'react-firebase-hooks/auth';

import { RestClientProps } from './restClient.props';
import { RestRequest, RestResponse } from '@/components';
import { addToLS, base64url_decode, base64url_encode, uid } from '@/utils';

import { getMessages } from '@/services/intl/wordbook';
import { auth } from '@/services/firebase';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  addHeader,
  addParam,
  setBody,
  setIsFetched,
  setResponse,
  setWorkUrl,
  startPage,
} from '@/redux/slices/restClientSlice';

import styles from './restClient.module.css';
import { fetcher } from '@/utils/fetcher';

export const RestClient = ({ method, url, options, locale }: RestClientProps) => {
  const dispatch = useAppDispatch();
  const { workUrl, workMethod, body, paramInputs, headerInputs, isFetched } = useAppSelector(
    (state) => state.restClient
  );

  const [user, loading] = useAuthState(auth);
  const messages = getMessages(locale);

  const router = useRouter();

  const requestBuilder = (): { urlReq: string; optionsReq: RequestInit } => {
    const parmsArr: string[] = [];
    paramInputs.forEach((el) => {
      if (el.key && el.value) parmsArr.push(`${el.key}=${el.value}`);
    });
    const myHeaders: Record<string, string> = {};
    headerInputs.forEach((el) => {
      if (el.key && el.value) {
        myHeaders[el.key] = el.value;
      }
    });
    if (body) myHeaders.body = body;

    const optionsReq: RequestInit = {
      method: workMethod,
      headers: myHeaders,
    };
    const urlReq = workUrl + (parmsArr.length ? `?${parmsArr.join('&')}` : '');

    return { urlReq, optionsReq };
  };

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace('/');
  }, [user, loading, router]);

  useEffect(() => {
    dispatch(startPage(method));
    if (url) {
      const urlAtob = base64url_decode(url);
      const [urlString, params] = urlAtob.split('?');
      if (params) {
        const optionArr = params.split('&');
        optionArr?.forEach((el) => {
          const [key, value] = el.split('=');
          dispatch(addParam({ id: uid(), key: key, value: value }));
        });
      }
      dispatch(setWorkUrl(urlString));
    }

    if (options) {
      const optionsAtob = base64url_decode(options);
      const objectOptions = JSON.parse(optionsAtob) as {
        headers?: Record<string, string>;
      };

      Object.entries(objectOptions.headers as unknown as string[]).forEach((el: string[]) => {
        const [key, value] = el;
        if (key === 'body') {
          dispatch(setBody(value));
        } else {
          dispatch(addHeader({ id: uid(), key, value }));
        }
      });
    }

    // if (url) dispatch(setIsFetched(true));
  }, []);

  useEffect(() => {
    if (isFetched) {
      const { urlReq, optionsReq } = requestBuilder();

      void fetcher({ url: urlReq, options: optionsReq }).then(({ body, status }) => {
        dispatch(setResponse({ status, body: body as JSON }));
        dispatch(setIsFetched(false));
      });
    }
  }, [isFetched]);

  useEffect(() => {
    if (workUrl) {
      const { urlReq, optionsReq } = requestBuilder();
      const newRoute = `/${locale}/${workMethod}/${base64url_encode(urlReq)}/${base64url_encode(JSON.stringify(optionsReq))}`;
      window.history.replaceState({}, '', newRoute);
    }
  }, [workMethod, workUrl, paramInputs, headerInputs, body]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (workUrl) {
      const { urlReq, optionsReq } = requestBuilder();

      addToLS(
        user!.uid,
        `/${workMethod}/${base64url_encode(urlReq)}/${base64url_encode(JSON.stringify(optionsReq))}`,
        'options',
        'rest'
      );
      dispatch(setIsFetched(true));
    }
  };

  return (
    <IntlProvider locale={locale} messages={messages}>
      <div className={styles.container}>
        <h1 className={styles.header}>
          <FormattedMessage id="rest.header" />
        </h1>
        <div className={styles.wrapper}>
          <RestRequest locale={locale} onSubmit={onSubmit} />
          <RestResponse locale={locale} />
        </div>
      </div>
    </IntlProvider>
  );
};
