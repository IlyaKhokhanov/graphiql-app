import "server-only";
import { i18n } from "../i18n-config";

import { createIntl } from "@formatjs/intl";
import type { Locale } from "../i18n-config";
import { MessageFormatElement } from "react-intl";

export async function getIntl(locale: Locale) {
  let localeCorrect = locale;
  const langIsMissing = i18n.locales.every(
    (localeCurrent) =>
      localeCurrent !== locale,
  );
  if (langIsMissing) {
    localeCorrect = 'en';
  };
    return createIntl({
    locale: localeCorrect,
    messages: (await import(`../lang/${localeCorrect}.json`)) as Record<string, MessageFormatElement[]>,
  });
}
