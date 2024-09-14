'use client';

import { ChangeEvent } from 'react';
import { IntlProvider } from 'react-intl';

import { Textarea } from '@/components';
import { useAppDispatch } from '@/redux/hooks';
import { setVariables } from '@/redux/slices/graphQlSlice';
import { getMessages } from '@/services/intl/wordbook';

import styles from './variablesEditor.module.css';

export const VariablesEditor = ({ locale, variables }: { locale: string; variables: string }) => {
  const messages = getMessages(locale);

  const dispatch = useAppDispatch();

  const changeVariables = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setVariables(e.target.value));
  };

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
    </IntlProvider>
  );
};
