import React from 'react';
import { Product } from 'src/utils/product';
import { AddToCart } from '../button/add-to-cart/AddToCart';
import { PriceBlock } from '../price-block/PriceBlock';
import styles from './ProductCard.module.css';

const ProductCardComponent: React.FC<Product> = ({ name, desc, price, oldPrice, photo, category }) => {
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
            <PriceBlock price={price} oldPrice={oldPrice} />
          </div>
        </div>
        <h3 className={styles.name}>{name}</h3>
        {desc && <p className={styles.description}>{desc}</p>}
        <AddToCart count={0} />
      </div>
    </div>
  );
};

export const ProductCard = React.memo(ProductCardComponent);
