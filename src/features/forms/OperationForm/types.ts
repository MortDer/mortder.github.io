import { FormProps } from 'src/features/forms/types';
import { Operation } from 'src/utils/operation';

export enum OperationFormMode {
  create = 'create',
  edit = 'edit',
}

export type OperationFormValues = {
  name: string;
  desc: string;
  createdAt: string; // YYYY-MM-DD
  amount: string; // keep as string to avoid InputNumber edge-cases
  categoryName: string;
  type: Operation['type'];
};

export type OperationFormProps = FormProps<OperationFormValues> & {
  mode: OperationFormMode;
};


