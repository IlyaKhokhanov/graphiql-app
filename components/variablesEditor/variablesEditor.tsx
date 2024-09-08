'use client';

import { VariablesEditorProps } from './variablesEditor.props';

import styles from './variablesEditor.module.css';
import { Textarea } from '../textarea/textarea';

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
