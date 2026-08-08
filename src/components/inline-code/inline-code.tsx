import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './inline-code.module.scss';

export type InlineCodeProps = HTMLAttributes<HTMLElement>;

export function InlineCode({ className, children, ...props }: InlineCodeProps) {
  return (
    <code className={cn(styles.inlineCode, className)} {...props}>
      {children}
    </code>
  );
}
