import type { CSSProperties, HTMLAttributes } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './grain.module.scss';

export interface GrainProps extends HTMLAttributes<HTMLDivElement> {
  /** Overlay opacity (0–1). Defaults to 0.06. */
  opacity?: number;
}

/**
 * Animated film-grain overlay. Drop it inside a positioned container to add a
 * drifting noise texture. Purely decorative — `aria-hidden` by default.
 */
export function Grain({ opacity, className, style, ...props }: GrainProps) {
  const vars =
    opacity != null ? ({ '--fui-grain-opacity': String(opacity) } as CSSProperties) : undefined;
  // Default opacity lives in the SCSS (0.4 dark / 0.2 light) — override via the `opacity` prop.

  return (
    <div
      aria-hidden
      className={cn(styles.grain, className)}
      style={{ ...vars, ...style }}
      {...props}
    />
  );
}
