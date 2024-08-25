// import { ReactNode } from 'react';
import { redirect } from 'next/navigation'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import '../../styles/globals.css';
import { i18n } from "@/i18n-config";

type LayoutProps = {
  params: { locale: string };
  children: React.ReactNode;
};

const RootLayout = ({ params, children }: LayoutProps) => {
  const { locale } = params;
  const langIsMissing = i18n.locales.every(
    (localeCurrent) =>
      localeCurrent !== locale,
  );
  if (langIsMissing) {
    redirect(`${i18n.defaultLocale}`);
  };
  
  return (
    <html lang={locale}>
      <body className="body">
        <Header />
        {children}
        <Footer locale={locale} />
      </body>
    </html>
  );
};

export default RootLayout;
