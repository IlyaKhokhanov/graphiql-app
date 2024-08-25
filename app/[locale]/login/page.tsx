import { LoginForm } from '@/components/forms';
import { i18n } from '../../../i18n-config';

async function getMessages(locale: string) {
  let localeCorrect = locale;
  const langIsMissing = i18n.locales.every((localeCurrent) => localeCurrent !== locale);
  if (langIsMissing) {
    localeCorrect = 'en';
  }
  const result = (await import(`../../../lang/${localeCorrect}.json`)) as Record<string, string>;
  return result;
}

type Props = {
  params: { locale: string };
};

export default async function Page({ params: { locale } }: Props) {
  const messages = (await getMessages(locale)).default as unknown as Record<string, string>;
  // console.log(locale, messages);

  return <LoginForm locale={locale} messages={messages} />;
}
