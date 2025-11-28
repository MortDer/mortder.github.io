import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  visible: boolean;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ visible, children }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} type="button">
          ×
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
