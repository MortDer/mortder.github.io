import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AuthFormFormik } from './AuthFormFormik';
import { AuthMode } from './types';

const meta: Meta<typeof AuthFormFormik> = {
  title: 'Features/Forms/AuthForm',
  component: AuthFormFormik,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    className: {
      table: { disable: true },
    },
    onSubmit: {
      table: { disable: true },
    },
    disabled: {
      control: 'boolean',
    },
    mode: {
      control: 'radio',
      options: [AuthMode.signIn, AuthMode.signUp],
    },
    initialValues: {
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SignIn: Story = {
  args: {
    mode: AuthMode.signIn,
    initialValues: { email: 'test@example.com', password: 'password123' },
  },
};

export const SignInEmptyWithErrors: Story = {
  args: {
    mode: AuthMode.signIn,
    submitOnMount: true,
  },
};

export const SignUp: Story = {
  args: {
    mode: AuthMode.signUp,
    initialValues: { email: 'new@example.com', password: 'password123', repeatPassword: 'password123' },
  },
};

export const SignUpMismatchPassword: Story = {
  args: {
    mode: AuthMode.signUp,
    initialValues: { email: 'new@example.com', password: 'password123', repeatPassword: 'password124' },
    submitOnMount: true,
  },
};


