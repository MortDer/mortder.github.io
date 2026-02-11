import React from 'react';
import { Operation } from 'src/utils/operation';
import { OperationCard } from '../common/operation-card/OperationCard';
import styles from './OperationsList.module.css';

type OperationsListProps = {
  operations: Operation[];
  onEditOperation?: (operation: Operation) => void;
};

export const OperationsList: React.FC<OperationsListProps> = ({ operations, onEditOperation }) => {
  return (
    <div className={styles.list}>
      {operations.map((operation) => (
        <div key={operation.id} className={styles.item}>
          <OperationCard {...operation} />
          {onEditOperation && (
            <button type="button" className={styles.editButton} onClick={() => onEditOperation(operation)}>
              Редактировать
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
