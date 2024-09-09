'use client';

import { ChangeEvent, useState } from 'react';

import { Textarea } from '@/components';

import styles from './queryEditor.module.css';

export const QueryEditor = () => {
  const [query, setQuery] = useState<string>('');

  const changeQuery = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className={styles.query}>
      <Textarea
        className={styles.textarea}
        name="query"
        id="query"
        value={query}
        onChange={changeQuery}
        placeholder="GraphQl query"
      />
    </div>
  );
};
