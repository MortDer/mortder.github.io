import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/store';
import { setStoredToken } from 'src/store/storage';
import { setToken } from 'src/store/slices/authSlice';
import { signUpRequest } from 'src/shared/api/authApi';
import { getSignUpErrorKey } from './shared';
import styles from 'src/pages/Pages.module.css';

type SignUpWithFetchProps = {
  onSuccess?: () => void;
};

export const SignUpWithFetch: React.FC<SignUpWithFetchProps> = ({ onSuccess }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setErrorKey(null);
    setIsLoading(true);

    try {
      const { token } = await signUpRequest({
        email: email.trim(),
        password,
      });

      setStoredToken(token);
      dispatch(setToken(token));
      onSuccess?.();
    } catch (error) {
      setErrorKey(getSignUpErrorKey(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.label}>
        Email
        <input
          className={styles.input}
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          disabled={isLoading}
        />
      </label>

      <label className={styles.label}>
        Password
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          disabled={isLoading}
        />
      </label>

      {errorKey && <p className={styles.subtitle}>{t(`errors.${errorKey}`, { defaultValue: t('errors.unexpected_error') })}</p>}

      <div className={styles.actions}>
        <button type="submit" className={styles.primaryButton} disabled={isLoading}>
          {isLoading ? 'Регистрация...' : 'Зарегистрироваться (fetch)'}
        </button>
      </div>
    </form>
  );
};

