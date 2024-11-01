import { FieldError, Merge } from 'react-hook-form';

export interface ErrorProps {
  error: FieldError | Merge<FieldError, object> | undefined;
}
