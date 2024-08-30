'use client';

import { FocusEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { inputInterface, response, restClientProps } from './restClient.props';
import { Button } from '@/components';
import { base64url_decode, base64url_encode, uid } from '@/utils';
import { fetcher } from '@/services/rest';

import styles from './restClient.module.css';

export const RestClient = ({ method, url, options }: restClientProps) => {
  const [workUrl, setWorkUrl] = useState('');
  const [workMethod, setWorkMethod] = useState('');
  const [paramInputs, setParamInputs] = useState<inputInterface[]>([]);
  const [headerInputs, setHeaderInputs] = useState<inputInterface[]>([]);
  const [response, setResponse] = useState<response>({ status: null, body: '' });
  const [body, setBody] = useState('');

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

  // const fetcher = async (url: string, method: string) => {
  //   const parmsArr: string[] = [];
  //   paramInputs.forEach((el) => {
  //     if (el.key && el.value) parmsArr.push(`${el.key}=${el.value}`);
  //   });
  //   const myHeaders = new Headers();
  //   headerInputs.forEach((el) => {
  //     if (el.key && el.value) myHeaders.append(el.key, el.value);
  //   });
  //   const options: RequestInit = {
  //     method: method,
  //     headers: myHeaders,
  //   };
  //   if (body) options.body = body;

  //   router.push(
  //     `/${method}/${base64url_encode(url + `?${parmsArr.join('&')}`)}/${base64url_encode(JSON.stringify(options))}`
  //   );

  //   const resp = await fetch(url + `?${parmsArr.join('&')}`, options);
  //   if (resp.status === 500) {
  //     return resp.text();
  //   }
  //   setResponse((prev) => ({ ...prev, status: resp.status }));
  //   return resp.json();
  // };

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
      const objectOptions: RequestInit = JSON.parse(optionsAtob);

      Object.entries(objectOptions).headers?.forEach((el: string[]) => {
        const [key, value] = el;
        if (key === 'body') {
          setBody(value);
        } else {
          setHeaderInputs((prev) => [...prev, { id: uid(), key: key, value: value }]);
        }
      });
    }

    const { urlReq, optionsReq } = requestBuilder();

    fetcher(urlReq, optionsReq)
      .then((res) => {
        if (typeof res !== 'string') {
          setResponse((prev) => ({ ...prev, body: JSON.stringify(res) }));
        }
      })
      .catch((e: Error) => {
        if (e instanceof Error) {
          setResponse((prev) => ({ ...prev, body: e.message }));
        }
      });
  }, []);

  useEffect(() => {
    const { urlReq, optionsReq } = requestBuilder();

    fetcher(urlReq, optionsReq)
      .then((res) => {
        if (typeof res !== 'string') {
          setResponse((prev) => ({ ...prev, body: JSON.stringify(res) }));
        }
      })
      .catch((e: Error) => {
        if (e instanceof Error) {
          setResponse((prev) => ({ ...prev, body: e.message }));
        }
      });
  }, [workUrl]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { urlReq, optionsReq } = requestBuilder();
    router.push(
      `/rest/${workMethod}/${base64url_encode(urlReq)}/${base64url_encode(JSON.stringify(optionsReq))}`
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>REST Client</h1>
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
            placeholder="Endpoint URL"
            onBlur={(e) => setWorkUrl(e.target.value)}
          />
          <Button type="submit">Send</Button>
        </div>

        <div className={styles.line}>
          <h3>Params:</h3>
          <Button type="button" onClick={addParam}>
            Add Param
          </Button>
        </div>
        {paramInputs.map((el) => (
          <div className={styles.line} key={el.id}>
            <input
              className={styles.input}
              type="text"
              placeholder="Param key"
              defaultValue={el.key}
              onBlur={(e) => changeParam(e, el.id, 'key')}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Param value"
              defaultValue={el.value}
              onBlur={(e) => changeParam(e, el.id, 'value')}
            />
            <Button
              style={{ background: '#cf352e' }}
              type="button"
              onClick={() => deleteParam(el.id)}
            >
              Delete
            </Button>
          </div>
        ))}

        <div className={styles.line}>
          <h3>Headers:</h3>
          <Button type="button" onClick={addHeader}>
            Add Header
          </Button>
        </div>
        {headerInputs.map((el) => (
          <div className={styles.line} key={el.id}>
            <input
              className={styles.input}
              type="text"
              placeholder="Header key"
              defaultValue={el.key}
              onBlur={(e) => changeHeader(e, el.id, 'key')}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Header value"
              defaultValue={el.value}
              onBlur={(e) => changeHeader(e, el.id, 'value')}
            />
            <Button
              style={{ background: '#cf352e' }}
              type="button"
              onClick={() => deleteHeader(el.id)}
            >
              Delete
            </Button>
          </div>
        ))}

        <div className={styles.line}>
          <h3>Body:</h3>
          <input
            className={styles.input}
            type="text"
            id="body"
            placeholder="Body"
            defaultValue={body}
            onBlur={(e) => setBody(e.target.value)}
          />
        </div>
      </form>
      <h2>Response</h2>

      <div className={styles.line}>
        <h3>Status:</h3>
        <div>{response?.status || 'There is no status'}</div>
      </div>

      <div className={styles.line}>
        <h3>Body:</h3>
        <div>{response?.body || 'There is no body'}</div>
      </div>
    </div>
  );
};
