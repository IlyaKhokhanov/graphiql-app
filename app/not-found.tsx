'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { FormattedMessage, IntlProvider } from 'react-intl';
import { i18n } from '@/i18n-config';
import { getIntlConfig } from '@/services/intl/intl';

const NotFound = () => {
  let locale = i18n.defaultLocale;
  const pathname = usePathname() ?? '/';
  if (pathname) {
    const pathnamePieces = pathname.split('/');
    locale = pathnamePieces[1];
  }
  const intlConfig = getIntlConfig(locale);

  return (
    <div
      className="page404"
      style={{
        margin: '0 auto',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90vw',
        height: '90vh',
        gap: '20px',
      }}
    >
      <IntlProvider locale={intlConfig.locale} messages={intlConfig.messages}>
        <h2>
          <FormattedMessage id="notfound.head" />
        </h2>
        <Link href={`/${intlConfig.locale}`}>
          <FormattedMessage id="notfound.goback" />
        </Link>
      </IntlProvider>
    </div>
  );
};

export default NotFound;
