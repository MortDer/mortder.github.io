import type { Meta, StoryObj } from '@storybook/react';
import { ProductCardCompact } from './product-card-compact';
import { createRandomProduct } from '../../../homeworks/ts1/3_write';

const meta: Meta<typeof ProductCardCompact> = {
  title: 'Common/ProductCardCompact',
  component: ProductCardCompact,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Название товара',
    },
    desc: {
      control: 'text',
      description: 'Описание товара',
    },
    price: {
      control: 'number',
      description: 'Цена товара',
    },
    oldPrice: {
      control: 'number',
      description: 'Старая цена товара (необязательно)',
    },
    photo: {
      control: 'text',
      description: 'URL изображения товара',
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
    desc: 'Новейший смартфон с передовыми технологиями',
    price: 99999,
    oldPrice: 119999,
    photo: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=150&fit=crop',
    createdAt: '2024-01-15',
    category: {
      id: '1',
      name: 'Электроника',
    },
  },
};

// Товар без старой цены
export const WithoutOldPrice: Story = {
  args: {
    id: '2',
    name: 'AirPods Pro',
    desc: 'Беспроводные наушники с шумоподавлением',
    price: 24999,
    photo: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=200&h=150&fit=crop',
    createdAt: '2024-01-15',
    category: {
      id: '2',
      name: 'Аксессуары',
    },
  },
};

// Товар без описания
export const WithoutDescription: Story = {
  args: {
    id: '3',
    name: 'MacBook Air M2',
    price: 129999,
    oldPrice: 149999,
    photo: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200&h=150&fit=crop',
    createdAt: '2024-01-15',
    category: {
      id: '3',
      name: 'Компьютеры',
    },
  },
};

// Длинное название и описание
export const LongText: Story = {
  args: {
    id: '4',
    name: 'Игровая консоль PlayStation 5 с дополнительным контроллером',
    desc: 'Новейшая игровая консоль от Sony с поддержкой 4K и ray tracing',
    price: 59999,
    oldPrice: 69999,
    photo: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=200&h=150&fit=crop',
    createdAt: '2024-01-15',
    category: {
      id: '4',
      name: 'Игры',
    },
  },
};

// Случайный товар
export const RandomProduct: Story = {
  args: createRandomProduct('2024-01-15'),
};
