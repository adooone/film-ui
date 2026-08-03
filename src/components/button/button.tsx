import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
  fullWidth?: boolean;
}

/**
 * A chunky, uppercase button with the signature hard offset shadow that snaps
 * flush on press. Ghost is a shadow-outlined variant; secondary is frosted.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', fullWidth = false, className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});
