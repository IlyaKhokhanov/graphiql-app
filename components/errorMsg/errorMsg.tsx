import { ErrorProps } from './errorMsg.props';

import styles from './errorMsg.module.css';

export const ErrorMsg = ({ error }: ErrorProps) => {
  return error ? <p className={styles.message}>{error.message}</p> : <></>;
};
