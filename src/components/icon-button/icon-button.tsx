import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './icon-button.module.scss';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  /** Accessible name — rendered as aria-label and title. */
  label: string;
  variant?: 'default' | 'ghost' | 'danger';
  size?: 'sm' | 'md';
  /** Pressed-in look for toggles. Also sets aria-pressed. */
  isActive?: boolean;
}

/**
 * A square icon-only button. Default is a frosted chip with the offset
 * shadow; ghost is chrome-less for dense toolbars; danger for destructive
 * actions.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, label, variant = 'default', size = 'md', isActive = false, className, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={isActive || undefined}
      className={cn(
        styles.iconButton,
        styles[variant],
        styles[size],
        isActive && styles.active,
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  );
});
