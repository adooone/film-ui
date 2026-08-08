import {
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './copy-button.module.scss';

export interface CopyButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  value: string;
  label?: string;
  copiedLabel?: string;
  icon?: ReactNode;
  copiedIcon?: ReactNode;
  timeout?: number;
  onCopy?: () => void;
}

export const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(function CopyButton(
  {
    value,
    label = 'copy',
    copiedLabel = 'copied',
    icon,
    copiedIcon,
    timeout = 2000,
    onCopy,
    onClick,
    className,
    ...props
  },
  ref,
) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    const write = navigator.clipboard?.writeText(value);
    if (!write) return;
    write.then(
      () => {
        setCopied(true);
        onCopy?.();
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(false), timeout);
      },
      () => setCopied(false),
    );
  };

  const currentIcon = copied ? (copiedIcon ?? icon) : icon;
  const currentLabel = copied ? copiedLabel : label;

  return (
    <button
      ref={ref}
      type="button"
      aria-label={currentLabel}
      className={cn(styles.copyButton, copied && styles.copied, className)}
      onClick={handleClick}
      {...props}
    >
      {currentIcon && (
        <span className={styles.icon} aria-hidden="true">
          {currentIcon}
        </span>
      )}
      <span>{currentLabel}</span>
    </button>
  );
});
