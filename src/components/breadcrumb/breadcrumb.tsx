import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './breadcrumb.module.scss';

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
  current?: boolean;
}

export interface BreadcrumbProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  items: BreadcrumbItem[];
  separator?: ReactNode;
}

function BreadcrumbNode({ item, current }: { item: BreadcrumbItem; current: boolean }) {
  if (current) {
    return (
      <span className={styles.current} aria-current="page">
        {item.label}
      </span>
    );
  }
  if (item.href) {
    return (
      <a className={styles.link} href={item.href} onClick={item.onClick}>
        {item.label}
      </a>
    );
  }
  if (item.onClick) {
    return (
      <button type="button" className={styles.link} onClick={item.onClick}>
        {item.label}
      </button>
    );
  }
  return <span className={styles.link}>{item.label}</span>;
}

export function Breadcrumb({ items, separator = '/', className, ...props }: BreadcrumbProps) {
  const seen = new Map<string, number>();

  return (
    <nav aria-label="Breadcrumb" className={cn(styles.breadcrumb, className)} {...props}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const current = item.current ?? isLast;
          const base = item.href ?? (typeof item.label === 'string' ? item.label : '');
          const occurrence = seen.get(base) ?? 0;
          seen.set(base, occurrence + 1);

          return (
            <li key={`${base} ${occurrence}`} className={styles.item}>
              <BreadcrumbNode item={item} current={current} />
              {!isLast && (
                <span className={styles.separator} aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
