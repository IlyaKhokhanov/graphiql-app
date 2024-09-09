'use client';

import { QueryEditorProps } from './queryEditor.props';
import { Textarea } from '@/components';

import styles from './queryEditor.module.css';

export const QueryEditor = ({ query, setQuery }: QueryEditorProps) => {
  return (
    <div className={styles.query}>
      <Textarea
        className={styles.textarea}
        name="query"
        id="query"
        value={query as string}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="GraphQl query"
      />
    </div>
  );
};
