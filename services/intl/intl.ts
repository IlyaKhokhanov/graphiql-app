import 'server-only';
import { createIntl } from '@formatjs/intl';

import { i18n, Locale } from '@/i18n-config';

export async function getIntl(locale: Locale) {
  const intlConfig = await getIntlConfig(locale);
  return createIntl(intlConfig);
}

export async function getIntlConfig(localeParam: string) {
  let locale = localeParam;
  const langIsMissing = i18n.locales.every((localeCurrent) => localeCurrent !== locale);
  if (langIsMissing) {
    locale = i18n.defaultLocale;
  }
  const messages = (await import(`@/services/intl/lang/${locale}.json`)) as Record<string, string>;
  const result = {
    locale,
    messages: messages.default as unknown as Record<string, string>,
  };
  return result;
}
