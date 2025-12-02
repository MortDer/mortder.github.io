import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProductsList } from './ProductsList';
import { createRandomProduct } from 'src/utils/product';

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

const generateProducts = (count: number, createdAt = '2025-11-20') =>
  Array.from({ length: count }, () => createRandomProduct(createdAt));

export const Default: Story = {
  args: {
    products: generateProducts(12),
  },
};

export const FewProducts: Story = {
  args: {
    products: generateProducts(3),
  },
};

const DynamicProductsList: React.FC = () => {
  const [products, setProducts] = useState(() => generateProducts(12));

  return (
    <ProductsList products={products} onEndReached={() => setProducts((prev) => [...prev, ...generateProducts(6)])} />
  );
};

export const InfiniteScroll: Story = {
  render: () => <DynamicProductsList />,
};
