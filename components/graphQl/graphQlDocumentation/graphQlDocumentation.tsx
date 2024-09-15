'use client';

import JsonView from '@uiw/react-json-view';

import { GraphQlDocumentationProps } from './graphQlDocumentation.props';

import styles from './graphQlDocumentation.module.css';
import { getMessages } from '@/services/intl/wordbook';
import { FormattedMessage, IntlProvider } from 'react-intl';

export const GraphQlDocumentation = ({
  schema,
  errorMessage,
  locale,
}: GraphQlDocumentationProps) => {
  const messages = getMessages(locale);
  return (
    <IntlProvider locale={locale} messages={messages}>
      {schema && (
        <h3 className={styles.title}>
          <FormattedMessage id={'qraph.documentation.header'} />
        </h3>
      )}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      {schema && (
        <JsonView
          value={schema}
          displayDataTypes={false}
          displayObjectSize={false}
          enableClipboard={false}
          shortenTextAfterLength={0}
          style={{
            marginTop: 25,
            background: '#e9e9e9',
            padding: 15,
          }}
        />
      )}
    </IntlProvider>
  );
};
