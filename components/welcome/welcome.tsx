'use client';

import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/services/firebase';

import styles from './welcome.module.css';

const ViewInActive = () => (
  <div className={styles.welcome}>
    <h1 className={styles.title}>Welcome to REST/GraphiQL Client</h1>
    <p className={styles.text}>
      Streamline your API testing and development with our versatile REST/GraphiQL Client. Whether
      you are working with RESTful APIs or exploring GraphQL endpoints, our tool provides an
      intuitive and powerful interface to make your work more efficient.
    </p>
    <p className={styles.text}>
      Easily send requests, view responses, and manage your API calls all in one place. With
      built-in history tracking and query management, you can focus on what matters most—building
      and optimizing your APIs.
    </p>
    <p className={styles.text}>
      Get started by exploring our features and enjoy a smoother, more productive API development
      experience.
    </p>
    <div className={styles.links}>
      <Link href="/auth/signin">Login</Link>/<Link href="/auth/signup">Register</Link>
    </div>
  </div>
);

const ViewActive = ({ name }: { name: string }) => (
  <h1 className={styles.user}>
    Welcome to REST/GraphiQL Client, <strong>{name}</strong>
  </h1>
);

export const Welcome = () => {
  const [user] = useAuthState(auth);

  if (user) return <ViewActive name={user.email as string} />;
  return <ViewInActive />;
};
