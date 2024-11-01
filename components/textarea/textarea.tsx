import cn from 'classnames';

import { ITextareaProps } from './textarea.props';

import styles from './textarea.module.css';

export const Textarea = ({ className, ...props }: ITextareaProps) => (
  <textarea className={cn(styles.textarea, className)} {...props} />
);
