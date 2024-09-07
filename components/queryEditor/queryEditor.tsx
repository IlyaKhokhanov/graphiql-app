import { QueryEditorProps } from './queryEditor.props';

import styles from './queryEditor.module.css';

export const QueryEditor = ({ query, setQuery }: QueryEditorProps) => {
  return (
    <div className={styles.query}>
      <label htmlFor="query">GraphQl query</label>
      <textarea
        name="query"
        id="query"
        value={query as string}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};
