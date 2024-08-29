'use client';

import Image from 'next/image';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { FormattedMessage, IntlProvider } from 'react-intl';
import { i18n } from '@/i18n-config';
import { getIntlConfig } from '@/services/intl/intl';

const NotFound = () => {
  const [intlConfig, setIntlConfig] = useState<{
    locale: string;
    messages: Record<string, string>;
  } | null>(null);
  let locale = i18n.defaultLocale;
  const pathname = usePathname();
  if (pathname) {
    const pathnamePieces = pathname.split('/');
    locale = pathnamePieces[1];
  }

  useEffect(() => {
    async function fetchIntlConfig() {
      const data = await getIntlConfig(locale);
      setIntlConfig(data);
    }
    void fetchIntlConfig();
  }, [locale]);

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
      {intlConfig ? (
        <IntlProvider locale={intlConfig.locale} messages={intlConfig.messages}>
          <h2>
            <FormattedMessage id="notfound.head" />
          </h2>
          <Link href={`/${intlConfig.locale}`}>
            <FormattedMessage id="notfound.goback" />
          </Link>
        </IntlProvider>
      ) : (
        <Image
          className="page404=git"
          src="/loading-line.gif"
          alt="loading"
          width={300}
          height={20}
          priority
        />
      )}
    </div>
  );
};

export default NotFound;
