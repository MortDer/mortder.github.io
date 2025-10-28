/**
 * Функции написанные здесь пригодятся на последующих уроках
 * С помощью этих функций мы будем добавлять элементы в список для проверки динамической загрузки
 * Поэтому в идеале чтобы функции возвращали случайные данные, но в то же время не абракадабру.
 * В целом сделайте так, как вам будет удобно.
 * */

/**
 * Нужно создать тип Category, он будет использоваться ниже.
 * Категория содержит
 * - id (строка)
 * - name (строка)
 * - photo (строка, необязательно)
 *
 * Продукт (Product) содержит
 * - id (строка)
 * - name (строка)
 * - photo (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - oldPrice (число, необязательно)
 * - price (число)
 * - category (Категория)
 *
 * Операция (Operation) может быть либо тратой (Cost), либо доходом (Profit)
 *
 * Трата (Cost) содержит
 * - id (строка)
 * - name (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - amount (число)
 * - category (Категория)
 * - type ('Cost')
 *
 * Доход (Profit) содержит
 * - id (строка)
 * - name (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - amount (число)
 * - category (Категория)
 * - type ('Profit')
 * */

/**
 * Создает случайный продукт (Product).
 * Принимает дату создания (строка)
 * */
// export const createRandomProduct = (createdAt: string) => {};

/**
 * Создает случайную операцию (Operation).
 * Принимает дату создания (строка)
 * */
// export const createRandomOperation = (createdAt: string) => {};

import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

export type Category = {
  id: string;
  name: string;
  photo?: string;
};

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

export type Operation = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
  type: 'Cost' | 'Profit';
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

export const createRandomCategory = (): Category => {
  return {
    id: uuidv4(),
    name: faker.commerce.department(),
  };
};
