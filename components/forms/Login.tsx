'use client';

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logInWithEmailAndPassword } from '@/core/services/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/components/forms/formValidation';
import { Button } from '../ui/button';
import { FormError } from './fromError';
import { IFormData } from './types';
import styles from './form.module.css';

export const Login = () => {
  const [error, setError] = useState(false);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormData) => {
    try {
      await logInWithEmailAndPassword(data.email, data.password);
      reset();
      router.replace('/');
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        setError(true);
      }
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) router.replace('/');
  }, [user, loading, router]);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Login form</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.input}
          style={{ marginBottom: errors.email ? 0 : 28 }}
          type="text"
          placeholder="Email"
          {...register('email')}
        />

        <FormError error={errors.email} />

        <input
          className={styles.input}
          style={{ marginBottom: errors.password ? 0 : 28 }}
          type="password"
          placeholder="Password"
          {...register('password')}
        />

        <FormError error={errors.password} />

        <Button type="submit" disabled={!isValid}>
          Login
        </Button>

        {error && <FormError error={{ message: 'Invalid email or password' }} />}

        {/* <div style={{ marginTop: error ? 0 : 28 }}>
          <Link href="/reset">Forgot Password</Link>
        </div> */}

        <div style={{ marginTop: error ? 0 : 28 }}>
          Don&apos;t have an account? <Link href="/register">Register</Link> now.
        </div>
      </form>
    </div>
  );
};
