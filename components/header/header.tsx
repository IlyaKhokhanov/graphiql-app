'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import cn from 'classnames';

import { auth, logout } from '@/services/firebase';
import { Button, Logo, NavBar } from '@/components';

import styles from './header.module.css';

export const Header = ({ className }: { className: string }) => {
  const [user] = useAuthState(auth);

  return (
    <header className={cn(styles.header, className)}>
      {user ? (
        <>
          <Logo />
          <NavBar isAuth={!!user} />
          <Button
            className={styles.btn}
            onClick={() => {
              void logout();
            }}
          >
            Log out
          </Button>
        </>
      ) : (
        <>
          <Logo />
          <NavBar isAuth={!!user} />
        </>
      )}
    </header>
  );
};
