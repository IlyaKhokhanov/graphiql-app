'use client';

import { ChangeEvent } from 'react';

import { Button, Textarea } from '@/components';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setQuery } from '@/redux/slices/graphQlSlice';
import { GraphQLFormatter } from '@/utils';

import styles from './queryEditor.module.css';

export const QueryEditor = () => {
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
    <>
      <Button disabled={!query} onClick={prettify}>
        Prettify
      </Button>
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
    </>
  );
};
