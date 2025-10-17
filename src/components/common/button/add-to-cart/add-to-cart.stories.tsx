import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AddToCart } from './add-to-cart';

const meta: Meta<typeof AddToCart> = {
  title: 'Common/AddToCart',
  component: AddToCart,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    count: {
      control: 'number',
      description: 'Количество товара в корзине',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddToCart>;

export const Default: Story = {
  args: {
    count: 0,
  },
};

export const InCart: Story = {
  args: {
    count: 1,
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ minWidth: '100px', fontSize: '14px' }}>Не в корзине:</span>
        <AddToCart count={0} />
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ minWidth: '100px', fontSize: '14px' }}>1 товар:</span>
        <AddToCart count={1} />
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ minWidth: '100px', fontSize: '14px' }}>5 товаров:</span>
        <AddToCart count={5} />
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ minWidth: '100px', fontSize: '14px' }}>Много товаров:</span>
        <AddToCart count={99} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация всех состояний компонента AddToCart.',
      },
    },
  },
};
