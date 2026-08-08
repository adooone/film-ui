import { type InputHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './file-button.module.scss';

export interface FileButtonProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'children'> {
  onFiles: (files: FileList) => void;
  icon?: ReactNode;
  children: ReactNode;
}

export const FileButton = forwardRef<HTMLInputElement, FileButtonProps>(function FileButton(
  { onFiles, icon, children, disabled, className, ...props },
  ref,
) {
  return (
    <label className={cn(styles.fileButton, disabled && styles.disabled, className)}>
      <input
        ref={ref}
        type="file"
        className={styles.input}
        disabled={disabled}
        onChange={(event) => {
          const { files } = event.target;
          if (files && files.length > 0) onFiles(files);
        }}
        {...props}
      />
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </label>
  );
});
