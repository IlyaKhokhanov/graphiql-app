'use client';

import { useState } from 'react';

import { HeadersEditorProps } from './headersEditor.props';
import { Button, Input } from '@/components';

import styles from './headersEditor.module.css';

export const HeadersEditor = ({ headers, setHeaders }: HeadersEditorProps) => {
  const [localHeaders, setLocalHeaders] = useState(headers);

  const addHeader = () => {
    setLocalHeaders([...localHeaders, { key: '', value: '' }]);
    setHeaders([...localHeaders, { key: '', value: '' }]);
  };

  const deleteHeader = (index: number) => {
    const updatedHeaders = localHeaders.filter((_, idx) => idx !== index);
    setLocalHeaders(updatedHeaders);
    setHeaders(updatedHeaders);
  };

  const updateHeaderKey = (index: number, key: string) => {
    const updatedHeaders = localHeaders.map((header, i) =>
      i === index ? { ...header, key } : header
    );
    setLocalHeaders(updatedHeaders);
    setHeaders(updatedHeaders);
  };

  const updateHeaderValue = (index: number, value: string) => {
    const updatedHeaders = localHeaders.map((header, i) =>
      i === index ? { ...header, value } : header
    );
    setLocalHeaders(updatedHeaders);
    setHeaders(updatedHeaders);
  };

  return (
    <div className={styles.wrapper}>
      <Button onClick={addHeader}>Add header</Button>
      {localHeaders.map((header, index) => (
        <div key={index} className={styles.headers}>
          <Input
            type="text"
            placeholder="Key"
            value={header.key}
            onChange={(e) => updateHeaderKey(index, e.target.value)}
          />
          <Input
            type="text"
            placeholder="Value"
            value={header.value}
            onChange={(e) => updateHeaderValue(index, e.target.value)}
          />
          <Button style={{ background: '#cf352e' }} onClick={() => deleteHeader(index)}>
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};
