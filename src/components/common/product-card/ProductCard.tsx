import React from 'react';
import { Product } from 'src/utils/product';
import { AddToCart } from '../button/add-to-cart/AddToCart';
import styles from './ProductCard.module.css';

export const ProductCard: React.FC<Product> = ({ name, desc, price, oldPrice, photo, category }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={photo} alt={name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.category}>
            <span className={styles.categoryName}>{category.name}</span>
          </div>
          <div className={styles.priceContainer}>
            {oldPrice && <span className={styles.oldPrice}>{oldPrice.toFixed(2)} ₽</span>}
            <span className={styles.price}>{price.toFixed(2)} ₽</span>
          </div>
        </div>
        <h3 className={styles.name}>{name}</h3>
        {desc && <p className={styles.description}>{desc}</p>}
        <AddToCart count={0} />
      </div>
    </div>
  );
};
