'use client';

import JsonView from '@uiw/react-json-view';
import { monokaiTheme } from '@uiw/react-json-view/monokai';

import { GraphQlResponseProps } from './graphQlResponse.props';

import styles from './graphQlResponse.module.css';

export const GraphQlResponse = ({ body, statusCode }: GraphQlResponseProps) => {
  return (
    <div className={styles.graphQlResponse}>
      <h3 className={styles.title}>GraphQl Response</h3>
      <div className={styles.status}>Status Code: {statusCode}</div>
      <JsonView
        value={body}
        style={{
          ...monokaiTheme,
        }}
      />
    </div>
  );
};
