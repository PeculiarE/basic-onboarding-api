import { helpers, ApiError, constants } from '../../utils';

const {
  UploadHelper: { isFileSizeOverLimit, isFileTypeAllowed },
  ResponseHelper: { errorResponse }
} = helpers;
const {
  FILE_TYPES,
  FILE_LIMIT,
  INVALID_FILE_TYPE,
  LARGE_FILE
} = constants;
/**
 * A collection of middleware methods used to validate uploaded files.
 * @class UploadMiddleware
 */
class UploadMiddleware {
  /**
     * @static
     * @param {request} req - request made through the endpoint
     * @param {response} res - response gotten from the API
     * @param {function} next - The function that calls the next handler
     * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
     * @memberof UploadMiddleware
     */
  static async checkIfFileTypeIsAllowed(req, res, next) {
    const { file } = req.files;
    return isFileTypeAllowed(file, FILE_TYPES)
      ? next() : errorResponse(
        req,
        res,
        new ApiError({ status: 400, message: INVALID_FILE_TYPE })
      );
  }

  /**
   * @static
   * @param {request} req - request made through the endpoint
   * @param {response} res - response gotten from the API
   * @param {function} next - The function that calls the next handler
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof UploadMiddleware
   */
  static async checkIfFileSizeIsAboveLimit(req, res, next) {
    const { file } = req.files;
    return isFileSizeOverLimit(file, FILE_LIMIT)
      ? errorResponse(
        req,
        res,
        new ApiError({ status: 400, message: LARGE_FILE })
      )
      : next();
  }
}

export default UploadMiddleware;
