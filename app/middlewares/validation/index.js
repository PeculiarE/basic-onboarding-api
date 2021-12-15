import { helpers, ApiError } from '../../utils';

const {
  ResponseHelper: { errorResponse },
  GenericHelper: { validate }
} = helpers;

/**
 * A collection of middleware methods used to validate requests
 * @class ValidationMiddleware
 */
class ValidationMiddleware {
  /**
   * @param {Object} schema - The validation schema
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof ValidationMiddleware
   */
  static validateRequestInput(schema) {
    return async (req, res, next) => {
      try {
        await validate(schema, req.body);
        next();
      } catch (error) {
        const apiError = new ApiError({
          status: 400,
          message: error.details[0].message
        });
        errorResponse(req, res, apiError);
      }
    };
  }
}

export default ValidationMiddleware;
