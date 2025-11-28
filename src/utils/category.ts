import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

export type Category = {
  id: string;
  name: string;
  photo?: string;
};

export const createRandomCategory = (): Category => {
  return {
    id: uuidv4(),
    name: faker.commerce.department(),
  };
};
