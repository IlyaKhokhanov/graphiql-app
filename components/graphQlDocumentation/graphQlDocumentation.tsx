'use client';

import JsonView from '@uiw/react-json-view';

import { GraphQlDocumentationProps } from './graphQlDocumentation.props';

import styles from './graphQlDocumentation.module.css';

export const GraphQlDocumentation = ({ schema, errorMessage }: GraphQlDocumentationProps) => {
  return (
    <>
      <h3>GraphQL Documentation</h3>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      {schema ? (
        <JsonView value={schema} displayDataTypes={false} />
      ) : (
        <p>No documentation available.</p>
      )}
    </>
  );
};
