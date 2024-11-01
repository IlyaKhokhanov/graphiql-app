import { ResetForm } from '@/containers';
import { IntlParams } from '@/containers/types';

const ResetPage = ({ params: { locale } }: IntlParams) => {
  return <ResetForm locale={locale} />;
};

export default ResetPage;
