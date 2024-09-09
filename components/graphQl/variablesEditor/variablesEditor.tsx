'use client';

import { VariablesEditorProps } from './variablesEditor.props';
import { Textarea } from '@/components';

import styles from './variablesEditor.module.css';

export const VariablesEditor = ({ variables, setVariables }: VariablesEditorProps) => {
  return (
    <div className={styles.variables}>
      <Textarea
        name="variables"
        id="variables"
        value={variables}
        placeholder="Variables"
        onChange={(e) => setVariables(e.target.value)}
      />
    </div>
  );
};
