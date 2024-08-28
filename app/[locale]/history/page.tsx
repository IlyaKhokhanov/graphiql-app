import History from '@/containers/history/history';
import { IntlParams } from '@/containers/types';
import { getIntlConfig } from '@/services/intl/intl';

const HistoryPage = async ({ params: { locale } }: IntlParams) => {
  const { messages } = await getIntlConfig(locale);

  return <History locale={locale} messages={messages} />;
};

export default HistoryPage;
