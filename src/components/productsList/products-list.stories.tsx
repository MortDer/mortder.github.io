import React, { useEffect, useRef, useState } from 'react';
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

const generateProducts = (count: number, createdAt: string = '2025-11-20') =>
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
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loaderRef.current || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setProducts((prev) => [...prev, ...generateProducts(6)]);
          }
        });
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0.1,
      },
    );

    observer.observe(loaderRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      <ProductsList products={products} />
      <div ref={loaderRef} style={{ height: 1 }} />
    </div>
  );
};

export const InfiniteScroll: Story = {
  render: () => <DynamicProductsList />,
};
