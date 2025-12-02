import React from 'react';
import { Product } from 'src/utils/product';
import styles from './CartItem.module.css';

type CartItemProps = Pick<Product, 'name' | 'photo'> & {
  onRemove?: () => void;
};

export const CartItem: React.FC<CartItemProps> = ({ name, photo, onRemove }) => {
  return (
    <div className={styles.item}>
      <div className={styles.imageContainer}>
        <img src={photo} alt={name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
      </div>
      <button className={styles.removeButton} onClick={onRemove}>
        Удалить
      </button>
    </div>
  );
};
