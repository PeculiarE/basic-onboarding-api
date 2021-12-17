import { UserModel } from '../../models';
import { helpers, constants, DBError } from '../../utils';

const {
  RESOURCE_CREATE_SUCCESS,
  RESOURCE_CREATE_ERROR_STATUS,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} = constants;
const {
  AuthHelper: { hashString, generateToken },
  ResponseHelper: { successResponse, moduleErrorLogger },
  ErrorResolver: { resolveError },
} = helpers;

/** controllers that contain Authentication methods
 * @class AuthController
 */
class AuthController {
  /**
   * creates new user
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param { Function } next - Calls the next handler.
   * @returns { JSON } A JSON response with a success message or error.
   * @memberof AuthController
   */
  static async createUser(req, res, next) {
    try {
      const { password } = req.body;
      const { salt, hash } = hashString(password);
      const user = new UserModel({ ...req.body, password: hash, salt });
      const { id, email, onboardingStatus } = await user.save();
      successResponse(res, {
        code: 201,
        message: RESOURCE_CREATE_SUCCESS('User'),
        data: { id, email, onboardingStatus }
      });
    } catch (e) {
      const error = resolveError(e);
      const dbError = new DBError({
        status: RESOURCE_CREATE_ERROR_STATUS('User'),
        message: e.message
      });
      moduleErrorLogger(dbError);
      next(error);
    }
  }

  /**
   * logs in user
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param { Function } next - Calls the next handler.
   * @returns { JSON } A JSON response with a success message or error.
   * @memberof AuthController
   */
  static async loginUser(req, res, next) {
    try {
      const { id, firstName } = req.user;
      const token = generateToken({ id, firstName });
      const data = { ...req.user, token };
      successResponse(res, {
        message: LOGIN_SUCCESS,
        data
      });
    } catch (e) {
      const error = resolveError(e);
      const dbError = new DBError({
        status: LOGIN_ERROR,
        message: e.message
      });
      moduleErrorLogger(dbError);
      next(error);
    }
  }
}

export default AuthController;
