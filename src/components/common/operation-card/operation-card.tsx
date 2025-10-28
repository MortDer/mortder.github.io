import React from 'react';
import { Operation } from 'src/homeworks/ts1/3_write';
import styles from './operation-card.module.css';

export const OperationCard: React.FC<Operation> = ({ name, desc, amount, category, type }) => {
  const truncateDescription = (text: string, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.category}>
          <span className={styles.categoryName}>{category.name}</span>
        </div>
        <div className={`${styles.amount} ${styles[type.toLowerCase()]}`}>
          {type === 'Cost' ? '-' : '+'}
          {amount.toFixed(2)} ₽
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        {desc && <p className={styles.description}>{truncateDescription(desc)}</p>}
      </div>
    </div>
  );
};
