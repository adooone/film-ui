import {
  Children,
  type FocusEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  cloneElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/style-helpers';
import styles from './tooltip.module.scss';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Tooltip content. Pass undefined/null to disable without unwrapping the child. */
  content?: ReactNode;
  /** A single element that becomes the trigger (handlers are merged in). */
  children: ReactElement;
  placement?: TooltipPlacement;
  /** Hover delay in ms — keyboard focus shows immediately. */
  delay?: number;
}

const GAP = 8;
const EDGE = 8;

function composeHandlers<E>(theirs: unknown, ours: (event: E) => void) {
  return (event: E) => {
    if (typeof theirs === 'function') (theirs as (event: E) => void)(event);
    ours(event);
  };
}

/**
 * A portal tooltip on hover and keyboard focus. Position is computed against
 * the trigger and clamped to the viewport; Escape, scroll, and resize hide it.
 */
export function Tooltip({ content, children, placement = 'top', delay = 300 }: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const hide = useCallback(() => {
    window.clearTimeout(timer.current);
    setOpen(false);
    setCoords(null);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') hide();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', hide, true);
    window.addEventListener('resize', hide);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', hide, true);
      window.removeEventListener('resize', hide);
    };
  }, [open, hide]);

  // Two-phase: render hidden, measure, then place (and clamp to viewport).
  useLayoutEffect(() => {
    if (!open) return;
    const rect = rectRef.current;
    const bubble = bubbleRef.current;
    if (!rect || !bubble) return;
    const b = bubble.getBoundingClientRect();

    let top: number;
    let left: number;
    switch (placement) {
      case 'bottom':
        top = rect.bottom + GAP;
        left = rect.left + rect.width / 2 - b.width / 2;
        break;
      case 'left':
        top = rect.top + rect.height / 2 - b.height / 2;
        left = rect.left - b.width - GAP;
        break;
      case 'right':
        top = rect.top + rect.height / 2 - b.height / 2;
        left = rect.right + GAP;
        break;
      default:
        top = rect.top - b.height - GAP;
        left = rect.left + rect.width / 2 - b.width / 2;
    }

    left = Math.min(Math.max(left, EDGE), window.innerWidth - b.width - EDGE);
    top = Math.min(Math.max(top, EDGE), window.innerHeight - b.height - EDGE);
    setCoords({ top, left });
  }, [open, placement]);

  const disabled = content == null || content === false || content === '';

  const child = Children.only(children);
  const childProps = child.props as Record<string, unknown>;

  const showNow = (el: Element) => {
    rectRef.current = el.getBoundingClientRect();
    setOpen(true);
  };

  if (disabled) return children;

  const trigger = cloneElement(child as ReactElement<Record<string, unknown>>, {
    onMouseEnter: composeHandlers(childProps.onMouseEnter, (e: MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => showNow(el), delay);
    }),
    onMouseLeave: composeHandlers(childProps.onMouseLeave, hide),
    onFocus: composeHandlers(childProps.onFocus, (e: FocusEvent<HTMLElement>) => {
      showNow(e.currentTarget);
    }),
    onBlur: composeHandlers(childProps.onBlur, hide),
    'aria-describedby': open ? id : (childProps['aria-describedby'] as string | undefined),
  });

  return (
    <>
      {trigger}
      {open &&
        createPortal(
          <div
            ref={bubbleRef}
            id={id}
            role="tooltip"
            className={cn(styles.tooltip, coords && styles.ready)}
            style={coords ? { top: coords.top, left: coords.left } : undefined}
          >
            {content}
          </div>,
          document.body,
        )}
    </>
  );
}
