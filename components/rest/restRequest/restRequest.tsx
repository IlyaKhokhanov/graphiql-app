'use client';

import { FormEvent } from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';

import { getMessages } from '@/services/intl/wordbook';
import { Button } from '@/components';
import { uid } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  addHeader,
  addParam,
  changeHeader,
  changeParam,
  deleteHeader,
  deleteParam,
  setBody,
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
  const { workUrl, workMethod, body, paramInputs, headerInputs } = useAppSelector(
    (state) => state.restClient
  );

  return (
    <IntlProvider locale={locale} messages={messages}>
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
              onChange={(e) => dispatch(setWorkMethod(e.target.value))}
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
              onBlur={(e) => dispatch(setWorkUrl(e.target.value))}
            />
            <Button type="submit">
              <FormattedMessage id="rest.button.send" />
            </Button>
          </div>

          <div className={styles.line}>
            <h3>
              <FormattedMessage id="rest.param.header" />
            </h3>
            <Button
              type="button"
              onClick={() => dispatch(addParam({ id: uid(), key: '', value: '' }))}
            >
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
                onBlur={(e) =>
                  dispatch(changeParam({ val: e.target.value, id: el.id, field: 'key' }))
                }
              />
              <input
                className={styles.input}
                type="text"
                placeholder={messages['rest.param.placeholder.value']}
                defaultValue={el.value}
                onBlur={(e) =>
                  dispatch(changeParam({ val: e.target.value, id: el.id, field: 'value' }))
                }
              />
              <Button
                style={{ background: '#cf352e', padding: '8px 12px' }}
                type="button"
                onClick={() => dispatch(deleteParam(el.id))}
              >
                <FormattedMessage id="rest.button.delete" />
              </Button>
            </div>
          ))}

          <div className={styles.line}>
            <h3>
              <FormattedMessage id="rest.header.header" />
            </h3>
            <Button
              type="button"
              onClick={() => dispatch(addHeader({ id: uid(), key: '', value: '' }))}
            >
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
                onBlur={(e) =>
                  dispatch(changeHeader({ val: e.target.value, id: el.id, field: 'key' }))
                }
              />
              <input
                className={styles.input}
                type="text"
                placeholder={messages['rest.header.placeholder.value']}
                defaultValue={el.value}
                onBlur={(e) =>
                  dispatch(changeHeader({ val: e.target.value, id: el.id, field: 'value' }))
                }
              />
              <Button
                style={{ background: '#cf352e' }}
                type="button"
                onClick={() => dispatch(deleteHeader(el.id))}
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
              onBlur={(e) => dispatch(setBody(e.target.value))}
            />
          </div>
        </form>
      </div>
    </IntlProvider>
  );
};
