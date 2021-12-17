import { UserService } from '../../services';
import { helpers, constants, DBError } from '../../utils';

const { onboardUserData } = UserService;

const {
  RESOURCE_ADD_SUCCESS,
  RESOURCE_ADD_ERROR_STATUS,
} = constants;

const {
  GenericHelper: { generateId },
  ResponseHelper: { successResponse, moduleErrorLogger },
  ErrorResolver: { resolveError },
} = helpers;

/** controllers that contain User methods
 * @class UserController
 */
class UserController {
  /**
   * onboards user
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param { Function } next - Calls the next handler.
   * @returns { JSON } A JSON response with a success message or error.
   * @memberof UserController
   */
  static async onboardUser(req, res, next) {
    try {
      const [, { id, onboardingStatus }] = await onboardUserData({
        ...req.body,
        id: generateId(),
        userId: req.data.id
      });
      successResponse(res, {
        code: 201,
        message: RESOURCE_ADD_SUCCESS('Onboarding data'),
        data: { id, onboardingStatus }
      });
    } catch (e) {
      const error = resolveError({ ...e });
      const dbError = new DBError({
        status: RESOURCE_ADD_ERROR_STATUS('Onboarding_data'),
        message: e.message
      });
      moduleErrorLogger(dbError);
      next(error);
    }
  }
}

export default UserController;
