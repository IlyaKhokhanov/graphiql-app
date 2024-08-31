'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IntlProvider } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import { usePathname, useRouter } from 'next/navigation';

import { auth, logout } from '@/services/firebase';
import { Button, LocaleSelector } from '@/components';
import { IHeaderProps } from './header.props';

import logo from './rest.svg';

import styles from './header.module.css';

export const Header = ({ locale, messages }: IHeaderProps) => {
  const [user] = useAuthState(auth);

  const pathname = usePathname();
  const router = useRouter();

  const onHandleClick = (path: string): void => {
    router.push(path);
  };

  return (
    <IntlProvider locale={locale} messages={messages}>
      <header className={styles.header}>
        <Link className={styles.logo} href={`/${locale}`}>
          <Image src={logo as string} alt="logo" width={80}></Image>
        </Link>
        <div className={styles.menu}>
          {user ? (
            <>
              <Link className={pathname === `/${locale}` ? styles.active : ''} href={`/${locale}`}>
                <FormattedMessage id="links.home" />
              </Link>
              <Link
                className={pathname === `/${locale}/rest/GET/json` ? styles.active : ''}
                href={`/${locale}/rest/GET/json`}
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
