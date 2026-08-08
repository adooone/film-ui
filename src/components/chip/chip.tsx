import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './chip.module.scss';

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  size?: 'sm' | 'md';
  icon?: ReactNode;
  onToggle?: (selected: boolean) => void;
}

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  { selected = false, size = 'md', icon, onToggle, onClick, className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={selected}
      className={cn(styles.chip, styles[size], selected && styles.selected, className)}
      onClick={(event) => {
        onClick?.(event);
        onToggle?.(!selected);
      }}
      {...props}
    >
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </button>
  );
});
