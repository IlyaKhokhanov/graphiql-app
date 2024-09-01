'use client';

import { FormattedMessage, IntlProvider } from 'react-intl';
import { IntlProps } from '../types';
import { getMessages } from '@/services/intl/wordbook';

export const Home = ({ locale }: IntlProps) => {
  const messages = getMessages(locale);
  return (
    <IntlProvider locale={locale} messages={messages}>
      <h1>
        <FormattedMessage id="home.header" />
      </h1>
      <div>
        <FormattedMessage id="home.hello" />
      </div>
    </IntlProvider>
  );
};

export default Home;
