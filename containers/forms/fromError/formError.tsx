import { FieldError, Merge } from 'react-hook-form';
import styles from './formError.module.css';

interface ErrorProps {
  error: FieldError | Merge<FieldError, object> | undefined;
}

export const FormError = ({ error }: ErrorProps) => {
  return error ? <p className={styles.message}>{error.message}</p> : <></>;
};
