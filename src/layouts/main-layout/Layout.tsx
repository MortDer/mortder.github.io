import React from 'react';
import { Header, MenuItem } from '../../components/common/header/Header';
import styles from './Layout.module.css';

interface LayoutProps {
  mainContent: React.ReactNode;
  menuItems: MenuItem[];
}

export const Layout: React.FC<LayoutProps> = ({ mainContent, menuItems }) => {
  return (
    <div className={styles.layout}>
      <Header menuItems={menuItems} />
      <main className={styles.main}>{mainContent}</main>
    </div>
  );
};
