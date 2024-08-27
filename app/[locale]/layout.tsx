import { Roboto } from 'next/font/google';
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import { getIntlConfig } from '@/services/intl/intl';
import { Header } from '@/components';

import '@/styles/globals.css';

type LayoutProps = {
  params: { locale: string };
  children: ReactNode;
};

const roboto = Roboto({
  weight: ['400', '500', '900'],
  subsets: ['latin'],
});

const RootLayout = async ({ params, children }: LayoutProps) => {
  const localeCurrent = params.locale;
  const { locale, messages } = await getIntlConfig(localeCurrent);
  if (localeCurrent !== locale) {
    redirect(`/${locale}`);
  }

  return (
    <html lang={locale} className={roboto.className}>
      <body className="body">
        <Header locale={locale} messages={messages} />
        <main className="main">{children}</main>
        <footer>
          <Link href="#">GitHub</Link>
          <span>© 2024</span>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
