import { type CSSProperties, useId, useMemo, useState } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './glow.module.scss';

export interface GlowProps {
  className?: string;
  /**
   * Seed for the procedurally generated blobs. Each mount picks a random lamp
   * by default; pass a fixed seed for a reproducible one (e.g. with SSR).
   */
  seed?: number;
}

// mulberry32 — tiny seeded PRNG so a given seed always yields the same lamp.
function mulberry32(seed: number) {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// An organic closed outline: 6–9 vertices scattered around a (squashed)
// circle, joined by a Catmull-Rom spline converted to cubic Béziers. The goo
// filter smooths whatever this produces, so irregularity reads as lava, not
// polygons.
function blobPath(rng: () => number, cx: number, cy: number, r: number): string {
  const vertices = 6 + Math.floor(rng() * 4);
  const irregularity = 0.12 + rng() * 0.28;
  const squashX = 0.85 + rng() * 0.4;
  const squashY = 0.85 + rng() * 0.4;
  const phase = rng() * Math.PI * 2;

  const pts: [number, number][] = [];
  for (let i = 0; i < vertices; i++) {
    const angle = phase + (i / vertices) * Math.PI * 2;
    const radius = r * (1 - irregularity + rng() * irregularity * 2);
    pts.push([cx + Math.cos(angle) * radius * squashX, cy + Math.sin(angle) * radius * squashY]);
  }

  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < vertices; i++) {
    const p0 = pts[(i - 1 + vertices) % vertices];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % vertices];
    const p3 = pts[(i + 2) % vertices];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return `${d}Z`;
}

interface BlobConfig {
  d: string;
  opacity: number;
  dur: number;
  delay: number;
  rise: number;
  wobbleDur: number;
  wobbleDelay: number;
  sway: number;
}

interface LampConfig {
  blobs: BlobConfig[];
  depthBlobs: BlobConfig[];
}

function generateLamp(seed: number): LampConfig {
  const rng = mulberry32(seed);
  const count = 4 + Math.floor(rng() * 2);
  const blobs: BlobConfig[] = [];
  for (let i = 0; i < count; i++) {
    const r = 13 + rng() * 8; // narrow band — similar sizes, no giant/tiny pair
    const cx = 270 + rng() * 50; // spread across the pool, inside the glass
    const cy = 350 + rng() * 24; // resting in the pool — the cycle rises from here
    const dur = 24 + rng() * 28; // full rise-hover-sink cycle
    const wobbleDur = 6 + rng() * 8;
    // Climb target in lamp coords. At the 4× backdrop scale the screen top
    // sits at y≈225, so most flights poke a little past the screen edge;
    // the clip shape ends at y=174, comfortably off-screen above it.
    const peak = 196 + rng() * 42;
    blobs.push({
      d: blobPath(rng, cx, cy, r),
      opacity: 0.6 + rng() * 0.4,
      dur,
      // Stratified phases: blob i starts i/count of the way through its
      // cycle (± jitter), so the wax stays spread through the lamp instead
      // of randomly clumping into one goo column mid-flight.
      delay: -(((i + rng() * 0.6) / count) * dur),
      rise: cy - peak,
      wobbleDur,
      wobbleDelay: -(rng() * wobbleDur),
      sway: 3 + rng() * 5,
    });
  }

  // Background wax — a dim, slow, softer-edged layer rendered behind the
  // main blobs to give the lamp depth: slightly smaller (perspective),
  // much fainter, and drifting at roughly half speed.
  const depthCount = 3 + Math.floor(rng() * 2);
  const depthBlobs: BlobConfig[] = [];
  for (let i = 0; i < depthCount; i++) {
    const r = 12 + rng() * 6;
    const cx = 268 + rng() * 54;
    const cy = 352 + rng() * 24;
    const dur = 36 + rng() * 30;
    const wobbleDur = 9 + rng() * 8;
    const peak = 205 + rng() * 45; // stays a touch lower — the foreground owns the top edge
    depthBlobs.push({
      d: blobPath(rng, cx, cy, r),
      // Near-full alpha INTO the filter — the goo threshold erases dim input.
      // The layer is faded as a whole, after filtering, in the JSX.
      opacity: 0.85 + rng() * 0.15,
      dur,
      delay: -(((i + rng() * 0.6) / depthCount) * dur),
      rise: cy - peak,
      wobbleDur,
      wobbleDelay: -(rng() * wobbleDur),
      sway: 2 + rng() * 3,
    });
  }

  return { blobs, depthBlobs };
}

/**
 * The signature lava-lamp ambient glow — gooey blobs drifting behind a soft
 * radial halo. Colour follows `--fui-glow` (via `currentColor`), so it retints
 * with the theme; size/position are controlled by the parent. Blob shapes are
 * procedurally generated: random per mount unless `seed` is given.
 */
export function Glow({ className, seed }: GlowProps) {
  const uid = useId().replace(/:/g, '');
  const goo = `goo-${uid}`;
  const gooSoft = `goo-soft-${uid}`;
  const clip = `clip-${uid}`;
  const grad = `grad-${uid}`;

  const [fallbackSeed] = useState(() => Math.floor(Math.random() * 2 ** 31));
  const { blobs, depthBlobs } = useMemo(
    () => generateLamp(seed ?? fallbackSeed),
    [seed, fallbackSeed],
  );

  const renderWax = (configs: BlobConfig[]) =>
    configs.map((b) => (
      <g
        key={b.d}
        className={styles.blob}
        style={
          {
            opacity: b.opacity,
            '--lava-dur': `${b.dur.toFixed(1)}s`,
            '--lava-delay': `${b.delay.toFixed(1)}s`,
            '--lava-rise': `${b.rise.toFixed(0)}px`,
          } as CSSProperties
        }
      >
        <path
          className={styles.wobble}
          d={b.d}
          style={
            {
              '--lava-wdur': `${b.wobbleDur.toFixed(1)}s`,
              '--lava-wdelay': `${b.wobbleDelay.toFixed(1)}s`,
              '--lava-sway': `${b.sway.toFixed(1)}px`,
            } as CSSProperties
          }
        />
      </g>
    ));

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

        {/* Softer goo for the depth layer — bigger blur, gentler threshold,
            so background wax reads as out-of-focus */}
        <filter id={gooSoft} colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 14 -6"
          />
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

      {/* Depth layer first — slow, soft-edged wax behind the main blobs.
          Opacity sits on this group so it dims AFTER the goo filter; dimming
          the blobs before it would push them under the threshold entirely. */}
      <g filter={`url(#${gooSoft})`} clipPath={`url(#${clip})`} fill="currentColor" opacity={0.2}>
        {renderWax(depthBlobs)}
      </g>

      <g filter={`url(#${goo})`} clipPath={`url(#${clip})`} fill="currentColor">
        {renderWax(blobs)}
        <path
          className={styles.botBlob}
          d="M354,381.2c6.8,3.4,5.4,7.4-5.6,10.4c-10.7,3.1-31.1,5.1-54.4,8.4c-23.3,3.3-43.7,0.8-54.4-2.4c-11-3.4-12.4-7.6-5.6-13.8c6.8-7,18.9-14.6,29.6-17.4c11-3.3,20.6-1.8,30.4-1.4c9.8,0.4,19.4,5.1,30.4,8.3C335.1,376.8,347.2,378.6,354,381.2z"
        />
      </g>
    </svg>
  );
}
