/* eslint-disable no-unused-vars */
import morgan from 'morgan';
import { json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import expressFileUpload from 'express-fileupload';
import config from './env';
import { helpers, genericErrors, constants } from '../app/utils';
import apiV1Routes from '../app/routes/v1';
import db from '../app/db';

const { ResponseHelper: { errorResponse, successResponse } } = helpers;
const { WELCOME, v1, SERVER_RUNNING } = constants;
const { notFoundApi } = genericErrors;

const appConfig = (app) => {
  app.use(morgan('combined', { stream: logger.stream }));
  app.use(helmet());
  app.use(cors());
  app.use(json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    } }));
  app.use(urlencoded({ extended: true }));
  app.use(expressFileUpload({ useTempFiles: true }));
  app.get('/', (req, res) => successResponse(res, { message: WELCOME }));
  app.use(v1, apiV1Routes);
  app.use((req, res, next) => {
    next(notFoundApi);
  });
  app.use((err, req, res, next) => errorResponse(req, res, err));

  const port = config.PORT || 3249;

  db.connect().then(() => {
    logger.info('🚀 DB connected');
    app.listen(port, () => {
      logger.info(`${SERVER_RUNNING} ${port}`);
    });
  }).catch((error) => {
    logger.error(error.message);
    process.exit(1);
  });
};

export default appConfig;
