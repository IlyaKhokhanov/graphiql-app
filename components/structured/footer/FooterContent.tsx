'use client';

import { IntlProvider } from 'react-intl';
import { FormattedMessage } from 'react-intl';

type Props = {
  locale: string;
  messages: Record<string, string>;
};

export default function FooterContent({ locale, messages }: Props) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <div>
        <FormattedMessage tagName="p" id="common.footer" />
      </div>
    </IntlProvider>
  );
}
