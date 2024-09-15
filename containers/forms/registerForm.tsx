'use client';

import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerWithEmailAndPassword } from '@/services/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { showToast } from '@/utils';

import { FormattedMessage, IntlProvider } from 'react-intl';
import { IntlProps } from '../types';
import { getMessages } from '@/services/intl/wordbook';

import { Button, ErrorMsg, Loader } from '@/components';
import { schemaIntl } from '@/validation';
import { IFormData } from './types';

import styles from './form.module.css';

export const RegisterForm = ({ locale }: IntlProps) => {
  const messages = getMessages(locale);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schemaIntl({ messages })),
  });

  const onSubmit = async (data: IFormData) => {
    try {
      await registerWithEmailAndPassword(data.email, data.password);
      reset();
      router.replace(`/${locale}`);
    } catch (err) {
      if (err instanceof Error) showToast({ message: messages['register.error'], thisError: true });
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) router.replace('/');
  }, [user, loading, router]);

  if (loading || user) return <Loader />;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <div className={styles.container}>
        <h1 className={styles.header}>
          <FormattedMessage id="register.header" />
        </h1>
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
            data-testid="input-email"
            {...register('email')}
          />

          <ErrorMsg error={errors.email} />

          <input
            className={styles.input}
            style={{ marginBottom: errors.password ? 0 : 28 }}
            type="password"
            placeholder={messages['placeholder.password']}
            data-testid="input-password"
            {...register('password')}
          />

          <ErrorMsg error={errors.password} />

          <Button type="submit" disabled={!isValid} data-testid="button-submit">
            <FormattedMessage id="register.button" />
          </Button>

          <div style={{ marginTop: 28 }}>
            <FormattedMessage id="register.login.question" />{' '}
            <Link href={`/${locale}/auth/signin`}>
              <FormattedMessage id="register.login" />
            </Link>{' '}
            <FormattedMessage id="register.now" />.
          </div>
        </form>
      </div>
    </IntlProvider>
  );
};
