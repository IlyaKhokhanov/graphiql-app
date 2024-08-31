import { Home } from '@/containers';
import { IntlParams } from '@/containers/types';
import { getIntlConfig } from '@/services/intl/intl';

const HomePage = async ({ params: { locale } }: IntlParams) => {
  const { messages } = await getIntlConfig(locale);

  return <Home locale={locale} messages={messages} />;
};

export default HomePage;
