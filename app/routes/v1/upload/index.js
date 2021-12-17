import { Router } from 'express';

import { ValidationMiddleware, UploadMiddleware,
  AuthMiddleware } from '../../../middlewares';
import { UploadController } from '../../../controllers';

const router = Router();
const { validateFile } = ValidationMiddleware;
const { checkIfFileTypeIsAllowed, checkIfFileSizeIsAboveLimit } = UploadMiddleware;
const { authenticate } = AuthMiddleware;
const { uploadFile } = UploadController;

router.post(
  '/',
  authenticate,
  validateFile,
  checkIfFileTypeIsAllowed,
  checkIfFileSizeIsAboveLimit,
  uploadFile

);

export default router;
