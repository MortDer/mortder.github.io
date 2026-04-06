import React from 'react';
import styles from './AddToCart.module.css';

interface AddToCartProps {
  count: number;
  onAdd?: () => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
}

export const AddToCart: React.FC<AddToCartProps> = ({ count, onAdd, onIncrease, onDecrease }) => {
  if (count === 0) {
    return (
      <button className={styles.addButton} type="button" onClick={onAdd}>
        В корзину
      </button>
    );
  }

  return (
    <div className={styles.counter}>
      <button className={styles.decreaseButton} type="button" onClick={onDecrease}>
        −
      </button>
      <span className={styles.count}>{count}</span>
      <button className={styles.increaseButton} type="button" onClick={onIncrease}>
        +
      </button>
    </div>
  );
};
