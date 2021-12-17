import ApiError from './api.error';
import constants from '../constants';

const {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_API,
  INVALID_CREDENTIALS,
  AUTH_REQUIRED
} = constants;

export default {
  serverError: new ApiError({ message: INTERNAL_SERVER_ERROR, status: 500 }),
  notFoundApi: new ApiError({ message: NOT_FOUND_API, status: 404 }),
  invalidLogin: new ApiError({ message: INVALID_CREDENTIALS, status: 401 }),
  authRequired: new ApiError({ message: AUTH_REQUIRED, status: 401 })
};
