'use client';

import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, logout } from '@/services/firebase';
import { Button } from '@/components';

export const Header = () => {
  const [user] = useAuthState(auth);

  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      {user ? (
        <>
          <Link href="/">Home</Link>
          <Link href="/rest/GET/json">REST Client</Link>
          <Link href="/graphql/query">GraphiQL Client</Link>
          <Link href="/history">History</Link>
          <Button
            onClick={() => {
              void logout();
            }}
          >
            log out
          </Button>
        </>
      ) : (
        <>
          <Button>
            <Link href="/auth/signin">login</Link>
          </Button>
          <Button isPrimary={false}>
            <Link href="/auth/signup">register</Link>
          </Button>
        </>
      )}
    </header>
  );
};
