import FooterContent from './FooterContent';
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
  locale: string;
};

export default async function Footer({ locale }: Props) {
  const messages = (await getMessages(locale)).default as unknown as Record<string, string>;

  return (
    <footer className="footer">
      <FooterContent locale={locale} messages={messages} />
    </footer>
  );
}
