import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/style-helpers';
import {
  ToastContext,
  type ToastOptions,
  type ToastPosition,
  type ToastVariant,
} from './toast-context';
import styles from './toast.module.scss';

export interface ToastProviderProps {
  children: ReactNode;
  position?: ToastPosition;
  /** Default auto-dismiss in ms for toasts that don't set their own. */
  defaultDuration?: number;
}

interface ToastItem {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  variant: ToastVariant;
}

/**
 * Portal-renders the toast stack and provides the `useToast` context.
 * Wrap the app once, near the root.
 */
export function ToastProvider({
  children,
  position = 'bottom-right',
  defaultDuration = 5000,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef(new Map<string, number>());
  const counter = useRef(0);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((t) => t.id !== id));
    const handle = timers.current.get(id);
    if (handle !== undefined) {
      window.clearTimeout(handle);
      timers.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (options: ToastOptions) => {
      counter.current += 1;
      const id = `fui-toast-${counter.current}`;
      setToasts((current) => [
        ...current,
        {
          id,
          title: options.title,
          description: options.description,
          variant: options.variant ?? 'info',
        },
      ]);
      const duration = options.duration ?? defaultDuration;
      if (duration > 0) {
        timers.current.set(
          id,
          window.setTimeout(() => dismiss(id), duration),
        );
      }
      return id;
    },
    [defaultDuration, dismiss],
  );

  useEffect(() => {
    const pending = timers.current;
    return () => {
      for (const handle of pending.values()) window.clearTimeout(handle);
    };
  }, []);

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div className={cn(styles.stack, styles[position])}>
          {toasts.map((t) => (
            <div
              key={t.id}
              role={t.variant === 'error' ? 'alert' : 'status'}
              className={cn(styles.toast, styles[t.variant])}
            >
              {t.title && <p className={styles.title}>{t.title}</p>}
              {t.description && <p className={styles.description}>{t.description}</p>}
              <button
                type="button"
                aria-label="Dismiss"
                className={styles.close}
                onClick={() => dismiss(t.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}
