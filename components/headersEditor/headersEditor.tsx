'use client';

import { HeadersEditorProps } from './headersEditor.props';
import { Button } from '@/components';

import styles from './headersEditor.module.css';

export const HeadersEditor = ({ headers, setHeaders }: HeadersEditorProps) => {
  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const updateHeaders = ({ index, key, value }: { index: number; key: string; value: string }) => {
    const newHeaders = headers.map((header, i) =>
      i === index ? { ...header, key, value } : header
    );
    setHeaders(newHeaders);
  };

  return (
    <div className={styles.wrapper}>
      <Button onClick={addHeader}>Add header</Button>
      {headers.map((header, index) => (
        <div key={index} className={styles.headers}>
          <input
            type="text"
            placeholder="Key"
            value={header.key}
            onChange={(e) => updateHeaders({ index, key: e.target.value, value: header.value })}
          />
          <input
            type="text"
            placeholder="Value"
            value={header.value}
            onChange={(e) => updateHeaders({ index, key: e.target.value, value: header.value })}
          />
        </div>
      ))}
    </div>
  );
};
