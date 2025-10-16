import React from 'react';
import { Header, MenuItem } from '../header/header';
import styles from './layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
  menuItems: MenuItem[];
}

export const Layout: React.FC<LayoutProps> = ({ children, menuItems }) => {
  return (
    <div className={styles.layout}>
      <Header menuItems={menuItems} />
      <main className={styles.main}>{children}</main>
    </div>
  );
};
