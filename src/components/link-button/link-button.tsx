import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './link-button.module.scss';

export interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'inherit' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconRight?: ReactNode;
}

export const LinkButton = forwardRef<HTMLButtonElement, LinkButtonProps>(function LinkButton(
  { color = 'accent', size = 'md', icon, iconRight, className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(styles.linkButton, styles[color], styles[size], className)}
      {...props}
    >
      {icon && <span className={styles.iconSlot}>{icon}</span>}
      {children}
      {iconRight && <span className={styles.iconSlot}>{iconRight}</span>}
    </button>
  );
});
