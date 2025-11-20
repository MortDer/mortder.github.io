import React from 'react';
import { Product } from '../../homeworks/ts1/3_write';
import { ProductCard } from '../common/product-card/product-card';
import styles from './products-list.module.css';

export type ProductsListProps = {
  products: Product[];
};

export const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  return (
    <div className={styles.list}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};


