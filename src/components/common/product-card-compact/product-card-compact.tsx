import React from 'react';
import { Product } from '../../../homeworks/ts1/3_write';
import { AddToCart } from '../button/add-to-cart/add-to-cart';
import styles from './product-card-compact.module.css';

export const ProductCardCompact: React.FC<Product> = ({ name, desc, price, oldPrice, photo }) => {
  const truncateDescription = (text: string, maxLength = 40) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={photo} alt={name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        {desc && <p className={styles.description}>{truncateDescription(desc)}</p>}
        <div className={styles.footer}>
          <div className={styles.priceContainer}>
            {oldPrice && <span className={styles.oldPrice}>{oldPrice.toFixed(2)} ₽</span>}
            <span className={styles.price}>{price.toFixed(2)} ₽</span>
          </div>
          <AddToCart count={0} />
        </div>
      </div>
    </div>
  );
};
