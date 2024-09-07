'use client';

import JsonView from '@uiw/react-json-view';
import { monokaiTheme } from '@uiw/react-json-view/monokai';
import { FormattedMessage, IntlProvider } from 'react-intl';

import { getMessages } from '@/services/intl/wordbook';
import { useAppSelector } from '@/redux/hooks';

import styles from './restResponse.module.css';
import { Loader } from '@/components';

export const RestResponse = ({ locale }: { locale: string }) => {
  const messages = getMessages(locale);

  const { response, isFetched } = useAppSelector((state) => state.restClient);

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
            {response.body && response.status ? (
              <JsonView
                value={response.body}
                displayObjectSize={false}
                displayDataTypes={false}
                enableClipboard={false}
                shortenTextAfterLength={0}
                style={{
                  ...monokaiTheme,
                }}
              />
            ) : (
              <FormattedMessage id="rest.response.body.text" />
            )}
          </div>
        </div>
        {!isFetched || <Loader />}
      </div>
    </IntlProvider>
  );
};
