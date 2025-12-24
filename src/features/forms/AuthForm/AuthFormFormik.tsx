import React, { memo, useEffect, useMemo } from 'react';
import { FormikErrors, FormikHelpers, useFormik } from 'formik';
import { AuthForm } from './AuthForm';
import { AuthFormValues, AuthMode } from './types';

export type AuthFormFormikProps = {
  className?: string;
  disabled?: boolean;
  mode: AuthMode;
  initialValues?: Partial<AuthFormValues>;
  /** Если true — сразу пытаемся сабмитнуть, чтобы показать ошибки */
  submitOnMount?: boolean;
  onSubmit?: (values: AuthFormValues, helpers: FormikHelpers<AuthFormValues>) => void | Promise<void>;
};

const normalizeValues = (values?: Partial<AuthFormValues>): AuthFormValues => ({
  email: values?.email ?? '',
  password: values?.password ?? '',
  repeatPassword: values?.repeatPassword ?? '',
});

const isEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const AuthFormFormik = memo<AuthFormFormikProps>(
  ({ className, disabled, mode, initialValues, submitOnMount, onSubmit }) => {
    const normalizedInitialValues = useMemo(() => normalizeValues(initialValues), [initialValues]);

    const validate = (values: AuthFormValues): FormikErrors<AuthFormValues> => {
      const errors: FormikErrors<AuthFormValues> = {};

      if (!values.email.trim()) errors.email = 'errors.is_required';
      else if (!isEmail(values.email.trim())) errors.email = 'errors.invalid_email_address';

      if (!values.password.trim()) errors.password = 'errors.is_required';
      else if (values.password.trim().length < 8) errors.password = 'errors.too_short_password';

      if (mode === AuthMode.signUp) {
        if (!values.repeatPassword.trim()) errors.repeatPassword = 'errors.is_required';
        else if (values.repeatPassword !== values.password) errors.repeatPassword = 'errors.not_same_password';
      }

      return errors;
    };

    const formik = useFormik<AuthFormValues>({
      initialValues: normalizedInitialValues,
      validate,
      onSubmit: async (values, helpers) => {
        // eslint-disable-next-line no-console
        console.log(mode, values);

        await onSubmit?.(values, helpers);
      },
    });

    useEffect(() => {
      if (!submitOnMount) return;
      formik.submitForm();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submitOnMount]);

    return <AuthForm className={className} disabled={disabled} mode={mode} formManager={formik} />;
  }
);

AuthFormFormik.displayName = 'AuthFormFormik';


