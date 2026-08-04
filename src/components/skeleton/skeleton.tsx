import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './skeleton.module.scss';

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'text' | 'rect' | 'circle';
  width?: number | string;
  height?: number | string;
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  className,
  style,
  ...props
}: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(styles.skeleton, styles[variant], className)}
      style={{ width, height, ...style }}
      {...props}
    />
  );
}
