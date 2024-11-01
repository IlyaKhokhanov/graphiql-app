import { createIntl } from '@formatjs/intl';

import { i18n, Locale } from '@/i18n-config';
import { getMessages } from './wordbook';

export function getIntl(locale: Locale) {
  const intlConfig = getIntlConfig(locale);
  return createIntl(intlConfig);
}

export function getIntlConfig(localeParam: string) {
  let locale = localeParam;
  const langIsMissing = i18n.locales.every((localeCurrent) => localeCurrent !== locale);
  if (langIsMissing) {
    locale = i18n.defaultLocale;
  }
  const messages = getMessages(locale);
  const result = {
    locale,
    messages,
  };
  return result;
}
