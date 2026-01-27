import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { createRandomOperation } from 'src/utils/operation';
import { OperationEditFormFormik } from './OperationEditFormFormik';
import { OperationFormMode } from './types';

const meta: Meta<typeof OperationEditFormFormik> = {
  title: 'Features/Forms/OperationEditForm',
  component: OperationEditFormFormik,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    className: { table: { disable: true } },
    onSubmit: { table: { disable: true } },
    initialOperation: { table: { disable: true } },
    disabled: { control: 'boolean' },
    mode: {
      control: 'radio',
      options: [OperationFormMode.create, OperationFormMode.edit],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Create: Story = {
  args: {
    mode: OperationFormMode.create,
    initialOperation: {
      createdAt: '2024-01-15',
      type: 'Cost',
    },
  },
};

export const CreateEmptyWithErrors: Story = {
  args: {
    mode: OperationFormMode.create,
    submitOnMount: true,
  },
};

export const Edit: Story = {
  args: {
    mode: OperationFormMode.edit,
    initialOperation: createRandomOperation('2024-01-15'),
  },
};
