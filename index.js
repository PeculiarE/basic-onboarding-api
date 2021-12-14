import express from 'express';
import { appConfig } from './config';
import Logger from './config/logger';

const app = express();
global.logger = Logger.createLogger({ label: 'ONBOARDING_API' });

appConfig(app);

export default app;
