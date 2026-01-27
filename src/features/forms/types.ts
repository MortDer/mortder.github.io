import { InputRef } from 'antd';
import { FormikContextType } from 'formik';
import { MutableRefObject } from 'react';

export interface FormProps<Values = unknown> {
  className?: string;
  disabled?: boolean;
  formManager: FormikContextType<Values>;
  formElement?: MutableRefObject<HTMLFormElement | null>;
  autoFocusElement?: MutableRefObject<InputRef | null>;
}
