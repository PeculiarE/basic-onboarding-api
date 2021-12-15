import faker from 'faker';

export const invalidUserObj = {
  firstName: faker.random.alpha({ count: 3 }),
  lastName: faker.random.alpha({ count: 3 }),
  password: faker.internet.password(7),
};

export const validUserObj = {
  firstName: faker.random.alpha({ count: 3 }),
  lastName: faker.random.alpha({ count: 3 }),
  email: faker.internet.email(),
  password: faker.internet.password(7),
};

export const duplicateUserObj = {
  firstName: faker.random.alpha({ count: 3 }),
  lastName: faker.random.alpha({ count: 3 }),
  email: validUserObj.email,
  password: faker.internet.password(7)
};

export const invalidLoginObj = {
  email: faker.internet.email(),
  password: validUserObj.password,
};

export const validLoginObj = {
  email: validUserObj.email,
  password: validUserObj.password,
};
