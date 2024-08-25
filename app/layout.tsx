import { ReactNode } from 'react';
import Link from 'next/link';

import '../styles/globals.css';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className="body">
        <header>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/rest/GET/json">REST Client</Link>
            <Link href="/graphql/query">GraphiQL Client</Link>
            <Link href="/history">History</Link>
            <Link href="/auth/signin">Sign In</Link>
            <Link href="/auth/signup">Sign Up</Link>
          </nav>
        </header>
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
