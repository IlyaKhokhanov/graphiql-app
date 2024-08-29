import { ResetForm } from '@/containers';
import { IntlParams } from '@/containers/types';
import { getIntlConfig } from '@/services/intl/intl';

const ResetPage = async ({ params: { locale } }: IntlParams) => {
  const { messages } = await getIntlConfig(locale);

  return <ResetForm locale={locale} messages={messages} />;
};

export default ResetPage;
