import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthFormFormik, AuthMode, AuthFormValues } from 'src/features/forms/AuthForm';
import { useAppDispatch } from 'src/store';
import { signIn } from 'src/store/authThunks';
import styles from './Pages.module.css';

export const AuthPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>(AuthMode.signIn);

  const onSubmit = async (values: AuthFormValues): Promise<void> => {
    dispatch(signIn(values.email));
    navigate('/profile', { replace: true });
  };

  const isSignUpMode = mode === AuthMode.signUp;

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>{isSignUpMode ? 'Регистрация' : 'Вход'}</h1>
      <p className={styles.subtitle}>Авторизация фейковая: email c словом "admin" создаст роль администратора.</p>
      <AuthFormFormik mode={mode} onSubmit={onSubmit} />
      <button
        type="button"
        className={styles.secondaryButton}
        onClick={() => setMode(isSignUpMode ? AuthMode.signIn : AuthMode.signUp)}
      >
        {isSignUpMode ? 'У меня уже есть аккаунт' : 'Создать аккаунт'}
      </button>
    </section>
  );
};
