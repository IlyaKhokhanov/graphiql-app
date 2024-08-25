import { ReactNode } from 'react';
import '../styles/globals.css';
import { Header } from '@/components/header/Header';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className="body">
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
