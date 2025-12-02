import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Common/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    menuItems: {
      control: 'array',
      description: 'Массив элементов меню',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    menuItems: [
      { id: 'main', title: 'Главная', navTo: '#' },
      { id: 'about', title: 'О нас', navTo: '#' },
      { id: 'contacts', title: 'Контакты', navTo: '#' },
    ],
  },
};
