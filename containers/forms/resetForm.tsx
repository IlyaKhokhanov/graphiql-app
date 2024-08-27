'use client';

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, sendPasswordReset } from '@/services/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { schemaReset } from '@/validation';
import { Button, ErrorMsg } from '@/components';
import { IFormDataReset } from './types';

import styles from './form.module.css';

export const ResetForm = () => {
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
    resolver: yupResolver(schemaReset),
  });

  const onSubmit = async (data: IFormDataReset) => {
    try {
      await sendPasswordReset(data.email);
      reset();
      router.replace('/');
    } catch (err) {
      if (err instanceof Error) setError(true);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) router.replace('/');
  }, [user, loading, router]);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Password reset form</h1>
      <form
        className={styles.form}
        onSubmit={(event) => {
          const handleSubmitForm = handleSubmit(onSubmit);
          void handleSubmitForm(event);
        }}
      >
        <input
          className={styles.input}
          style={{ marginBottom: errors.email ? 0 : 28 }}
          type="text"
          placeholder="Email"
          {...register('email')}
        />

        <ErrorMsg error={errors.email} />

        <Button type="submit" disabled={!isValid}>
          Send password reset email
        </Button>

        {error && <ErrorMsg error={{ message: 'This email is not registered' }} />}

        <div style={{ marginTop: error ? 0 : 28 }}>
          Don&apos;t have an account? <Link href="/auth/signup">Register</Link> now.
        </div>
      </form>
    </div>
  );
};