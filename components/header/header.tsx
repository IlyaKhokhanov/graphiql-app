'use client';

import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IntlProvider } from 'react-intl';
import { FormattedMessage } from 'react-intl';

import { auth, logout } from '@/services/firebase';
import { Button, LocaleSelector } from '@/components';
import { IHeaderProps } from './header.props';

export const Header = ({ locale, messages }: IHeaderProps) => {
  const [user] = useAuthState(auth);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        {user ? (
          <>
            <Link href={`/${locale}`}>
              <FormattedMessage id="links.home" />
            </Link>
            <Link href={`/${locale}/rest/GET/json`}>
              <FormattedMessage id="links.rest" />
            </Link>
            <Link href={`/${locale}/graphql/query`}>
              <FormattedMessage id="links.graphql" />
            </Link>
            <Link href={`/${locale}/history`}>
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
            <Link href={`/${locale}/rest/GET`}>
              <FormattedMessage id="links.rest" />
            </Link>
            <Button>
              <Link href={`/${locale}/auth/signin`}>
                <FormattedMessage id="links.login" />
              </Link>
            </Button>
            <Button isPrimary={false}>
              <Link href={`/${locale}/auth/signup`}>
                <FormattedMessage id="links.register" />
              </Link>
            </Button>
          </>
        )}
        <LocaleSelector locale={locale} />
      </header>
    </IntlProvider>
  );
};
