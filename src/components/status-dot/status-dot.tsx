import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './status-dot.module.scss';

export type StatusDotVariant = 'neutral' | 'info' | 'success' | 'warning' | 'error';

export interface StatusDotProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: StatusDotVariant;
  size?: 'sm' | 'md';
  pulse?: boolean;
  label?: string;
}

export function StatusDot({
  variant = 'neutral',
  size = 'sm',
  pulse = false,
  label,
  className,
  ...props
}: StatusDotProps) {
  return (
    <span
      role={label ? 'status' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(
        styles.statusDot,
        styles[variant],
        styles[size],
        pulse && styles.pulse,
        className,
      )}
      {...props}
    />
  );
}
