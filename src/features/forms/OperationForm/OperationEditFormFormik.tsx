import React, { memo, useEffect, useMemo } from 'react';
import { FormikErrors, FormikHelpers, useFormik } from 'formik';
import { Operation } from 'src/utils/operation';
import { OperationEditForm } from './OperationEditForm';
import { OperationFormMode, OperationFormValues } from './types';

export type OperationFormFormikProps = {
  className?: string;
  disabled?: boolean;
  mode: OperationFormMode;
  initialOperation?: Partial<Operation>;
  /** Если true — сразу пытаемся сабмитнуть, чтобы показать ошибки */
  submitOnMount?: boolean;
  onSubmit?: (values: OperationFormValues, helpers: FormikHelpers<OperationFormValues>) => void | Promise<void>;
};

const formatDateYYYYMMDD = (dateString?: string): string => {
  if (!dateString) return '';
  // If already looks like YYYY-MM-DD, keep it
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return '';
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const normalizeValues = (op?: Partial<Operation>): OperationFormValues => ({
  name: op?.name ?? '',
  desc: op?.desc ?? '',
  createdAt: formatDateYYYYMMDD(op?.createdAt),
  amount: typeof op?.amount === 'number' ? String(op.amount) : '',
  categoryName: op?.category?.name ?? '',
  type: op?.type ?? 'Cost',
});

const isValidDateYYYYMMDD = (value: string): boolean => /^\d{4}-\d{2}-\d{2}$/.test(value);

export const OperationEditFormFormik = memo<OperationFormFormikProps>(
  ({ className, disabled, mode, initialOperation, submitOnMount, onSubmit }) => {
    const initialValues = useMemo(() => normalizeValues(initialOperation), [initialOperation]);

    const validate = (values: OperationFormValues): FormikErrors<OperationFormValues> => {
      const errors: FormikErrors<OperationFormValues> = {};

      if (!values.name.trim()) errors.name = 'errors.is_required';
      if (!values.categoryName.trim()) errors.categoryName = 'errors.is_required';

      if (!values.createdAt.trim()) errors.createdAt = 'errors.is_required';
      else if (!isValidDateYYYYMMDD(values.createdAt.trim())) errors.createdAt = 'Некорректная дата';

      if (!values.amount.trim()) errors.amount = 'errors.is_required';
      else if (Number.isNaN(Number(values.amount)) || Number(values.amount) < 0) errors.amount = 'Некорректная сумма';

      if (!values.type) errors.type = 'errors.is_required';

      return errors;
    };

    const formik = useFormik<OperationFormValues>({
      initialValues,
      enableReinitialize: true,
      validate,
      onSubmit: async (values, helpers) => {
        // eslint-disable-next-line no-console
        console.log(mode, values);
        await onSubmit?.(values, helpers);
      },
    });

    useEffect(() => {
      if (!submitOnMount) return;
      formik.submitForm();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submitOnMount]);

    return <OperationEditForm className={className} disabled={disabled} mode={mode} formManager={formik} />;
  }
);

OperationEditFormFormik.displayName = 'OperationEditFormFormik';
