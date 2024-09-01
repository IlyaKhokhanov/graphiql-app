import History from '@/containers/history/history';
import { IntlParams } from '@/containers/types';

const HistoryPage = ({ params: { locale } }: IntlParams) => {
  return <History locale={locale} />;
};

export default HistoryPage;
