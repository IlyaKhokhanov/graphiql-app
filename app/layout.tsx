import { ReactNode } from 'react';
import '../styles/globals.css';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className="body">{children}</body>
    </html>
  );
};

export default RootLayout;
