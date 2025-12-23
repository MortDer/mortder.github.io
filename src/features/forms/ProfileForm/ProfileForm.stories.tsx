import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileFormFormik } from './ProfileFormFormik';

const meta: Meta<typeof ProfileFormFormik> = {
  title: 'Features/Forms/ProfileForm',
  component: ProfileFormFormik,
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

export const Default: Story = {
  render: (args) => (
    <ProfileFormFormik
      disabled={args.disabled}
      className={args.className}
      initialValues={{ name: 'mortder', about: 'Люблю React и TypeScript' }}
    />
  ),
};

export const EmptyWithErrors: Story = {
  render: (args) => <ProfileFormFormik disabled={args.disabled} className={args.className} submitOnMount />,
};

export const Disabled: Story = {
  render: (args) => (
    <ProfileFormFormik
      disabled
      className={args.className}
      initialValues={{ name: 'mortder', about: 'Форма в disabled состоянии' }}
    />
  ),
};
