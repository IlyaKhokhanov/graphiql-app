import { ReactNode } from 'react';
import Link from 'next/link';

import '../styles/globals.css';
import { Header } from '@/components';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className="body">
        <Header />
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
