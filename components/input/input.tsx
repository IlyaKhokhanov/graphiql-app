import cn from 'classnames';

import { IInputProps } from './input.props';

import styles from './input.module.css';

export const Input = ({ className, ...props }: IInputProps) => (
  <input className={cn(styles.input, className)} {...props} />
);
