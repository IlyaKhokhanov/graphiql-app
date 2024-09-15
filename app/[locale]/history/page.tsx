import { History } from '@/containers';
import { IntlParams } from '@/containers/types';

const HistoryPage = ({ params: { locale } }: IntlParams) => {
  return <History locale={locale} />;
};

export default HistoryPage;
