import React from 'react';
import styles from './Header.module.css';
import type { MenuItem } from './Header';

export type HeaderNavItemProps = Pick<MenuItem, 'title' | 'navTo'>;

export const HeaderNavItem: React.FC<HeaderNavItemProps> = ({ title, navTo }) => {
  return (
    <a href={navTo} className={styles.navLink}>
      {title}
    </a>
  );
};


