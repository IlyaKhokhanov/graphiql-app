'use client';

import Link from 'next/link';

import { FormattedMessage, IntlProvider } from 'react-intl';
import { IntlProps } from '../types';
import { getMessages } from '@/services/intl/wordbook';

export const History = ({ locale }: IntlProps) => {
  const messages = getMessages(locale);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <h1>
        <FormattedMessage id="history.header" />
      </h1>
      <ul>
        <li>
          <Link href={`/${locale}/rest/GET/someUrl`}>
            <FormattedMessage id="history.rest" />
          </Link>
        </li>
        <li>
          <Link href={`/${locale}/graphql/someUrl`}>
            <FormattedMessage id="history.graphql" />
          </Link>
        </li>
      </ul>
    </IntlProvider>
  );
};

export default History;
