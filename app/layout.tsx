import { Roboto } from 'next/font/google';
import { ReactNode } from 'react';

import { Header } from '@/components';
import { NavBarBottom } from '@/components';

import '../styles/globals.css';
import { LogoBottom } from '@/components/logoBottom/logoBottom';

const roboto = Roboto({
  weight: ['400', '500', '900'],
  subsets: ['latin'],
});

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" className={roboto.className}>
      <body className="body">
        <Header className="wrapper" />
        <main className="main wrapper">{children}</main>
        <footer className="footer wrapper">
          <NavBarBottom />
          <span className="year">© 2024</span>
          <LogoBottom />
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
