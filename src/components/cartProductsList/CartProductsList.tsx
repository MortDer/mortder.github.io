import React from 'react';
import { CartItem } from 'src/components/common/cart-item/CartItem';
import { Product } from 'src/utils/product';
import styles from './CartProductsList.module.css';

type CartProductsListProps = {
  products: Product[];
  onRemoveProduct?: (productId: string) => void;
};

export const CartProductsList: React.FC<CartProductsListProps> = ({ products, onRemoveProduct }) => {
  return (
    <div className={styles.list}>
      {products.map((product) => (
        <CartItem key={product.id} name={product.name} photo={product.photo} onRemove={() => onRemoveProduct?.(product.id)} />
      ))}
    </div>
  );
};
