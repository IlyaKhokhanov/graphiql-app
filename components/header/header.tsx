'use client';

import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, logout } from '@/services/firebase';
import { Button, NavBar } from '@/components';

import styles from './header.module.css';

export const Header = () => {
  const [user] = useAuthState(auth);

  return (
    <header className={styles.header}>
      {user ? (
        <>
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
          <NavBar isAuth={!!user} />
        </>
      )}
    </header>
  );
};
