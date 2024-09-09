'use client';

import { ChangeEvent, useState } from 'react';

import { Textarea } from '@/components';

import styles from './variablesEditor.module.css';

export const VariablesEditor = () => {
  const [variables, setVariables] = useState<string>('');

  const changeVariables = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setVariables(e.target.value);
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
