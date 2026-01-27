import React, { memo } from 'react';
import cn from 'clsx';
import { Button, Input, InputNumber, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { FormItem } from 'src/shared/ui/FormItem';
import { getValidates } from 'src/utils/validation';
import { OperationFormMode, OperationFormProps } from './types';
import s from './OperationEditForm.module.sass';

const translateError = (t: (key: string) => string, error: string): string =>
  error?.startsWith('errors.') || error?.startsWith('ERR_') ? t(error) : error;

export const OperationEditForm = memo<OperationFormProps>(({ className, disabled, formManager, mode }) => {
  const { t } = useTranslation();
  const { values, touched, errors, submitCount, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue } =
    formManager;

  const nameError = typeof errors.name === 'string' ? translateError(t, errors.name) : '';
  const descError = typeof errors.desc === 'string' ? translateError(t, errors.desc) : '';
  const dateError = typeof errors.createdAt === 'string' ? translateError(t, errors.createdAt) : '';
  const amountError = typeof errors.amount === 'string' ? translateError(t, errors.amount) : '';
  const categoryError = typeof errors.categoryName === 'string' ? translateError(t, errors.categoryName) : '';
  const typeError = typeof errors.type === 'string' ? translateError(t, errors.type) : '';

  const nameValidates = getValidates(nameError, touched.name, submitCount);
  const descValidates = getValidates(descError, touched.desc, submitCount);
  const dateValidates = getValidates(dateError, touched.createdAt, submitCount);
  const amountValidates = getValidates(amountError, touched.amount, submitCount);
  const categoryValidates = getValidates(categoryError, touched.categoryName, submitCount);
  const typeValidates = getValidates(typeError, touched.type, submitCount);

  const submitTitle = mode === OperationFormMode.edit ? 'Сохранить' : 'Добавить';

  return (
    <form onSubmit={handleSubmit} className={cn(s.root, className)}>
      <FormItem title="Название" required validateStatus={nameValidates.validateStatus} help={nameValidates.help}>
        <Input
          disabled={disabled}
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          placeholder="Например: Покупка продуктов"
        />
      </FormItem>

      <FormItem title="Описание" validateStatus={descValidates.validateStatus} help={descValidates.help}>
        <Input.TextArea
          disabled={disabled}
          name="desc"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.desc}
          placeholder="Необязательно"
          autoSize={{ minRows: 3, maxRows: 6 }}
        />
      </FormItem>

      <div className={s.row}>
        <FormItem title="Тип" required validateStatus={typeValidates.validateStatus} help={typeValidates.help}>
          <Select
            disabled={disabled}
            value={values.type}
            onBlur={() => formManager.setFieldTouched('type', true)}
            onChange={(v) => setFieldValue('type', v)}
            options={[
              { label: 'Расход', value: 'Cost' },
              { label: 'Доход', value: 'Profit' },
            ]}
          />
        </FormItem>

        <FormItem title="Сумма" required validateStatus={amountValidates.validateStatus} help={amountValidates.help}>
          <InputNumber
            disabled={disabled}
            value={values.amount ? Number(values.amount) : null}
            min={0}
            precision={2}
            style={{ width: '100%' }}
            onBlur={() => formManager.setFieldTouched('amount', true)}
            onChange={(v) => setFieldValue('amount', v === null ? '' : String(v))}
            placeholder="0.00"
          />
        </FormItem>
      </div>

      <div className={s.row}>
        <FormItem
          title="Категория"
          required
          validateStatus={categoryValidates.validateStatus}
          help={categoryValidates.help}
        >
          <Input
            disabled={disabled}
            name="categoryName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.categoryName}
            placeholder="Например: Продукты"
          />
        </FormItem>

        <FormItem title="Дата" required validateStatus={dateValidates.validateStatus} help={dateValidates.help}>
          <Input
            disabled={disabled}
            name="createdAt"
            type="date"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.createdAt}
          />
        </FormItem>
      </div>

      <div className={s.actions}>
        <Button type="primary" htmlType="submit" disabled={disabled} loading={isSubmitting}>
          {submitTitle}
        </Button>
      </div>
    </form>
  );
});

OperationEditForm.displayName = 'OperationEditForm';
