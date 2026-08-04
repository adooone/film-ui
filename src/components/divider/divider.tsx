import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './divider.module.scss';

export interface DividerProps extends HTMLAttributes<HTMLElement> {
  orientation?: 'horizontal' | 'vertical';
  label?: ReactNode;
}

export function Divider({ orientation = 'horizontal', label, className, ...props }: DividerProps) {
  if (orientation === 'horizontal' && label != null) {
    return (
      <div className={cn(styles.divider, styles.labelled, className)} {...props}>
        <hr className={styles.line} />
        <span className={styles.label}>{label}</span>
        <hr className={styles.line} />
      </div>
    );
  }

  return (
    <hr
      aria-orientation={orientation}
      className={cn(styles.divider, styles[orientation], className)}
      {...props}
    />
  );
}
