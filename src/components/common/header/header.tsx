import React from 'react';
import { Logo } from '../logo/logo';
import styles from './header.module.css';

export interface MenuItem {
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
          {menuItems.map((item, index) => (
            <a key={index} href={item.navTo} className={styles.navLink}>
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};
