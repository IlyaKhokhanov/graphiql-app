import { Home } from '@/containers';
import { IntlParams } from '@/containers/types';

const HomePage = ({ params: { locale } }: IntlParams) => {
  return <Home locale={locale} />;
};

export default HomePage;
