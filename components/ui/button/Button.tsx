import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import styles from './Button.module.css';

interface IButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  isPrimary?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

export const Button = (props: IButtonProps): JSX.Element => {
  const { children, onClick, isPrimary = true, ...rest } = props;

  return (
    <button className={isPrimary ? styles.btn : styles.addition} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
