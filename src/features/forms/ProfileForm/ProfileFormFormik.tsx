import React, { memo, useEffect, useMemo, useRef } from 'react';
import { InputRef } from 'antd';
import { FormikErrors, FormikHelpers, useFormik } from 'formik';
import { ProfileForm } from './ProfileForm';
import { ProfileFormValues } from './types';

export type ProfileFormFormikProps = {
  className?: string;
  disabled?: boolean;
  initialValues?: Partial<ProfileFormValues>;
  /** Если true — сразу пытаемся сабмитнуть, чтобы показать ошибки */
  submitOnMount?: boolean;
  onSubmit?: (values: ProfileFormValues, helpers: FormikHelpers<ProfileFormValues>) => void | Promise<void>;
};

const normalizeValues = (values?: Partial<ProfileFormValues>): ProfileFormValues => ({
  name: values?.name ?? '',
  about: values?.about ?? '',
});

const validate = (values: ProfileFormValues): FormikErrors<ProfileFormValues> => {
  const errors: FormikErrors<ProfileFormValues> = {};

  if (!values.name.trim()) errors.name = 'errors.is_required';
  if (!values.about.trim()) errors.about = 'errors.is_required';

  return errors;
};

export const ProfileFormFormik = memo<ProfileFormFormikProps>(
  ({ className, disabled, initialValues, submitOnMount, onSubmit }) => {
    const formElement = useRef<HTMLFormElement | null>(null);
    const autoFocusElement = useRef<InputRef | null>(null);

    const normalizedInitialValues = useMemo(() => normalizeValues(initialValues), [initialValues]);

    const formik = useFormik<ProfileFormValues>({
      initialValues: normalizedInitialValues,
      validate,
      onSubmit: async (values, helpers) => {
        await onSubmit?.(values, helpers);
      },
    });

    useEffect(() => {
      if (!submitOnMount) return;
      formik.submitForm();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submitOnMount]);

    return (
      <ProfileForm
        className={className}
        disabled={disabled}
        formManager={formik}
        formElement={formElement}
        autoFocusElement={autoFocusElement}
      />
    );
  }
);

ProfileFormFormik.displayName = 'ProfileFormFormik';


