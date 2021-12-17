import { helpers, constants } from '../../utils';

const {
  UploadHelper: { upload },
  ResponseHelper: { successResponse, moduleErrorLogger },
  ErrorResolver: { resolveError }
} = helpers;

const {
  FILE_UPLOAD_SUCCESS,
  UPLOAD_FAIL_STATUS
} = constants;

/**
 * controllers that contains Upload methods
 * @class UploadController
 */
class UploadController {
  /**
   * upload files to s3
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param { Function } next - Calls the next handler.
   * @returns { JSON } A JSON response containing the details of the uploaded resource
   * @memberof UploadController
   */
  static async uploadFile(req, res, next) {
    try {
      const { tempFilePath: path, name: fileName, mimetype } = req.files.file;
      const { Location } = await upload(path, fileName, mimetype);
      return successResponse(res, {
        message: FILE_UPLOAD_SUCCESS,
        data: { url: Location }
      });
    } catch (e) {
      moduleErrorLogger(e, UPLOAD_FAIL_STATUS);
      next(resolveError(e));
    }
  }
}

export default UploadController;
