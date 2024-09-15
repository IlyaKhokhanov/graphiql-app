import { RegisterForm } from '@/containers';
import { IntlParams } from '@/containers/types';

const SignUp = ({ params: { locale } }: IntlParams) => {
  return <RegisterForm locale={locale} />;
};

export default SignUp;
