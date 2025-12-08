import React from 'react';
import styles from './PriceBlock.module.css';

export interface PriceBlockProps {
  price: number;
  oldPrice?: number;
}

const PriceBlockComponent: React.FC<PriceBlockProps> = ({ price, oldPrice }) => {
  return (
    <div className={styles.priceContainer}>
      {oldPrice != null && <span className={styles.oldPrice}>{oldPrice.toFixed(2)} ₽</span>}
      <span className={styles.price}>{price.toFixed(2)} ₽</span>
    </div>
  );
};

export const PriceBlock = React.memo(PriceBlockComponent);
