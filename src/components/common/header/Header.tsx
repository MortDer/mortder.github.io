import React from 'react';
import { Logo } from 'src/assets/logo/Logo';
import styles from './Header.module.css';
import { HeaderNavItem } from './HeaderNavItem';

export interface MenuItem {
  id: string;
  title: string;
  navTo: string;
}

interface HeaderProps {
  menuItems: MenuItem[];
}

export const Header: React.FC<HeaderProps> = ({ menuItems }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo size="medium" />
        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <HeaderNavItem key={item.id} title={item.title} navTo={item.navTo} />
          ))}
        </nav>
      </div>
    </header>
  );
};
