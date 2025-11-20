import type { Meta, StoryObj } from '@storybook/react';
import { ProductsList } from './products-list';
import { createRandomProduct } from '../../homeworks/ts1/3_write';

const meta: Meta<typeof ProductsList> = {
  title: 'Products/ProductsList',
  component: ProductsList,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    products: {
      control: false,
      description: 'Массив продуктов для отображения',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductsList>;

const generateProducts = (count: number, createdAt: string = '2024-01-15') =>
  Array.from({ length: count }, () => createRandomProduct(createdAt));

export const Default: Story = {
  args: {
    products: generateProducts(8),
  },
};

export const FewProducts: Story = {
  args: {
    products: generateProducts(3),
  },
};


