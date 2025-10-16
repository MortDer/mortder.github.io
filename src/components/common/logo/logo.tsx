import React from 'react';
import styles from './logo.module.css';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

export const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  return (
    <div className={`${styles.logo} ${styles[size]}`}>
      <div className={styles.circle}>
        <span className={styles.text}>M</span>
      </div>
    </div>
  );
};
