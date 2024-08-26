'use client';

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerWithEmailAndPassword } from '@/core/services/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/containers/forms/formValidation';
import { Button } from '@/components/ui/button';
import { FormError } from './fromError';
import { IFormData } from './types';
import styles from './form.module.css';

export const RegisterForm = () => {
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
      await registerWithEmailAndPassword(data.email, data.password);
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
      <h1 className={styles.header}>Registration form</h1>
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
          Register
        </Button>

        {error && <FormError error={{ message: 'This email has already been registered' }} />}

        <div style={{ marginTop: error ? 0 : 28 }}>
          Already have an account? <Link href="login">Login</Link> now.
        </div>
      </form>
    </div>
  );
};
