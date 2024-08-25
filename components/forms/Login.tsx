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

import { IntlProvider } from 'react-intl';
import { FormattedMessage } from 'react-intl';

type Props = {
  locale: string;
  messages: Record<string, string>;
};

export function LoginForm({ locale, messages }: Props) {
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
      router.replace(`/${locale}`);
    } catch (err) {
      if (err instanceof Error) setError(true);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) router.replace('/');
  }, [user, loading, router]);

  // console.log(locale, messages);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <div className={styles.container}>
        <h1 className={styles.header}>
          <FormattedMessage tagName="p" id="login.header" />
        </h1>
        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit(onSubmit)(event);
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
            placeholder={messages['login.placeholder.password']}
            {...register('password')}
          />

          <FormError error={errors.password} />

          <Button type="submit" disabled={!isValid}>
            <FormattedMessage tagName="p" id="login.button" />
          </Button>

          {error && <FormError error={{ message: messages['login.error'] }} />}

          <div style={{ marginTop: error ? 0 : 28 }}>
            <Link href="/reset">
              <FormattedMessage tagName="span" id="login.forgot" />
            </Link>
          </div>

          <div>
            <FormattedMessage tagName="span" id="login.dont" />{' '}
            <Link href="/register">
              <FormattedMessage tagName="span" id="login.register" />
            </Link>{' '}
            <FormattedMessage tagName="span" id="login.now" />.
          </div>
        </form>
      </div>
    </IntlProvider>
  );
}
