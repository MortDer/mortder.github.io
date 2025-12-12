import React from 'react';
import styles from './AddToCart.module.css';

interface AddToCartProps {
  count: number;
}

export const AddToCart: React.FC<AddToCartProps> = ({ count }) => {
  if (count === 0) {
    return (
      <button className={styles.addButton} type="button">
        В корзину
      </button>
    );
  }

  return (
    <div className={styles.counter}>
      <button className={styles.decreaseButton} type="button">
        −
      </button>
      <span className={styles.count}>{count}</span>
      <button className={styles.increaseButton} type="button">
        +
      </button>
    </div>
  );
};
