import { LoginForm } from '@/containers';
import { IntlParams } from '@/containers/types';

const SignIn = ({ params: { locale } }: IntlParams) => {
  return <LoginForm locale={locale} />;
};

export default SignIn;
