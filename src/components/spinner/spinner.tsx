import type { OutputHTMLAttributes } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './spinner.module.scss';

export interface SpinnerProps extends OutputHTMLAttributes<HTMLOutputElement> {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export function Spinner({ size = 'md', label = 'Loading', className, ...props }: SpinnerProps) {
  return (
    <output aria-label={label} className={cn(styles.spinner, styles[size], className)} {...props}>
      <span className={styles.ring} />
    </output>
  );
}
