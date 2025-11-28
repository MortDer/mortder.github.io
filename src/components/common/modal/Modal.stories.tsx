import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Common/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    visible: {
      control: 'boolean',
      description: 'Видимость модального окна',
    },
    children: {
      control: 'text',
      description: 'Содержимое модального окна',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    visible: true,
    children: 'Это содержимое модального окна',
  },
};

export const WithLongContent: Story = {
  args: {
    visible: true,
    children: (
      <div>
        <h2>Заголовок модального окна</h2>
        <p>
          Это пример длинного содержимого модального окна. Здесь может быть любой контент: текст, изображения, формы и
          другие компоненты.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
        <button>Кнопка в модальном окне</button>
      </div>
    ),
  },
};
