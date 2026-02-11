import React from 'react';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';

interface ModalProps {
  visible: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

export const Modal: React.FC<ModalProps> = ({ visible, children, onClose }) => {
  if (!visible) {
    return null;
  }

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      className={styles.overlay}
      onClick={onClose}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          onClose?.();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Закрыть модальное окно"
    >
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <button className={styles.closeButton} type="button" onClick={onClose}>
          ×
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.body
  );
};
