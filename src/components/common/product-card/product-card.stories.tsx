import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './product-card';
import { createRandomProduct } from '../../../homeworks/ts1/3_write';

const meta: Meta<typeof ProductCard> = {
  title: 'Common/ProductCard',
  component: ProductCard,
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
    category: {
      control: 'object',
      description: 'Категория товара',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Базовый пример
export const Default: Story = {
  args: {
    id: '1',
    name: 'Смартфон iPhone 15 Pro',
    desc: 'Новейший смартфон с передовыми технологиями, титановым корпусом и мощным процессором A17 Pro',
    price: 99999,
    oldPrice: 119999,
    photo: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
    createdAt: '2024-01-15',
    category: {
      id: '1',
      name: 'Электроника',
      photo: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=100&h=100&fit=crop',
    },
  },
};

// Товар без старой цены
export const WithoutOldPrice: Story = {
  args: {
    id: '2',
    name: 'Беспроводные наушники AirPods Pro',
    desc: 'Высококачественные беспроводные наушники с активным шумоподавлением',
    price: 24999,
    photo: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=300&fit=crop',
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
    name: 'Ноутбук MacBook Air M2',
    price: 129999,
    oldPrice: 149999,
    photo: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop',
    createdAt: '2024-01-15',
    category: {
      id: '3',
      name: 'Компьютеры',
    },
  },
};

// Длинное описание
export const LongDescription: Story = {
  args: {
    id: '4',
    name: 'Игровая консоль PlayStation 5',
    desc: 'Новейшая игровая консоль от Sony с поддержкой 4K, ray tracing, SSD-накопителем и DualSense контроллером. Идеально подходит для геймеров всех уровней',
    price: 59999,
    oldPrice: 69999,
    photo: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop',
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
