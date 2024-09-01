/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
'use client';

import { FocusEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import JsonView from '@uiw/react-json-view';
import { monokaiTheme } from '@uiw/react-json-view/monokai';
import { FormattedMessage, IntlProvider } from 'react-intl';

import { inputInterface, response, restClientProps } from './restClient.props';
import { Button } from '@/components';
import { base64url_decode, base64url_encode, uid } from '@/utils';
import { fetcher, FetchError } from '@/services/rest';
import { getMessages } from '@/services/intl/wordbook';

import styles from './restClient.module.css';

export const RestClient = ({ method, url, options, locale }: restClientProps) => {
  const messages = getMessages(locale);

  const [workUrl, setWorkUrl] = useState('');
  const [workMethod, setWorkMethod] = useState('');
  const [paramInputs, setParamInputs] = useState<inputInterface[]>([]);
  const [headerInputs, setHeaderInputs] = useState<inputInterface[]>([]);
  const [response, setResponse] = useState<response>({
    status: null,
    body: { message: messages['rest.response.body.text'] } as unknown as JSON,
  });
  const [body, setBody] = useState<string>('');

  const [isFetched, setIsFetched] = useState(false);

  const router = useRouter();

  const addHeader = () => setHeaderInputs((prev) => [...prev, { id: uid(), key: '', value: '' }]);
  const deleteHeader = (id: string) => setHeaderInputs((prev) => prev.filter((el) => el.id !== id));
  const changeHeader = (e: FocusEvent<HTMLInputElement, Element>, id: string, field: string) =>
    setHeaderInputs((prev) =>
      prev.map((el) => {
        if (el.id == id) {
          return { ...el, [field]: e.target.value };
        }
        return el;
      })
    );

  const addParam = () => setParamInputs((prev) => [...prev, { id: uid(), key: '', value: '' }]);
  const deleteParam = (id: string) => setParamInputs((prev) => prev.filter((el) => el.id !== id));
  const changeParam = (e: FocusEvent<HTMLInputElement, Element>, id: string, field: string) =>
    setParamInputs((prev) =>
      prev.map((el) => {
        if (el.id == id) {
          return { ...el, [field]: e.target.value };
        }
        return el;
      })
    );

  const requestBuilder = (): { urlReq: string; optionsReq: RequestInit } => {
    const parmsArr: string[] = [];
    paramInputs.forEach((el) => {
      if (el.key && el.value) parmsArr.push(`${el.key}=${el.value}`);
    });
    const myHeaders = new Headers();
    headerInputs.forEach((el) => {
      if (el.key && el.value) myHeaders.append(el.key, el.value);
    });
    const optionsRequest: RequestInit = {
      method: workMethod,
      headers: myHeaders,
    };
    if (body) optionsRequest.body = body;

    return { urlReq: workUrl + `?${parmsArr.join('&')}`, optionsReq: optionsRequest };
  };

  useEffect(() => {
    setHeaderInputs([]);
    setParamInputs([]);
    setWorkMethod(method);
    if (url) {
      const urlAtob = base64url_decode(url);
      const [urlString, params] = urlAtob.split('?');
      if (params) {
        const optionArr = params.split('&');
        optionArr?.forEach((el) => {
          const [key, value] = el.split('=');
          setParamInputs((prev) => [...prev, { id: uid(), key: key, value: value }]);
        });
      }
      setWorkUrl(urlString);
    }

    if (options) {
      const optionsAtob = base64url_decode(options);
      const objectOptions = JSON.parse(optionsAtob) as unknown as {
        headers?: Record<string, string>;
      };

      Object.entries(objectOptions).headers?.forEach((el: string[]) => {
        const [key, value] = el;
        if (key === 'body') {
          setBody(value);
        } else {
          setHeaderInputs((prev) => [...prev, { id: uid(), key: key, value: value }]);
        }
      });
    }

    if (url) setIsFetched(true);
  }, []);

  useEffect(() => {
    if (isFetched && workUrl) {
      const { urlReq, optionsReq } = requestBuilder();

      fetcher(urlReq, optionsReq)
        .then(({ body, status }) => {
          if (typeof body !== 'string') {
            setResponse({ status, body: body as JSON });
          }
        })
        .catch((e) => {
          if (e instanceof FetchError) {
            setResponse({ status: e.getStatus(), body: e.message as unknown as JSON });
          }
        });
    }
  }, [isFetched]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (workUrl) {
      const { urlReq, optionsReq } = requestBuilder();
      router.push(
        `/${locale}/rest/${workMethod}/${base64url_encode(urlReq)}/${base64url_encode(JSON.stringify(optionsReq))}`
      );
    }
  };

  return (
    <IntlProvider locale={locale} messages={messages}>
      <div className={styles.container}>
        <h1 className={styles.header}>
          <FormattedMessage id="rest.header" />
        </h1>
        <div className={styles.wrapper}>
          <div className={styles.block}>
            <h2 className={styles.blockHeader}>
              <FormattedMessage id="rest.request.header" />
            </h2>
            <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
              <div className={styles.line}>
                <select
                  className={styles.input}
                  name="method"
                  id="method"
                  defaultValue={workMethod}
                  onChange={(e) => setWorkMethod(e.target.value)}
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
                <input
                  className={styles.input}
                  id="url"
                  type="text"
                  defaultValue={workUrl}
                  placeholder={messages['rest.placeholder.url']}
                  onBlur={(e) => setWorkUrl(e.target.value)}
                />
                <Button type="submit">
                  <FormattedMessage id="rest.button.send" />
                </Button>
              </div>

              <div className={styles.line}>
                <h3>
                  <FormattedMessage id="rest.param.header" />
                </h3>
                <Button type="button" onClick={addParam}>
                  <FormattedMessage id="rest.param.button" />
                </Button>
              </div>
              {paramInputs.map((el) => (
                <div className={styles.line} key={el.id}>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder={messages['rest.param.placeholder.key']}
                    defaultValue={el.key}
                    onBlur={(e) => changeParam(e, el.id, 'key')}
                  />
                  <input
                    className={styles.input}
                    type="text"
                    placeholder={messages['rest.param.placeholder.value']}
                    defaultValue={el.value}
                    onBlur={(e) => changeParam(e, el.id, 'value')}
                  />
                  <Button
                    style={{ background: '#cf352e' }}
                    type="button"
                    onClick={() => deleteParam(el.id)}
                  >
                    <FormattedMessage id="rest.button.delete" />
                  </Button>
                </div>
              ))}

              <div className={styles.line}>
                <h3>
                  <FormattedMessage id="rest.header.header" />
                </h3>
                <Button type="button" onClick={addHeader}>
                  <FormattedMessage id="rest.header.button" />
                </Button>
              </div>
              {headerInputs.map((el) => (
                <div className={styles.line} key={el.id}>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder={messages['rest.header.placeholder.key']}
                    defaultValue={el.key}
                    onBlur={(e) => changeHeader(e, el.id, 'key')}
                  />
                  <input
                    className={styles.input}
                    type="text"
                    placeholder={messages['rest.header.placeholder.value']}
                    defaultValue={el.value}
                    onBlur={(e) => changeHeader(e, el.id, 'value')}
                  />
                  <Button
                    style={{ background: '#cf352e' }}
                    type="button"
                    onClick={() => deleteHeader(el.id)}
                  >
                    <FormattedMessage id="rest.button.delete" />
                  </Button>
                </div>
              ))}

              <div className={styles.line}>
                <h3>
                  <FormattedMessage id="rest.body.header" />
                </h3>
                <input
                  className={styles.input}
                  type="text"
                  id="body"
                  placeholder={messages['rest.body.placeholder']}
                  defaultValue={body}
                  onBlur={(e) => setBody(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className={styles.block}>
            <h2 className={styles.blockHeader}>
              <FormattedMessage id="rest.response.header" />
            </h2>

            <div className={styles.line}>
              <h3>
                <FormattedMessage id="rest.response.status.header" />
              </h3>
              <div>{response?.status || <FormattedMessage id="rest.response.status.text" />}</div>
            </div>

            <div className={styles.line}>
              <h3 style={{ alignSelf: 'flex-start' }}>
                <FormattedMessage id="rest.response.body.header" />
              </h3>
              {isFetched && workUrl ? (
                <JsonView
                  value={response.body}
                  style={{
                    ...monokaiTheme,
                    flexGrow: 1,
                    overflowY: 'scroll',
                  }}
                />
              ) : (
                <FormattedMessage id="rest.response.body.text" />
              )}
            </div>
          </div>
        </div>
      </div>
    </IntlProvider>
  );
};
