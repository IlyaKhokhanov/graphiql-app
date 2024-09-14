'use client';

import { ChangeEvent } from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';

import { Button, Textarea } from '@/components';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setQuery } from '@/redux/slices/graphQlSlice';
import { GraphQLFormatter } from '@/utils';
import { getMessages } from '@/services/intl/wordbook';

import styles from './queryEditor.module.css';

export const QueryEditor = ({ locale }: { locale: string }) => {
  const messages = getMessages(locale);

  const dispatch = useAppDispatch();

  const query = useAppSelector((state) => state.graphQlSlice.query);

  const prettify = () => {
    const prettifyQuery = GraphQLFormatter.prettify(query as string);
    dispatch(setQuery(prettifyQuery));
  };

  const changeQuery = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setQuery(e.target.value));
  };

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Button disabled={!query} onClick={prettify}>
        <FormattedMessage id="graph.prettify.button" />
      </Button>
      <div className={styles.query}>
        <Textarea
          className={styles.textarea}
          name="query"
          id="query"
          value={query as string}
          onChange={changeQuery}
          placeholder={messages['qraph.placeholder.query']}
        />
      </div>
    </IntlProvider>
  );
};
