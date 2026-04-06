import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthFormFormik, AuthMode, AuthFormValues } from 'src/features/forms/AuthForm';
import { SignUpWithFetch, SignUpWithThunk } from 'src/features/forms/SignUpForm';
import { useAppDispatch } from 'src/store';
import { signIn } from 'src/store/authThunks';
import styles from './Pages.module.css';

enum SignUpVariant {
  fetch = 'fetch',
  thunk = 'thunk',
}

export const AuthPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>(AuthMode.signIn);
  const [signUpVariant, setSignUpVariant] = useState<SignUpVariant>(SignUpVariant.fetch);

  const onSubmit = async (values: AuthFormValues): Promise<void> => {
    dispatch(signIn(values.email));
    navigate('/profile', { replace: true });
  };

  const isSignUpMode = mode === AuthMode.signUp;

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>{isSignUpMode ? 'Регистрация' : 'Вход'}</h1>
      <p className={styles.subtitle}>
        {isSignUpMode
          ? 'Ниже два варианта регистрации: прямой запрос из компонента и вариант через redux-thunk.'
          : 'Авторизация фейковая: email c словом "admin" создаст роль администратора.'}
      </p>

      {isSignUpMode ? (
        <>
          <div className={styles.topBar}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => setSignUpVariant(SignUpVariant.fetch)}
            >
              Вариант 1: fetch в компоненте
            </button>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => setSignUpVariant(SignUpVariant.thunk)}
            >
              Вариант 2: redux-thunk
            </button>
          </div>

          {signUpVariant === SignUpVariant.fetch ? (
            <SignUpWithFetch onSuccess={() => navigate('/profile', { replace: true })} />
          ) : (
            <SignUpWithThunk onSuccess={() => navigate('/profile', { replace: true })} />
          )}
        </>
      ) : (
        <AuthFormFormik mode={mode} onSubmit={onSubmit} />
      )}

      <button
        type="button"
        className={styles.secondaryButton}
        onClick={() => {
          setMode(isSignUpMode ? AuthMode.signIn : AuthMode.signUp);
          setSignUpVariant(SignUpVariant.fetch);
        }}
      >
        {isSignUpMode ? 'У меня уже есть аккаунт' : 'Создать аккаунт'}
      </button>
    </section>
  );
};
