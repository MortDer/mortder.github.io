import React from 'react';
import { Product } from 'src/utils/product';
import { AddToCart } from '../button/add-to-cart/AddToCart';
import { PriceBlock } from '../price-block/PriceBlock';
import styles from './ProductCardCompact.module.css';

const ProductCardCompactComponent: React.FC<Product> = ({ name, desc, price, oldPrice, photo }) => {
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
            <PriceBlock price={price} oldPrice={oldPrice} />
          </div>
          <AddToCart count={0} />
        </div>
      </div>
    </div>
  );
};

export const ProductCardCompact = React.memo(ProductCardCompactComponent);
