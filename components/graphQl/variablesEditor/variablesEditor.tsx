'use client';

import { ChangeEvent } from 'react';

import { Textarea } from '@/components';
import { useAppDispatch } from '@/redux/hooks';
import { setVariables } from '@/redux/slices/graphQlSlice';

import styles from './variablesEditor.module.css';

export const VariablesEditor = ({ variables }: { variables: string }) => {
  const dispatch = useAppDispatch();

  const changeVariables = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setVariables(e.target.value));
  };

  return (
    <div className={styles.variables}>
      <Textarea
        name="variables"
        id="variables"
        value={variables}
        placeholder="Variables"
        onChange={changeVariables}
      />
    </div>
  );
};
