'use client';

import { ChangeEvent } from 'react';
import { DocumentNode } from '@apollo/client';

import { Textarea } from '@/components';
import { useAppDispatch } from '@/redux/hooks';
import { setQuery } from '@/redux/slices/graphQlSlice';

import styles from './queryEditor.module.css';

export const QueryEditor = ({ query }: { query: string | DocumentNode }) => {
  const dispatch = useAppDispatch();

  const changeQuery = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setQuery(e.target.value));
  };

  return (
    <div className={styles.query}>
      <Textarea
        className={styles.textarea}
        name="query"
        id="query"
        value={query as string}
        onChange={changeQuery}
        placeholder="GraphQl query"
      />
    </div>
  );
};
