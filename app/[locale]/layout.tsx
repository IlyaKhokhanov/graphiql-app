import { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { getIntlConfig } from '@/services/intl/intl';
import { Header } from '@/components';
import { Footer } from '@/components/footer/footer';

import '@/styles/globals.css';

type LayoutProps = {
  params: { locale: string };
  children: ReactNode;
};

const RootLayout = async ({ params, children }: LayoutProps) => {
  const localeCurrent = params.locale;
  const { locale, messages } = await getIntlConfig(localeCurrent);
  if (localeCurrent !== locale) {
    redirect(`/${locale}`);
  }

  return (
    <>
      <Header locale={locale} messages={messages} />
      <main className="main">{children}</main>
      <Footer locale={locale} messages={messages} />
    </>
  );
};

export default RootLayout;
