import cn from 'classnames';

import { IButtonProps } from './button.props';

import styles from './button.module.css';

export const Button = ({ children, isPrimary = true, className, ...props }: IButtonProps) => {
  return (
    <button className={cn(isPrimary ? styles.btn : styles.addition, className)} {...props}>
      {children}
    </button>
  );
};
