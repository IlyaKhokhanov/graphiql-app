'use client';

import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { Button, Input } from '@/components';
import { HeaderType } from './headersEditor.props';

import styles from './headersEditor.module.css';

export const HeadersEditor = () => {
  const [headers, setHeaders] = useState<HeaderType[]>([]);

  const addHeader = () => {
    setHeaders([...headers, { id: uuidv4(), key: '', value: '' }]);
  };

  const deleteHeader = (id: string) => {
    setHeaders(headers.filter((header) => header.id !== id));
  };

  const updateHeaderKey = (id: string, key: string) => {
    setHeaders(headers.map((header) => (header.id === id ? { ...header, key } : header)));
  };

  const updateHeaderValue = (id: string, value: string) => {
    setHeaders(headers.map((header) => (header.id === id ? { ...header, value } : header)));
  };

  return (
    <div className={styles.wrapper}>
      <Button onClick={addHeader}>Add header</Button>
      {headers.map((header: HeaderType) => (
        <div key={header.id} className={styles.headers}>
          <Input
            type="text"
            placeholder="Key"
            defaultValue={header.key}
            onBlur={(e) => updateHeaderKey(header.id, e.target.value)}
          />
          <Input
            type="text"
            placeholder="Value"
            defaultValue={header.value}
            onBlur={(e) => updateHeaderValue(header.id, e.target.value)}
          />
          <Button
            style={{ background: '#cf352e', padding: '8px 12px' }}
            onClick={() => deleteHeader(header.id)}
          >
            X
          </Button>
        </div>
      ))}
    </div>
  );
};
