import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './header';

const meta: Meta<typeof Header> = {
  title: 'Common/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    menuItems: {
      control: 'object',
      description: 'Массив элементов меню',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    menuItems: [
      { title: 'Главная', navTo: '#' },
      { title: 'О нас', navTo: '#' },
      { title: 'Контакты', navTo: '#' },
    ],
  },
};
