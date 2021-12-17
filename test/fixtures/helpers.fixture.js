import faker from 'faker';
import Joi from 'joi';
import { helpers } from '../../app/utils';

const {
  stringCheck,
  passwordCheck,
  emailCheck,
  numberCheck,
} = helpers.ValidationHelper;
export const originText = 'hir35676';
export const wrongText = '894jdkf';
export const payload = 'payload';

export const genericErrorObj = {
  status: 500,
  name: 'ApiError',
  message: 'Error while processing request. It\'s not you, it\'s us.'
};
export const genericNotFound = {
  status: 404,
  message: 'Oops! You have reached a dead end.'
};

export const genericInValidLogin = {
  status: 401,
  message: 'Incorrect login details'
};
export const genericAuthRequired = {
  status: 401,
  message: 'Access denied. A valid access token is required'
};

export const testSchema = Joi.object({
  email: emailCheck(),
  password: passwordCheck(),
  name: stringCheck('name'),
  number: numberCheck('number', 1, 100),
});

export const testObj = {
  email: faker.internet.email(),
  password: faker.internet.email(),
  name: faker.internet.userName(),
  number: faker.datatype.number({ min: 1, max: 100 })
};
