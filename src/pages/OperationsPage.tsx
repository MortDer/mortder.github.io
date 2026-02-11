import React, { useMemo, useState } from 'react';
import { Modal } from 'src/components/common/modal/Modal';
import { OperationsList } from 'src/components/operationsList/OperationsList';
import { OperationEditFormFormik } from 'src/features/forms/OperationForm/OperationEditFormFormik';
import { OperationFormMode, OperationFormValues } from 'src/features/forms/OperationForm/types';
import { Operation, createRandomOperation } from 'src/utils/operation';
import { v4 as uuidv4 } from 'uuid';
import styles from './Pages.module.css';

export const OperationsPage: React.FC = () => {
  const initialOperations = useMemo(
    () => Array.from({ length: 6 }, () => createRandomOperation(new Date().toISOString())),
    []
  );
  const [operations, setOperations] = useState<Operation[]>(initialOperations);
  const [editingOperation, setEditingOperation] = useState<Operation | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => setIsModalVisible(false);

  const openCreateModal = () => {
    setEditingOperation(null);
    setIsModalVisible(true);
  };

  const openEditModal = (operation: Operation) => {
    setEditingOperation(operation);
    setIsModalVisible(true);
  };

  const onSubmit = async (values: OperationFormValues) => {
    const nextOperation: Operation = {
      id: editingOperation?.id ?? uuidv4(),
      name: values.name.trim(),
      desc: values.desc.trim() || undefined,
      createdAt: values.createdAt,
      amount: Number(values.amount),
      type: values.type,
      category: {
        id: editingOperation?.category.id ?? uuidv4(),
        name: values.categoryName.trim(),
      },
    };

    setOperations((prev) => {
      if (!editingOperation) {
        return [nextOperation, ...prev];
      }
      return prev.map((operation) => (operation.id === editingOperation.id ? nextOperation : operation));
    });
    closeModal();
  };

  const mode = editingOperation ? OperationFormMode.edit : OperationFormMode.create;

  return (
    <section className={styles.page}>
      <div className={styles.topBar}>
        <h1 className={styles.title}>Операции</h1>
        <button type="button" className={styles.primaryButton} onClick={openCreateModal}>
          Добавить операцию
        </button>
      </div>
      <p className={styles.subtitle}>Список операций и модальное окно для создания и редактирования.</p>

      <OperationsList operations={operations} onEditOperation={openEditModal} />

      <Modal visible={isModalVisible} onClose={closeModal}>
        <h3 className={styles.modalTitle}>
          {editingOperation ? 'Редактирование операции' : 'Создание операции'}
        </h3>
        <OperationEditFormFormik mode={mode} initialOperation={editingOperation ?? undefined} onSubmit={onSubmit} />
      </Modal>
    </section>
  );
};
