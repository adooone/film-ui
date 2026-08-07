import type { ReactNode, SVGProps } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './icon.module.scss';

export type IconName =
  | 'close'
  | 'check'
  | 'copy'
  | 'plus'
  | 'folder'
  | 'lightbulb'
  | 'chevron-up'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'play'
  | 'flag'
  | 'sort-asc'
  | 'sort-desc'
  | 'refresh'
  | 'more'
  | 'wand'
  | 'merge'
  | 'push'
  | 'pull'
  | 'shuffle'
  | 'commit'
  | 'github'
  | 'note';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name' | 'children'> {
  name: IconName;
  size?: number | string;
  title?: string;
}

const paths: Record<IconName, ReactNode> = {
  close: <path d="M6 6l12 12M18 6L6 18" />,
  check: <path d="M5 13l4 4L19 7" />,
  copy: (
    <>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  folder: <path d="M3 6a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V6z" />,
  lightbulb: (
    <>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 00-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0012 3z" />
    </>
  ),
  'chevron-up': <path d="M6 15l6-6 6 6" />,
  'chevron-down': <path d="M6 9l6 6 6-6" />,
  'chevron-left': <path d="M15 6l-6 6 6 6" />,
  'chevron-right': <path d="M9 6l6 6-6 6" />,
  play: <path d="M8 5v14l11-7z" />,
  flag: (
    <>
      <path d="M5 21V4" />
      <path d="M5 4h11l-2 4 2 4H5" />
    </>
  ),
  'sort-asc': (
    <>
      <path d="M12 5v14" />
      <path d="M8 9l4-4 4 4" />
    </>
  ),
  'sort-desc': (
    <>
      <path d="M12 5v14" />
      <path d="M8 15l4 4 4-4" />
    </>
  ),
  refresh: (
    <>
      <path d="M3 12a9 9 0 019-9 9 9 0 016.7 3L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 01-9 9 9 9 0 01-6.7-3L3 16" />
      <path d="M3 21v-5h5" />
    </>
  ),
  more: (
    <>
      <circle cx="5" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  wand: (
    <>
      <path d="M3 21l12-12" />
      <path d="M12.5 6.5l5 5" />
      <path d="M18 3v4M16 5h4" />
    </>
  ),
  merge: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="18" r="3" />
      <path d="M6 9v12" />
      <path d="M6 9a9 9 0 009 9" />
    </>
  ),
  push: (
    <>
      <path d="M5 4h14" />
      <path d="M12 19V8" />
      <path d="M7 13l5-5 5 5" />
    </>
  ),
  pull: (
    <>
      <path d="M5 20h14" />
      <path d="M12 5v11" />
      <path d="M7 11l5 5 5-5" />
    </>
  ),
  shuffle: (
    <>
      <path d="M16 3h5v5" />
      <path d="M4 20L21 3" />
      <path d="M21 16v5h-5" />
      <path d="M15 15l6 6" />
      <path d="M4 4l5 5" />
    </>
  ),
  commit: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M2 12h6" />
      <path d="M16 12h6" />
    </>
  ),
  github: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.2 11.16.6.1.82-.25.82-.56v-2c-3.34.72-4.04-1.6-4.04-1.6-.55-1.37-1.34-1.74-1.34-1.74-1.1-.74.08-.73.08-.73 1.2.08 1.84 1.22 1.84 1.22 1.07 1.8 2.8 1.29 3.5.98.1-.77.42-1.3.76-1.6-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.21a11.5 11.5 0 016 0c2.28-1.53 3.29-1.21 3.29-1.21.66 1.65.25 2.87.12 3.17.77.83 1.24 1.88 1.24 3.17 0 4.53-2.81 5.53-5.49 5.82.43.37.81 1.1.81 2.22v3.29c0 .32.21.68.82.56A12.02 12.02 0 0024 12.29C24 5.78 18.63.5 12 .5z"
    />
  ),
  note: (
    <>
      <path d="M6 3h9l4 4v13a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6" />
    </>
  ),
};

export function Icon({ name, size = 24, title, className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn(styles.icon, className)}
      {...props}
    >
      {title && <title>{title}</title>}
      {paths[name]}
    </svg>
  );
}
