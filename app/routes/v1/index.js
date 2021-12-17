import { Router } from 'express';
import authRoutes from './auth';
import uploadRoutes from './upload';
import userRoutes from './user';

const router = Router();

router.use('/auth', authRoutes);
router.use('/upload', uploadRoutes);
router.use('/user', userRoutes);

export default router;
