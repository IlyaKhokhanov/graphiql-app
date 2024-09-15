import { ReactNode } from 'react';
import { notFound } from 'next/navigation';

import { getIntlConfig } from '@/services/intl/intl';
import { Header } from '@/components';
import { Footer } from '@/components/footer/footer';

import '@/styles/globals.css';

type LayoutProps = {
  params: { locale: string };
  children: ReactNode;
};

const RootLayout = ({ params, children }: LayoutProps) => {
  const localeCurrent = params.locale;
  const { locale } = getIntlConfig(localeCurrent);
  if (localeCurrent !== locale) notFound();

  return (
    <>
      <Header locale={locale} />
      <main className="main">{children}</main>
      <Footer locale={locale} />
    </>
  );
};

export default RootLayout;
