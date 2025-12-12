import { Category, createRandomCategory } from 'src/utils/category';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

export type Product = {
  id: string;
  name: string;
  photo: string;
  desc?: string;
  createdAt: string;
  oldPrice?: number;
  price: number;
  category: Category;
};

export const createRandomProduct = (createdAt: string): Product => {
  return {
    id: uuidv4(),
    name: faker.commerce.productName(),
    photo: faker.image.url(),
    desc: faker.commerce.productDescription(),
    createdAt,
    oldPrice: parseFloat(faker.commerce.price()),
    price: parseFloat(faker.commerce.price()),
    category: createRandomCategory(),
  };
};
