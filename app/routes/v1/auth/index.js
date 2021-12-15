import { Router } from 'express';

import { ValidationMiddleware, AuthMiddleware } from '../../../middlewares';
import { createUserSchema, loginSchema } from '../../../validations';
import { AuthController } from '../../../controllers';

const router = Router();
const { validateRequestInput } = ValidationMiddleware;
const { loginEmailValidator, comparePassword } = AuthMiddleware;
const { createUser, loginUser } = AuthController;

router.post(
  '/signup',
  validateRequestInput(createUserSchema),
  createUser

);

router.post(
  '/login',
  validateRequestInput(loginSchema),
  loginEmailValidator,
  comparePassword,
  loginUser
);

export default router;
