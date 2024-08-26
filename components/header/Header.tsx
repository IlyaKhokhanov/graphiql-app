'use client';

import { auth, logout } from '@/core/services/firebase';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';

export const Header = () => {
  const [user] = useAuthState(auth);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      {user ? (
        <button
          onClick={() => {
            void logout();
          }}
        >
          log out
        </button>
      ) : (
        <>
          <Link href="register">register</Link>
          <Link href="login">login</Link>
        </>
      )}
    </div>
  );
};
