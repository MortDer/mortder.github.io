import React from 'react';
import { Logo } from '../logo/logo';
import styles from './header.module.css';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo size="medium" />
        <nav className={styles.nav}>
          <a href="#" className={styles.navLink}>
            Главная
          </a>
          <a href="#" className={styles.navLink}>
            О нас
          </a>
          <a href="#" className={styles.navLink}>
            Контакты
          </a>
        </nav>
      </div>
    </header>
  );
};
