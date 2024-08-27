import cn from 'classnames';

import { IButtonProps } from './button.props';

import styles from './button.module.css';

export const Button = ({ children, isPrimary = true, className, ...props }: IButtonProps) => {
  return (
    <button
      className={isPrimary ? cn(styles.btn, className) : cn(styles.addition, className)}
      {...props}
    >
      {children}
    </button>
  );
};
