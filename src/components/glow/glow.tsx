import { useId } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './glow.module.scss';

export interface GlowProps {
  className?: string;
}

/**
 * The signature lava-lamp ambient glow — gooey blobs drifting behind a soft
 * radial halo. Colour follows `--fui-glow` (via `currentColor`), so it retints
 * with the theme; size/position are controlled by the parent.
 */
export function Glow({ className }: GlowProps) {
  const uid = useId().replace(/:/g, '');
  const goo = `goo-${uid}`;
  const clip = `clip-${uid}`;
  const grad = `grad-${uid}`;

  return (
    <svg
      className={cn(styles.glow, className)}
      viewBox="0 0 600 600"
      aria-hidden
      role="presentation"
    >
      <defs>
        <filter id={goo} colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -9"
            result="cm"
          />
          <feBlend />
        </filter>

        <clipPath id={clip}>
          <path d="M262,174h60l33.5,182.3c0,0,2.7,12.8,2.5,22.8c-7.5,0-131,0-131,0s-0.7-9.3,0-18C227.6,352.9,262,174,262,174z" />
        </clipPath>

        <radialGradient id={grad} cx="300" cy="300" r="400" gradientUnits="userSpaceOnUse">
          <stop offset="0.0714" stopColor="currentColor" stopOpacity="0.19" />
          <stop offset="0.3107" stopColor="currentColor" stopOpacity="0.13" />
          <stop offset="0.553" stopColor="currentColor" stopOpacity="0.06" />
          <stop offset="0.7828" stopColor="currentColor" stopOpacity="0.02" />
          <stop offset="0.9847" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect fill={`url(#${grad})`} width="600" height="600" />

      <g filter={`url(#${goo})`} clipPath={`url(#${clip})`} fill="currentColor">
        <path
          className={cn(styles.blob0, styles.blob)}
          d="M326.2,149.5c-5,19.2-21.4,29.2-37.8,26.6c-16.5-2.9-33.4-12.9-37.1-26.6c-3.8-13.6,12.5-32.1,37.8-34.9C314.4,111.8,331.3,130.4,326.2,149.5z"
        />
        <path
          className={cn(styles.blob1, styles.blob)}
          d="M320.5,146.4c-4.4,10.1-16.4,20.2-26.8,25.3c-10.4,5.2-22.4-2.9-26.8-15.2c-4.4-11.6,7.6-20.4,26.8-25.3C312.9,126.3,324.9,135.6,320.5,146.4z"
        />
        <path
          className={cn(styles.blob2, styles.blob)}
          d="M278,147.7c2.7-7.1,9.4-15.7,15.4-16.4c5.9-0.4,12.6,8.5,15.4,16.9c2.7,8.4-4.2,14.9-15.4,14.2C282.2,161.5,275.3,154.8,278,147.7z"
        />
        <path
          className={styles.botBlob}
          d="M354,381.2c6.8,3.4,5.4,7.4-5.6,10.4c-10.7,3.1-31.1,5.1-54.4,8.4c-23.3,3.3-43.7,0.8-54.4-2.4c-11-3.4-12.4-7.6-5.6-13.8c6.8-7,18.9-14.6,29.6-17.4c11-3.3,20.6-1.8,30.4-1.4c9.8,0.4,19.4,5.1,30.4,8.3C335.1,376.8,347.2,378.6,354,381.2z"
        />
        <path
          className={cn(styles.blob3, styles.blob)}
          d="M312.7,147.3c-2.1,16.4-15.3,27.2-23.2,25.3c-8.1-1.8-12.6-13-14.8-24.9c-1.9-11.8,2.7-22.7,14.8-25.3C301.5,119.6,314.7,130.8,312.7,147.3z"
        />
        <path
          className={cn(styles.blob4, styles.blob)}
          d="M317.8,147.4c-1,8.2-9.8,10.3-13.8,9.3c-4-0.9-6.5-3-7.6-8.9c-1-5.9,2.3-8.5,8.4-9.8C310.8,136.6,318.8,139.1,317.8,147.4z"
        />
      </g>
    </svg>
  );
}
