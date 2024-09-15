'use client';

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, sendPasswordReset } from '@/services/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormattedMessage, IntlProvider } from 'react-intl';
import { IntlProps } from '../types';
import { getMessages } from '@/services/intl/wordbook';

import { showToast } from '@/utils';

import { schemaResetIntl } from '@/validation';
import { Button, ErrorMsg, Loader } from '@/components';
import { IFormDataReset } from './types';

import styles from './form.module.css';

export const ResetForm = ({ locale }: IntlProps) => {
  const messages = getMessages(locale);
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
    resolver: yupResolver(schemaResetIntl({ messages })),
  });

  const onSubmit = async (data: IFormDataReset) => {
    try {
      await sendPasswordReset(data.email);
      reset();
      showToast({ message: messages['reset.successful'], thisError: false });
      router.replace('/');
    } catch (err) {
      if (err instanceof Error) showToast({ message: messages['reset.error'], thisError: true });
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) router.replace('/');
  }, [user, loading, router]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  }, [error]);

  if (loading || user) return <Loader />;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <div className={styles.container}>
        <h1 className={styles.header}>
          <FormattedMessage id="reset.header" />
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

          <Button type="submit" disabled={!isValid} data-testid="button-submit">
            <FormattedMessage id="reset.send" />
          </Button>

          <div style={{ marginTop: 28 }}>
            <FormattedMessage id="reset.dont" />{' '}
            <Link href={`/${locale}/auth/signup`}>
              <FormattedMessage id="reset.register" />
            </Link>{' '}
            <FormattedMessage id="reset.now" />.
          </div>
        </form>
      </div>
    </IntlProvider>
  );
};
