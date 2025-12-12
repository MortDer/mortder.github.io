import React from 'react';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';

interface ModalProps {
  visible: boolean;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ visible, children }) => {
  if (!visible) {
    return null;
  }

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} type="button">
          ×
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.body
  );
};
