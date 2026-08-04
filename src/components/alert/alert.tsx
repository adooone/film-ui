import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './alert.module.scss';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  dismissible?: boolean;
  onDismiss?: () => void;
  children: ReactNode;
}

const icons: Record<AlertVariant, ReactNode> = {
  info: (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm1 12H7V7h2v5zM8 5.5A1.25 1.25 0 118 3a1.25 1.25 0 010 2.5z" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.7 5.7l-4.4 4.4a1 1 0 01-1.4 0L3.7 8.3l1.4-1.4L6.6 8.4l3.7-3.7 1.4 1z" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M7.1 1.5a1 1 0 011.8 0l6.4 12A1 1 0 0114.4 15H1.6a1 1 0 01-.9-1.5l6.4-12zM7 6v4h2V6H7zm0 5v2h2v-2H7z" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3 10.6L9.4 12 8 10.6 6.6 12 5 10.6 6.6 9 5 7.4 6.6 6 8 7.4 9.4 6 11 7.4 9.4 9 11 10.6z" />
    </svg>
  ),
};

export function Alert({
  variant = 'info',
  dismissible = false,
  onDismiss,
  className,
  children,
  ...props
}: AlertProps) {
  return (
    <div
      role={variant === 'error' || variant === 'warning' ? 'alert' : 'status'}
      className={cn(styles.alert, styles[variant], className)}
      {...props}
    >
      <span className={styles.icon}>{icons[variant]}</span>
      <div className={styles.message}>{children}</div>
      {dismissible && (
        <button type="button" aria-label="Dismiss" className={styles.dismiss} onClick={onDismiss}>
          ×
        </button>
      )}
    </div>
  );
}
