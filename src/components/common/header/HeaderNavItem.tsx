import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import type { MenuItem } from './Header';

type HeaderNavItemProps = Pick<MenuItem, 'title' | 'navTo'>;

export const HeaderNavItem: React.FC<HeaderNavItemProps> = ({ title, navTo }) => {
  return (
    <NavLink
      to={navTo}
      className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink)}
    >
      {title}
    </NavLink>
  );
};


