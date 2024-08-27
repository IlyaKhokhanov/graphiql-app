import { Roboto } from 'next/font/google';
import { ReactNode } from 'react';
import Link from 'next/link';

import { Header } from '@/components';

import '../styles/globals.css';

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
        <footer className="wrapper">
          <Link href="#">GitHub</Link>
          <span>© 2024</span>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
