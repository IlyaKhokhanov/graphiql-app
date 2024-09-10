'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IntlProvider } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import { getMessages } from '@/services/intl/wordbook';

import { auth, logout } from '@/services/firebase';
import { Button, LocaleSelector } from '@/components';
import { IHeaderProps } from './header.props';

import logo from './rest.svg';

import styles from './header.module.css';
import { useEffect, useState } from 'react';

export const Header = ({ locale }: IHeaderProps) => {
  const messages = getMessages(locale);
  const [user] = useAuthState(auth);
  const [scroll, setScroll] = useState(0);

  const pathname = usePathname();
  const router = useRouter();

  const onHandleClick = (path: string): void => {
    router.push(path);
  };

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <header
        className={styles.header}
        style={{
          borderColor: scroll > 0 ? '#0CB4A1' : '#0cb4f1',
          background: scroll > 0 ? '#e9e9e9' : '#fdfdfd',
        }}
      >
        <Link className={styles.logo} href={`/${locale}`}>
          <Image src={logo as string} alt="logo" width={55} height={55} priority />
        </Link>
        <div className={styles.menu}>
          {user ? (
            <>
              <Link className={pathname === `/${locale}` ? styles.active : ''} href={`/${locale}`}>
                <FormattedMessage id="links.home" />
              </Link>
              <Link
                className={pathname === `/${locale}/GET/json` ? styles.active : ''}
                href={`/${locale}/GET`}
              >
                <FormattedMessage id="links.rest" />
              </Link>
              <Link
                className={pathname === `/${locale}/graphql/query` ? styles.active : ''}
                href={`/${locale}/graphql/query`}
              >
                <FormattedMessage id="links.graphql" />
              </Link>
              <Link
                className={pathname === `/${locale}/history` ? styles.active : ''}
                href={`/${locale}/history`}
              >
                <FormattedMessage id="links.history" />
              </Link>
              <Button
                onClick={() => {
                  void logout();
                }}
              >
                <FormattedMessage id="links.logout" />
              </Button>
            </>
          ) : (
            <>
              <Button
                className={styles.button}
                data-testid="header-login"
                onClick={() => onHandleClick(`/${locale}/auth/signin`)}
              >
                <FormattedMessage id="links.login" />
              </Button>
              <Button isPrimary={false} onClick={() => onHandleClick(`/${locale}/auth/signup`)}>
                <FormattedMessage id="links.register" />
              </Button>
            </>
          )}
        </div>
        <LocaleSelector locale={locale} />
      </header>
    </IntlProvider>
  );
};
