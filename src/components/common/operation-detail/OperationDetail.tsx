import React from 'react';
import { Operation } from 'src/utils/operation';
import styles from './OperationDetail.module.css';

export type OperationDetailProps = Operation & {
  onEdit?: () => void;
};

export const OperationDetail: React.FC<OperationDetailProps> = ({ name, desc, amount, category, type, createdAt, onEdit }) => {
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
        <button className={styles.editButton} type="button" onClick={onEdit}>
          Редактировать
        </button>
      </div>
    </div>
  );
};
