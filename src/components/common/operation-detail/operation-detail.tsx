import React from 'react';
import { Operation } from '../../../homeworks/ts1/3_write';
import styles from './operation-detail.module.css';

export const OperationDetail: React.FC<Operation> = ({ name, desc, amount, category, type, createdAt }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={styles.detail}>
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
        <h2 className={styles.name}>{name}</h2>
        {desc && <p className={styles.description}>{desc}</p>}
        <div className={styles.date}>
          <span className={styles.dateLabel}>Дата:</span>
          <span className={styles.dateValue}>{formatDate(createdAt)}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.editButton} type="button">
          Редактировать
        </button>
      </div>
    </div>
  );
};
