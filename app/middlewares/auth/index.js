/* eslint-disable max-lines */
import {
  helpers, genericErrors, DBError, constants
} from '../../utils';
import { UserService } from '../../services';

const {
  ResponseHelper: { errorResponse, moduleErrorLogger },
  AuthHelper: { compareHash }
} = helpers;

const { fetchUserByEmail } = UserService;
const {
  RESOURCE_FETCH_ERROR_STATUS
} = constants;

/**
   * A collection of middleware methods used to verify the authenticity
   * of requests through protected routes.
   *
   * @class AuthMiddleware
   */
class AuthMiddleware {
  /**
       * Checks that the user email provided during login exists.
       * @static
       * @param { Object } req - The request from the endpoint.
       * @param { Object } res - The response returned by the method.
       * @param { function } next - Calls the next handle.
       * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
       * @memberof AuthMiddleware
       */
  static async loginEmailValidator(req, res, next) {
    try {
      const { email } = req.body;
      req.user = await fetchUserByEmail({ email });
      next();
    } catch (e) {
      errorResponse(req, res, genericErrors.invalidLogin);
      const dbError = new DBError({
        status: RESOURCE_FETCH_ERROR_STATUS('User'),
        message: e.message
      });
      moduleErrorLogger(dbError);
    }
  }

  /**
   * Compares password from request and the one in the database.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @memberof AuthMiddleware
   * @returns {JSON} - Returns error response if validation fails or null.
   */
  static comparePassword(req, res, next) {
    const { user, body } = req;
    const isAuthenticUser = compareHash(
      body.password,
      user.password,
      user.salt
    );
    if (!isAuthenticUser) {
      return errorResponse(req, res, genericErrors.invalidLogin);
    }
    const { password, salt, ...otherInfo } = user;
    req.user = otherInfo;
    next();
  }
}

export default AuthMiddleware;
