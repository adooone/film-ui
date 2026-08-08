import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './kbd.module.scss';

export type KbdProps = HTMLAttributes<HTMLElement>;

export function Kbd({ className, children, ...props }: KbdProps) {
  return (
    <kbd className={cn(styles.kbd, className)} {...props}>
      {children}
    </kbd>
  );
}
