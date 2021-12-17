/* eslint-disable max-lines */
import {
  helpers, genericErrors, DBError, constants
} from '../../utils';
import { UserService } from '../../services';

const {
  ResponseHelper: { errorResponse, moduleErrorLogger },
  AuthHelper: { compareHash, verifyToken }
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

  /**
   * Checks for token in the authorization and x-access-token header properties.
   * @static
   * @private
   * @param {object} authorization - The headers object
   * @memberof AuthMiddleware
   * @returns {string | null} - Returns the Token or Null
   */
  static checkAuthorizationToken(authorization) {
    let bearerToken = null;
    if (authorization) {
      const token = authorization.split(' ')[1];
      bearerToken = token || authorization;
    }
    return bearerToken;
  }

  /**
   * Aggregates a search for the access token in a number of places.
   * @static
   * @private
   * @param {Request} req - The express request object.
   * @memberof AuthMiddleware
   * @returns {string | null} - Returns the Token or Null
   */
  static checkToken(req) {
    const {
      headers: { authorization }
    } = req;
    const bearerToken = AuthMiddleware.checkAuthorizationToken(authorization);
    return req.body.refreshToken
      ? req.body.refreshToken
      : bearerToken
          || req.headers['x-access-token']
          || req.headers.token || req.body.token;
  }

  /**
     * Verifies the presence and validity of a user's access token.
     * @static
     * @param { Object } req - The request from the endpoint.
     * @param { Object } res - The response returned by the method.
     * @param { function } next - Calls the next handle.
     * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
     * @memberof AuthMiddleware
     */
  static authenticate(req, res, next) {
    const token = AuthMiddleware.checkToken(req);
    if (!token) {
      return errorResponse(req, res, genericErrors.authRequired);
    }
    try {
      const decoded = verifyToken(token);
      req.data = decoded;
      next();
    } catch (err) {
      errorResponse(req, res, genericErrors.authRequired);
    }
  }
}

export default AuthMiddleware;
