import { IButtonProps } from './button.props';

import styles from './button.module.css';

export const Button = ({ children, isPrimary = true, ...props }: IButtonProps) => {
  return (
    <button className={isPrimary ? styles.btn : styles.addition} {...props}>
      {children}
    </button>
  );
};
