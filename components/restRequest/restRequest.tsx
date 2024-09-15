/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { FormEvent, useEffect, useState } from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';

import { getMessages } from '@/services/intl/wordbook';
import { Button, ClientsHeaders, Input } from '@/components';
import { Formatter, uid } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  addHeader,
  addParam,
  changeHeader,
  changeParam,
  deleteHeader,
  deleteParam,
  setBody,
  setContentType,
  setWorkMethod,
  setWorkUrl,
} from '@/redux/slices/restClientSlice';

import styles from './restRequest.module.css';

export const RestRequest = ({
  locale,
  onSubmit,
}: {
  locale: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) => {
  const messages = getMessages(locale);

  const dispatch = useAppDispatch();
  const { workUrl, workMethod, body, paramInputs, headerInputs, contentType } = useAppSelector(
    (state) => state.restClient
  );

  const [bodyError, setBodyError] = useState('');

  const onCallbackSetError = (message: string) => setBodyError(message);
  const onCallbackSetBody = (body: string) => dispatch(setBody(body));

  const prettify = (bodyNew: string) => {
    Formatter.prettify({
      query: bodyNew,
      type: 'rest',
      contentType: 'application/json',
      onCallbackSetError,
      onCallbackSetBody,
    });
  };

  useEffect(() => {
    prettify(body);
  }, [contentType]);

  const handleChangeHeader = (value: string, id: string, field: string) => {
    dispatch(changeHeader({ value, id, field }));
  };
  const handleDeleteHeader = (id: string) => dispatch(deleteHeader(id));
  const handleAddHeader = () => dispatch(addHeader({ id: uid(), key: '', value: '' }));
  const handleChangeParam = (value: string, id: string, field: string) => {
    dispatch(changeParam({ value, id, field }));
  };
  const handleDeleteParam = (id: string) => dispatch(deleteParam(id));
  const handleAddParam = () => dispatch(addParam({ id: uid(), key: '', value: '' }));

  return (
    <IntlProvider locale={locale} messages={messages}>
      <div className={styles.block}>
        <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
          <div className={styles.line}>
            <select
              className={styles.input}
              style={{ maxWidth: 110 }}
              name="method"
              id="method"
              defaultValue={workMethod}
              onChange={(e) => dispatch(setWorkMethod(e.target.value))}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
            <Input
              id="url"
              type="text"
              defaultValue={workUrl}
              placeholder={messages['rest.placeholder.url']}
              onChange={(e) => dispatch(setWorkUrl(e.target.value))}
            />
            <Button type="submit" disabled={!workUrl.trim()}>
              <FormattedMessage id="rest.button.send" />
            </Button>
          </div>

          <ClientsHeaders
            locale={locale}
            list={headerInputs}
            changeInput={handleChangeHeader}
            deleteInput={handleDeleteHeader}
            addInput={handleAddHeader}
          />
          <ClientsHeaders
            locale={locale}
            list={paramInputs}
            changeInput={handleChangeParam}
            deleteInput={handleDeleteParam}
            addInput={handleAddParam}
            isHeader={false}
          />

          <div className={styles.line}>
            <h3>
              <FormattedMessage id="rest.body.header" />
            </h3>
            <input
              type="radio"
              name="radio"
              id="text/plain"
              value="text/plain"
              checked={contentType === 'text/plain'}
              onChange={(e) => {
                dispatch(setContentType(e.target.value));
              }}
            />
            <label htmlFor="text/plain">text/plain</label>

            <input
              type="radio"
              name="radio"
              id="application/json"
              value="application/json"
              checked={contentType === 'application/json'}
              onChange={(e) => {
                dispatch(setContentType(e.target.value));
              }}
            />
            <label htmlFor="application/json">application/json</label>
          </div>

          <div className={styles.line}>
            <textarea
              className={styles.body}
              id="body"
              placeholder={messages['rest.body.placeholder']}
              value={body}
              onChange={(e) => prettify(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            {!!bodyError && <div className={styles.bodyError}>{bodyError}</div>}
          </div>
        </form>
      </div>
    </IntlProvider>
  );
};
