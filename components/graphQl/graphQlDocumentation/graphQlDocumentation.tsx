'use client';

import JsonView from '@uiw/react-json-view';

import { GraphQlDocumentationProps } from './graphQlDocumentation.props';

import styles from './graphQlDocumentation.module.css';

export const GraphQlDocumentation = ({ schema, errorMessage }: GraphQlDocumentationProps) => {
  return (
    <>
      {schema && <h3 className={styles.title}>Documentation</h3>}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      {schema && (
        <JsonView
          value={schema}
          displayDataTypes={false}
          displayObjectSize={false}
          enableClipboard={false}
          shortenTextAfterLength={0}
          style={{
            marginTop: 25,
            background: '#FCDD76',
            padding: 15,
            borderRadius: 10,
          }}
        />
      )}
    </>
  );
};
