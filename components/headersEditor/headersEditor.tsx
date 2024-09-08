'use client';

import { Button, Input } from '@/components';
import {
  addHeader,
  deleteHeader,
  updateHeaderKey,
  updateHeaderValue,
} from '@/redux/slices/graphQlSlice';
import { useAppDispatch } from '@/redux/hooks';

import styles from './headersEditor.module.css';

export const HeadersEditor = ({ headers }: { headers: Array<Record<string, string>> }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.wrapper}>
      <Button onClick={() => dispatch(addHeader({ key: '', value: '' }))}>Add header</Button>
      {headers.map((header, index) => (
        <div key={index} className={styles.headers}>
          <Input
            type="text"
            placeholder="Key"
            value={header.key}
            onChange={(e) => dispatch(updateHeaderKey({ index, key: e.target.value }))}
          />
          <Input
            type="text"
            placeholder="Value"
            value={header.value}
            onChange={(e) => dispatch(updateHeaderValue({ index, value: e.target.value }))}
          />
          <Button
            style={{ background: '#cf352e', padding: '8px 12px' }}
            onClick={() => dispatch(deleteHeader(index))}
          >
            X
          </Button>
        </div>
      ))}
    </div>
  );
};
