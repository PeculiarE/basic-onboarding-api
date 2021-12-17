import { Router } from 'express';

import { ValidationMiddleware, AuthMiddleware } from '../../../middlewares';
import { UserController } from '../../../controllers';
import { onboardingSchema } from '../../../validations';

const router = Router();
const { validateRequestInput } = ValidationMiddleware;
const { authenticate } = AuthMiddleware;
const { onboardUser } = UserController;

router.post(
  '/',
  authenticate,
  validateRequestInput(onboardingSchema),
  onboardUser

);

export default router;
