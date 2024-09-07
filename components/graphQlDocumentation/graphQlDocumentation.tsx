/* eslint-disable @typescript-eslint/no-unsafe-argument */

'use client';

import { gql } from '@apollo/client';
import { useState, useEffect } from 'react';

import { GraphQlDocumentationProps } from './graphQlDocumentation.props';

import styles from './graphQlDocumentation.module.css';

export const GraphQlDocumentation = ({ client, sdlEndpoint }: GraphQlDocumentationProps) => {
  const [schema, setSchema] = useState(null);

  useEffect(() => {
    if (client && sdlEndpoint) {
      client
        .query({
          query: gql`
            {
              __schema {
                types {
                  name
                }
              }
            }
          `,
        })
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        .then((result) => setSchema(result.data.__schema))
        .catch((error) => console.error(error));
    }
  }, [client, sdlEndpoint]);

  return (
    <div className={styles.documentation}>
      <h3>GraphQl documentation</h3>
      {schema ? (
        <pre>{JSON.stringify(schema, null, 2)}</pre>
      ) : (
        <p className={styles.empty}>Empty</p>
      )}
    </div>
  );
};
