import { Roboto } from 'next/font/google';
import { ReactNode } from 'react';

import '@/styles/globals.css';
import { ProviderComponent } from '@/components';

type LayoutProps = {
  children: ReactNode;
};

const roboto = Roboto({
  weight: ['400', '500', '900'],
  subsets: ['latin'],
});

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en" className={roboto.className}>
      <body className="body">
        <ProviderComponent>{children}</ProviderComponent>
      </body>
    </html>
  );
};

export default RootLayout;
