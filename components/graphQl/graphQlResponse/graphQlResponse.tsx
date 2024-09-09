'use client';

import JsonView from '@uiw/react-json-view';
import { monokaiTheme } from '@uiw/react-json-view/monokai';

import { GraphQlResponseProps } from './graphQlResponse.props';

import styles from './graphQlResponse.module.css';

export const GraphQlResponse = ({ body, statusCode }: GraphQlResponseProps) => {
  return (
    <>
      <h3 className={styles.status}>Status: {statusCode}</h3>
      <JsonView
        value={body}
        style={{
          ...monokaiTheme,
          marginTop: 10,
          padding: 15,
          borderRadius: 10,
        }}
      />
    </>
  );
};
