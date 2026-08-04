import type { CSSProperties, ProgressHTMLAttributes } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './progress.module.scss';

export interface ProgressProps extends Omit<ProgressHTMLAttributes<HTMLProgressElement>, 'color'> {
  value: number;
  max?: number;
  color?: string;
  height?: number;
}

export function Progress({
  value,
  max = 100,
  color,
  height = 8,
  className,
  style,
  ...props
}: ProgressProps) {
  const clamped = max > 0 ? Math.max(0, Math.min(value, max)) : 0;
  const fill = color ? { '--fui-progress-fill': color } : undefined;

  return (
    <progress
      value={clamped}
      max={max}
      className={cn(styles.progress, className)}
      style={{ height, ...fill, ...style } as CSSProperties}
      {...props}
    />
  );
}
