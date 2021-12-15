import Joi from 'joi';
import { helpers } from '../../utils';

const { ValidationHelper:
  { stringCheck, emailCheck, passwordCheck }
} = helpers;

export const createUserSchema = Joi.object({
  firstName: stringCheck('First name', 2),
  lastName: stringCheck('Last name', 2),
  email: emailCheck(),
  password: passwordCheck()
});

export const loginSchema = Joi.object({
  email: emailCheck(),
  password: passwordCheck()
});
