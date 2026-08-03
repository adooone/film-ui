import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './card.module.scss';

export type CardProps = HTMLAttributes<HTMLDivElement>;

function CardRoot({ className, children, ...props }: CardProps) {
  return (
    <div className={cn(styles.card, className)} {...props}>
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
