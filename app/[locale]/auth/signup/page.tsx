import { RegisterForm } from '@/containers';
import { IntlParams } from '@/containers/types';
import { getIntlConfig } from '@/services/intl/intl';

const SignUp = async ({ params: { locale } }: IntlParams) => {
  const { messages } = await getIntlConfig(locale);

  return <RegisterForm locale={locale} messages={messages} />;
};

export default SignUp;
