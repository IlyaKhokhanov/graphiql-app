'use client';

import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { getMessages } from '@/services/intl/wordbook';

import { auth } from '@/services/firebase';
import { IHomeProps } from './home.props';

import styles from './home.module.css';
import { Loader } from '@/components';

const ViewInActive = ({ locale }: { locale: string }) => (
  <div className={styles.welcome}>
    <h1 className={styles.title}>
      <FormattedMessage id="home.title" />
    </h1>
    <p className={styles.text}>
      <FormattedMessage id="home.text.top" />
    </p>
    <p className={styles.text}>
      <FormattedMessage id="home.text.middle" />
    </p>
    <p className={styles.text}>
      <FormattedMessage id="home.text.bottom" />
    </p>
    <div className={styles.links}>
      <Link href={`${locale}/auth/signin`}>
        <FormattedMessage id="home.login" />
      </Link>
      /
      <Link href={`${locale}/auth/signup`}>
        <FormattedMessage id="home.register" />
      </Link>
    </div>
  </div>
);

const ViewActive = ({ name }: { name: string }) => (
  <h1 className={styles.user}>
    <FormattedMessage id="home.title" />, <strong>{name}</strong>
  </h1>
);

export const Home = ({ locale }: IHomeProps) => {
  const messages = getMessages(locale);
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loader />;

  const content = user ? (
    <ViewActive name={user.email as string} />
  ) : (
    <ViewInActive locale={locale} />
  );

  return (
    <IntlProvider locale={locale} messages={messages}>
      {content}
    </IntlProvider>
  );
};
