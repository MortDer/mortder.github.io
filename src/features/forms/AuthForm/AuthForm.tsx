import React, { memo } from 'react';
import cn from 'clsx';
import { Button, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { FormItem } from 'src/shared/ui/FormItem';
import { getValidates } from 'src/utils/validation';
import { AuthFormProps, AuthMode } from './types';
import s from './AuthForm.module.sass';

export const AuthForm = memo<AuthFormProps>(({ className, disabled, formManager, mode }) => {
  const { t } = useTranslation();

  const { values, touched, errors, submitCount, handleBlur, handleSubmit, handleChange, isSubmitting } = formManager;

  const submitTitle =
    mode === AuthMode.signUp ? t('screens.auth.signUp.submit') : t('screens.auth.signIn.submit');

  const emailError = typeof errors.email === 'string' ? errors.email : '';
  const passwordError = typeof errors.password === 'string' ? errors.password : '';
  const repeatPasswordError = typeof errors.repeatPassword === 'string' ? errors.repeatPassword : '';

  const translatedEmailError = emailError.startsWith('errors.') || emailError.startsWith('ERR_') ? t(emailError) : emailError;
  const translatedPasswordError =
    passwordError.startsWith('errors.') || passwordError.startsWith('ERR_') ? t(passwordError) : passwordError;
  const translatedRepeatPasswordError =
    repeatPasswordError.startsWith('errors.') || repeatPasswordError.startsWith('ERR_')
      ? t(repeatPasswordError)
      : repeatPasswordError;

  const emailValidates = getValidates(translatedEmailError, touched.email, submitCount);
  const passwordValidates = getValidates(translatedPasswordError, touched.password, submitCount);
  const repeatPasswordValidates = getValidates(translatedRepeatPasswordError, touched.repeatPassword, submitCount);

  return (
    <form onSubmit={handleSubmit} className={cn(s.root, className)}>
      <FormItem title={t('forms.AuthForm.email.title')} required validateStatus={emailValidates.validateStatus} help={emailValidates.help}>
        <Input
          prefix={<MailOutlined />}
          disabled={disabled}
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          placeholder={t('forms.AuthForm.email.placeholder')}
          autoComplete="email"
        />
      </FormItem>

      <FormItem title={t('forms.AuthForm.password.title')} required validateStatus={passwordValidates.validateStatus} help={passwordValidates.help}>
        <Input.Password
          prefix={<LockOutlined />}
          disabled={disabled}
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          placeholder={t('forms.AuthForm.password.placeholder')}
          autoComplete={mode === AuthMode.signUp ? 'new-password' : 'current-password'}
        />
      </FormItem>

      {mode === AuthMode.signUp && (
        <FormItem
          title={t('forms.RepeatPasswordForm.repeatPassword.title')}
          required
          validateStatus={repeatPasswordValidates.validateStatus}
          help={repeatPasswordValidates.help}
        >
          <Input.Password
            prefix={<LockOutlined />}
            disabled={disabled}
            name="repeatPassword"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.repeatPassword}
            placeholder={t('forms.RepeatPasswordForm.repeatPassword.placeholder')}
            autoComplete="new-password"
          />
        </FormItem>
      )}

      <div className={s.actions}>
        <Button type="primary" htmlType="submit" disabled={disabled} loading={isSubmitting}>
          {submitTitle}
        </Button>
      </div>
    </form>
  );
});

AuthForm.displayName = 'AuthForm';


