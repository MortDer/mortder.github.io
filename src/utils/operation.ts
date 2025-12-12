import { Category, createRandomCategory } from 'src/utils/category';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

export type Operation = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
  type: 'Cost' | 'Profit';
};

export const createRandomOperation = (createdAt: string): Operation => {
  return {
    id: uuidv4(),
    name: faker.commerce.productName(),
    desc: faker.commerce.productDescription(),
    createdAt,
    amount: Math.random() * 1000,
    category: createRandomCategory(),
    type: Math.random() > 0.5 ? 'Cost' : 'Profit',
  };
};
