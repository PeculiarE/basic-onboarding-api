import ApiError from '../errors/api.error';
import constants from '../constants';

const { DB_CONSTRAINTS, INTERNAL_SERVER_ERROR } = constants;

/**
 *Contains ErrorResolver methods
 * @class ErrorResolver
 */
class ErrorResolver {
  static resolveError(error) {
    let message = INTERNAL_SERVER_ERROR;
    let status = 500;
    if (error.code === '23505') {
      message = DB_CONSTRAINTS[error.constraint];
      status = 409;
    }
    if (error.code === '23503') {
      message = DB_CONSTRAINTS[error.constraint];
      status = 404;
    }
    return new ApiError({ message, status });
  }
}

export default ErrorResolver;
