'use client';

import { FormattedMessage, IntlProvider } from 'react-intl';
import { IntlProps } from '../types';

export const Home2 = ({ locale, messages }: IntlProps) => {
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

export default Home2;
