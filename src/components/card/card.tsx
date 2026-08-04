import type { HTMLAttributes, KeyboardEvent, MouseEventHandler } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './card.module.scss';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** `sm` is the dense list-row size; `md` the roomy default. */
  size?: 'sm' | 'md';
  /**
   * Makes the whole card clickable — adds role, tab stop, Enter/Space
   * activation, and hover/press styling.
   */
  onClick?: MouseEventHandler<HTMLDivElement>;
}

function activateOnEnterOrSpace(e: KeyboardEvent<HTMLDivElement>) {
  if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    e.currentTarget.click();
  }
}

function CardRoot({ size = 'md', onClick, className, children, ...props }: CardProps) {
  const interactive = onClick != null;
  return (
    <div
      className={cn(styles.card, styles[size], interactive && styles.interactive, className)}
      onClick={onClick}
      {...(interactive
        ? { role: 'button', tabIndex: 0, onKeyDown: activateOnEnterOrSpace }
        : undefined)}
      {...props}
    >
      {children}
    </div>
  );
}

function Title({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn(styles.title, className)} {...props}>
      {children}
    </h3>
  );
}

function Body({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn(styles.body, className)} {...props}>
      {children}
    </p>
  );
}

/** A frosted card surface with the film offset shadow. Compose with Card.Title / Card.Body. */
export const Card = Object.assign(CardRoot, { Title, Body });
