import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileFormFormik } from 'src/features/forms/ProfileForm/ProfileFormFormik';
import { useAppDispatch, useAppSelector } from 'src/store';
import { signOut } from 'src/store/authThunks';
import { selectProfile } from 'src/store/selectors';
import styles from './Pages.module.css';

export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profile = useAppSelector(selectProfile);

  const onLogout = () => {
    dispatch(signOut());
    navigate('/auth', { replace: true });
  };

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Профиль</h1>
      <p className={styles.subtitle}>Профиль заполняется фейковыми данными на основе токена.</p>
      {profile && (
        <div className={styles.profileCard}>
          <p className={styles.profileRow}>
            <strong>ID:</strong> {profile.id}
          </p>
          <p className={styles.profileRow}>
            <strong>Email:</strong> {profile.email}
          </p>
          <p className={styles.profileRow}>
            <strong>Роль:</strong> {profile.role}
          </p>
          <button type="button" className={styles.secondaryButton} onClick={onLogout}>
            Выйти
          </button>
        </div>
      )}
      <ProfileFormFormik />
    </section>
  );
};
