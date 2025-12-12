import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { OperationDetail } from './OperationDetail';
import { createRandomOperation } from 'src/utils/operation';

const meta: Meta<typeof OperationDetail> = {
  title: 'Common/OperationDetail',
  component: OperationDetail,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'Уникальный идентификатор операции',
    },
    name: {
      control: 'text',
      description: 'Название операции',
    },
    desc: {
      control: 'text',
      description: 'Описание операции',
    },
    createdAt: {
      control: 'text',
      description: 'Дата создания',
    },
    amount: {
      control: 'number',
      description: 'Сумма операции',
    },
    category: {
      control: 'object',
      description: 'Категория операции',
    },
    type: {
      control: 'select',
      options: ['Cost', 'Profit'],
      description: 'Тип операции',
    },
  },
};

export default meta;
type Story = StoryObj<typeof OperationDetail>;

export const Default: Story = {
  args: {
    id: '1',
    name: 'Покупка продуктов',
    desc: 'Еженедельная покупка продуктов в супермаркете. Купил хлеб, молоко, мясо, овощи и фрукты для семьи на неделю.',
    createdAt: '2024-01-15',
    amount: 2500,
    category: {
      id: '1',
      name: 'Продукты',
    },
    type: 'Cost',
  },
};

export const Profit: Story = {
  args: {
    id: '2',
    name: 'Зарплата',
    desc: 'Ежемесячная заработная плата за январь 2024 года. Включает основную зарплату и премию за выполнение плана.',
    createdAt: '2024-01-31',
    amount: 50000,
    category: {
      id: '2',
      name: 'Доходы',
    },
    type: 'Profit',
  },
};

export const WithoutDescription: Story = {
  args: {
    id: '3',
    name: 'Кофе',
    createdAt: '2024-01-15',
    amount: 150,
    category: {
      id: '3',
      name: 'Кафе',
    },
    type: 'Cost',
  },
};

export const LongDescription: Story = {
  args: {
    id: '4',
    name: 'Ремонт квартиры',
    desc: 'Полный ремонт квартиры включая замену полов, покраску стен, установку новой сантехники и электрики. Работы выполнялись профессиональной бригадой в течение двух недель. Заменены все розетки, выключатели, установлены новые светильники.',
    createdAt: '2024-01-10',
    amount: 150000,
    category: {
      id: '4',
      name: 'Ремонт',
    },
    type: 'Cost',
  },
};

export const RandomOperation: Story = {
  render: () => {
    const operation = createRandomOperation('2024-01-15');
    return <OperationDetail {...operation} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Случайно сгенерированная операция с помощью createRandomOperation.',
      },
    },
  },
};
