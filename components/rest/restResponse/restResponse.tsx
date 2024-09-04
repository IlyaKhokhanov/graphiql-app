'use client';

import JsonView from '@uiw/react-json-view';
import { monokaiTheme } from '@uiw/react-json-view/monokai';
import { FormattedMessage, IntlProvider } from 'react-intl';

import { getMessages } from '@/services/intl/wordbook';
import { useAppSelector } from '@/redux/hooks';

import styles from './restResponse.module.css';

export const RestResponse = ({ locale }: { locale: string }) => {
  const messages = getMessages(locale);

  const { response, workUrl, isFetched } = useAppSelector((state) => state.restClient);

  return (
    <IntlProvider locale={locale} messages={messages}>
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
          <div
            style={{
              maxHeight: '60vh',
              flexGrow: 1,
              overflowY: 'scroll',
            }}
          >
            {isFetched && workUrl ? (
              <JsonView
                value={response.body}
                style={{
                  ...monokaiTheme,
                }}
              />
            ) : (
              <FormattedMessage id="rest.response.body.text" />
            )}
          </div>
        </div>
      </div>
    </IntlProvider>
  );
};
