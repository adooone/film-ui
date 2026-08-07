import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import { Spinner } from '../spinner';
import styles from './empty-state.module.scss';

export type EmptyStateStatus = 'loading' | 'empty' | 'error';

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  status?: EmptyStateStatus;
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

const roles: Record<EmptyStateStatus, HTMLAttributes<HTMLDivElement>['role']> = {
  loading: 'status',
  empty: 'status',
  error: 'alert',
};

export function EmptyState({
  status = 'empty',
  icon,
  title,
  description,
  action,
  className,
  children,
  ...props
}: EmptyStateProps) {
  const visual = icon ?? (status === 'loading' ? <Spinner size="lg" /> : null);
  return (
    <div
      role={roles[status]}
      aria-busy={status === 'loading' || undefined}
      className={cn(styles.emptyState, styles[status], className)}
      {...props}
    >
      {visual && <div className={styles.visual}>{visual}</div>}
      {title && <p className={styles.title}>{title}</p>}
      {description && <p className={styles.description}>{description}</p>}
      {children}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
