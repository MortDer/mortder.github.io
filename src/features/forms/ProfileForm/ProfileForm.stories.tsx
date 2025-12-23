import React, { useEffect, useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useFormik } from 'formik';
import { ProfileForm } from './ProfileForm';
import { ProfileFormValues } from './types';

const meta: Meta<typeof ProfileForm> = {
  title: 'Features/Forms/ProfileForm',
  component: ProfileForm,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Блокировка формы',
    },
    className: {
      control: 'text',
      description: 'Дополнительный className для корня формы',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

type FormWrapperProps = {
  disabled?: boolean;
  className?: string;
  submitOnMount?: boolean;
  initialValues?: ProfileFormValues;
};

const FormWrapper: React.FC<FormWrapperProps> = ({ disabled, className, submitOnMount, initialValues }) => {
  const validate = useMemo(
    () => (values: ProfileFormValues) => {
      const errors: Partial<Record<keyof ProfileFormValues, string>> = {};

      if (!values.name?.trim()) {
        errors.name = 'Обязательное поле';
      }

      if (!values.about?.trim()) {
        errors.about = 'Обязательное поле';
      }

      return errors;
    },
    []
  );

  const formik = useFormik<ProfileFormValues>({
    initialValues: initialValues ?? { name: '', about: '' },
    initialTouched: submitOnMount ? { name: true, about: true } : undefined,
    validate,
    onSubmit: () => undefined,
  });

  useEffect(() => {
    if (!submitOnMount) return;
    formik.submitForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitOnMount]);

  return <ProfileForm className={className} disabled={disabled} formManager={formik} />;
};

export const Default: Story = {
  render: (args) => (
    <FormWrapper
      disabled={args.disabled}
      className={args.className}
      initialValues={{ name: 'mortder', about: 'Люблю React и TypeScript' }}
    />
  ),
};

export const EmptyWithErrors: Story = {
  render: (args) => <FormWrapper disabled={args.disabled} className={args.className} submitOnMount />,
};

export const Disabled: Story = {
  render: (args) => (
    <FormWrapper
      disabled
      className={args.className}
      initialValues={{ name: 'mortder', about: 'Форма в disabled состоянии' }}
    />
  ),
};


