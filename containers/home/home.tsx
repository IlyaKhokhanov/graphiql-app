'use client';

import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FormattedMessage, IntlProvider } from 'react-intl';

import { auth } from '@/services/firebase';
import { IHomeProps } from './home.props';
import { HomeList, Loader } from '@/components';
import { getMessages } from '@/services/intl/wordbook';

import styles from './home.module.css';

export const Home = ({ locale }: IHomeProps) => {
  const messages = getMessages(locale);
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loader />;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <div className={styles.container}>
        <div className={styles.welcome}>
          {user ? (
            <h1 className={styles.user}>
              <FormattedMessage id="home.title" />, <strong>{user?.email}</strong>
            </h1>
          ) : (
            <h1 className={styles.title}>
              <FormattedMessage id="home.title" />
            </h1>
          )}
          <p className={styles.text}>
            <FormattedMessage id="home.text.top" />
          </p>
          <p className={styles.text}>
            <FormattedMessage id="home.text.middle" />
          </p>
          <p className={styles.text}>
            <FormattedMessage id="home.text.bottom" />
          </p>
          {!user && (
            <div className={styles.links}>
              <Link href={`${locale}/auth/signin`}>
                <FormattedMessage id="home.login" />
              </Link>
              /
              <Link href={`${locale}/auth/signup`}>
                <FormattedMessage id="home.register" />
              </Link>
            </div>
          )}
          {user && <HomeList locale={locale} />}
        </div>
      </div>
    </IntlProvider>
  );
};
