'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

import { IntlProvider } from 'react-intl';
import { getMessages } from '@/services/intl/wordbook';

import git from '@/public/github-icon.svg';
import logo from '@/public/rsschool.svg';
import { IFooterProps } from './footer.props';
import styles from './footer.module.css';

const AuthorLink = ({ href, name }: { href: string; name: string }) => {
  return (
    <Link className={styles.link} href={href} target="_blank">
      <Image className={styles.git} src={git as string} alt="git" width={16} height={16} priority />
      <strong>{name}</strong>
    </Link>
  );
};

export const Footer = ({ locale }: IFooterProps) => {
  const messages = getMessages(locale);
  return (
    <IntlProvider locale={locale} messages={messages}>
      <footer className={styles.footer}>
        <div className={styles.authors}>
          <AuthorLink href="https://github.com/anturchin" name={messages['authors.andrey']} />
          <AuthorLink href="https://github.com/IlyaKhokhanov" name={messages['authors.ilya']} />
          <AuthorLink href="https://github.com/CerBeer" name={messages['authors.sergey']} />
        </div>
        <span className={styles.center}>© 2024</span>
        <Link href="https://rs.school/" className={styles.right} target="_blank">
          <Image className={styles.logo} src={logo as string} alt="logo" width={80} height={30} />
        </Link>
      </footer>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          top: 90,
          left: 40,
          bottom: 80,
          right: 40,
        }}
        toastOptions={{
          // Define default options
          className: '',
          duration: 3000,
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: 'white',
            backgroundColor: 'green',
          },
          iconTheme: {
            primary: 'white',
            secondary: 'green',
          },

          // Default options for specific types
          error: {
            duration: 5000,
            style: {
              color: 'red',
              backgroundColor: 'pink',
            },
            iconTheme: {
              primary: 'white',
              secondary: 'red',
            },
          },
        }}
      />
    </IntlProvider>
  );
};
