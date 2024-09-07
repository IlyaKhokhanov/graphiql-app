import { VariablesEditorProps } from './variablesEditor.props';

import styles from './variablesEditor.module.css';

export const VariablesEditor = ({ variables, setVariables }: VariablesEditorProps) => {
  return (
    <div className={styles.variables}>
      <label htmlFor="variables">Variables</label>
      <textarea
        name="variables"
        id="variables"
        value={variables}
        onChange={(e) => setVariables(e.target.value)}
      />
    </div>
  );
};
