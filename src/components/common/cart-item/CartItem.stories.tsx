import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CartItem } from './CartItem';
import { createRandomProduct } from 'src/utils/product';

const meta: Meta<typeof CartItem> = {
  title: 'Common/CartItem',
  component: CartItem,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Название товара',
    },
    photo: {
      control: 'text',
      description: 'URL изображения товара',
    },
    onRemove: {
      action: 'removed',
      description: 'Обработчик удаления товара',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Базовый пример
export const Default: Story = {
  args: {
    id: '1',
    name: 'iPhone 15 Pro',
    photo: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop',
    createdAt: '2024-01-15',
    price: 99999,
    category: {
      id: '1',
      name: 'Электроника',
    },
  },
};

// Товар с длинным названием
export const LongName: Story = {
  args: {
    id: '2',
    name: 'Игровая консоль PlayStation 5 с дополнительным контроллером DualSense',
    photo: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=100&h=100&fit=crop',
    createdAt: '2024-01-15',
    price: 59999,
    category: {
      id: '2',
      name: 'Игры',
    },
  },
};

// Случайный товар
export const RandomProduct: Story = {
  args: createRandomProduct('2024-01-15'),
};
