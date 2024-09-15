'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';

import { Textarea } from '@/components';
import { useAppDispatch } from '@/redux/hooks';
import { setVariables } from '@/redux/slices/graphQlSlice';
import { getMessages } from '@/services/intl/wordbook';

import styles from './variablesEditor.module.css';
import { Formatter } from '@/utils';

export const VariablesEditor = ({ locale, variables }: { locale: string; variables: string }) => {
  const [variablesError, setVariablesError] = useState('');

  const messages = getMessages(locale);

  const dispatch = useAppDispatch();

  const onCallbackSetError = useCallback((message: string) => setVariablesError(message), []);
  const onCallbackSetBody = useCallback((body: string) => dispatch(setVariables(body)), [dispatch]);

  const changeVariables = (e: ChangeEvent<HTMLTextAreaElement>) => {
    Formatter.prettify({
      query: e.target.value,
      type: 'var',
      onCallbackSetError,
      onCallbackSetBody,
    });
  };

  useEffect(() => {
    Formatter.prettify({
      query: variables,
      type: 'var',
      onCallbackSetError,
      onCallbackSetBody,
    });
  }, [variables, onCallbackSetError, onCallbackSetBody]);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <div className={styles.variables}>
        <Textarea
          name="variables"
          id="variables"
          value={variables}
          placeholder={messages['qraph.placeholder.variables']}
          onChange={changeVariables}
        />
      </div>
      {!!variablesError && <div className={styles.variablesError}>{variablesError}</div>}
    </IntlProvider>
  );
};
