import React, { memo } from 'react';
import cn from 'clsx';
import Input from 'antd/lib/input';
import { FormikHandlers } from 'formik/dist/types';
import { useTranslation } from 'react-i18next';
import { FormItem } from 'src/shared/ui/FormItem';
import { getValidates } from 'src/utils/validation';
import { ProfileFormProps } from '../types';
import s from './AboutField.module.sass';

export type AboutFieldProps = Pick<ProfileFormProps, 'className' | 'disabled'> & {
  submitCount: number;
  touched: boolean;
  errors: string;
  value: string;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
};

export const AboutField = memo<AboutFieldProps>(
  ({ className, onChange, onBlur, touched, value, errors, disabled, submitCount }) => {
    const { t } = useTranslation();

    const translatedError = errors?.startsWith('errors.') || errors?.startsWith('ERR_')
      ? t(errors)
      : errors;

    const { validateStatus, help } = getValidates(translatedError, touched, submitCount);

    return (
      <FormItem
        className={cn(s.root, className)}
        title={t(`forms.ProfileForm.about.title`)}
        validateStatus={validateStatus}
        help={help}
      >
        <Input.TextArea
          disabled={disabled}
          name="about"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={t(`forms.ProfileForm.about.placeholder`)}
        />
      </FormItem>
    );
  }
);

AboutField.displayName = 'AboutField';
