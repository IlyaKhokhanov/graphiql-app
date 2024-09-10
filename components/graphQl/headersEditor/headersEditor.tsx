'use client';

import { Button, Input } from '@/components';
import { HeaderType } from './headersEditor.props';
import { useAppDispatch } from '@/redux/hooks';
import {
  addHeader,
  deleteHeader,
  updateHeaderKey,
  updateHeaderValue,
} from '@/redux/slices/graphQlSlice';
import { uid } from '@/utils';

import styles from './headersEditor.module.css';

export const HeadersEditor = ({ headers }: { headers: HeaderType[] }) => {
  const dispatch = useAppDispatch();

  const handleAddHeader = () => {
    dispatch(addHeader({ id: uid(), key: '', value: '' }));
  };

  const handleDeleteHeader = (id: string) => {
    dispatch(deleteHeader(id));
  };

  const handleUpdateHeaderKey = (id: string, key: string) => {
    dispatch(updateHeaderKey({ id, key }));
  };

  const handleUpdateHeaderValue = (id: string, value: string) => {
    dispatch(updateHeaderValue({ id, value }));
  };

  return (
    <div className={styles.wrapper}>
      <Button type="button" onClick={handleAddHeader}>
        Add header
      </Button>
      {headers.map((header: HeaderType) => (
        <div key={header.id} className={styles.headers}>
          <Input
            type="text"
            placeholder="Key"
            defaultValue={header.key}
            onBlur={(e) => handleUpdateHeaderKey(header.id, e.target.value)}
          />
          <Input
            type="text"
            placeholder="Value"
            defaultValue={header.value}
            onBlur={(e) => handleUpdateHeaderValue(header.id, e.target.value)}
          />
          <Button
            type="button"
            style={{ background: '#cf352e', padding: '8px 12px' }}
            onClick={() => handleDeleteHeader(header.id)}
          >
            X
          </Button>
        </div>
      ))}
    </div>
  );
};
