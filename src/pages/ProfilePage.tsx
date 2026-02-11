import React from 'react';
import { ProfileFormFormik } from 'src/features/forms/ProfileForm/ProfileFormFormik';
import styles from './Pages.module.css';

export const ProfilePage: React.FC = () => {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Профиль</h1>
      <p className={styles.subtitle}>Заполните информацию о пользователе.</p>
      <ProfileFormFormik />
    </section>
  );
};
