import type { ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import { Glow } from '../glow';
import { Grain } from '../grain';
import styles from './backdrop.module.scss';

export interface BackdropProps {
  /** Render the drifting film-grain layer. Defaults to true. */
  grain?: boolean;
  /** Render the lava glow layer. Defaults to true. */
  glow?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Full-bleed ambient background: the lava {@link Glow} and film {@link Grain}
 * layered behind its children. Use it as the outermost shell of a page.
 */
export function Backdrop({ grain = true, glow = true, className, children }: BackdropProps) {
  return (
    <div className={cn(styles.backdrop, className)}>
      {glow && (
        <div className={styles.glowLayer}>
          <Glow />
        </div>
      )}
      {grain && <Grain className={styles.grainLayer} />}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
