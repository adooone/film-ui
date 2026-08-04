import { type CSSProperties, type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './glass.module.scss';

export interface GlassProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Backdrop-blur radius in px. Defaults to the token (50).
   * Pass 0 to disable the filter entirely — useful for Glass nested inside
   * Glass, where the backdrop is already blurred.
   */
  blur?: number;
}

/**
 * The core frosted-glass surface: a translucent fill behind a heavy backdrop
 * blur, with a soft ambient shadow. The building block for panels and cards.
 */
export const Glass = forwardRef<HTMLDivElement, GlassProps>(function Glass(
  { blur, className, style, children, ...props },
  ref,
) {
  // blur={0} must remove the filter, not apply blur(0px) — a zero-radius
  // backdrop-filter still forces the browser to isolate and re-composite a
  // render surface on every backdrop change.
  const vars: CSSProperties | undefined =
    blur === 0
      ? { backdropFilter: 'none', WebkitBackdropFilter: 'none' }
      : blur != null
        ? ({ '--fui-glass-blur': `${blur}px` } as CSSProperties)
        : undefined;

  return (
    <div ref={ref} className={cn(styles.glass, className)} style={{ ...vars, ...style }} {...props}>
      {children}
    </div>
  );
});
