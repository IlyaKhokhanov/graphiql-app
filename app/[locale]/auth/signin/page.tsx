import { LoginForm } from '@/containers';
import { IntlParams } from '@/containers/types';
import { getIntlConfig } from '@/services/intl/intl';

const SignIn = async ({ params: { locale } }: IntlParams) => {
  const { messages } = await getIntlConfig(locale);

  return <LoginForm locale={locale} messages={messages} />;
};

export default SignIn;
