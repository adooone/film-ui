import type { CSSProperties, HTMLAttributes } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './glass.module.scss';

export interface GlassProps extends HTMLAttributes<HTMLDivElement> {
  /** Backdrop-blur radius in px. Defaults to the token (50). */
  blur?: number;
}

/**
 * The core frosted-glass surface: a translucent fill behind a heavy backdrop
 * blur, with a soft ambient shadow. The building block for panels and cards.
 */
export function Glass({ blur, className, style, children, ...props }: GlassProps) {
  const vars = blur != null ? ({ '--fui-glass-blur': `${blur}px` } as CSSProperties) : undefined;

  return (
    <div className={cn(styles.glass, className)} style={{ ...vars, ...style }} {...props}>
      {children}
    </div>
  );
}
