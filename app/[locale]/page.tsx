import Home from '@/containers/home/home';
import { IntlParams } from '@/containers/types';

const HomePage = ({ params: { locale } }: IntlParams) => {
  return <Home locale={locale} />;
};

export default HomePage;
