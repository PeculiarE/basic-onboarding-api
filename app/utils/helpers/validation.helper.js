import Joi from 'joi';
import constants from '../constants';

const { FILE_EXTENSIONS } = constants;

/**
 * Contains ValidationHelpers methods
 *
 * @class ValidationHelper
 */
class ValidationHelper {
  /**
   * It validates a required number field.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static numberCheck(param, min = 1, max = 1000000000) {
    return Joi
      .number()
      .required()
      .min(min)
      .max(max)
      .messages({
        'any.required': `${param} is a required field`,
        'number.base': `${param} must be a number`,
        'number.empty': `${param} cannot be an empty field`,
        'number.min': `${param} can not be lesser than ${min}`,
        'number.max': `${param} can not be greater than ${max}`
      });
  }

  /**
   * It validates a required string field.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static stringCheck(param, min = 1, max = 1000000000) {
    return Joi
      .string()
      .required()
      .trim()
      .min(min)
      .max(max)
      .messages({
        'any.required': `${param} is a required field`,
        'string.max': `${param} can not be greater than ${max} characters`,
        'string.min': `${param} can not be lesser than ${min} characters`,
        'string.base': `${param} must be a string`,
        'string.empty': `${param} cannot be an empty field`,
      });
  }

  /**
   * It validates a password field.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static passwordCheck() {
    return Joi.string().trim().required().min(7)
      .messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password field cannot be an empty field',
        'any.required': 'Password field is required',
        'string.min': 'Password can not be lesser than 7 characters'
      });
  }

  /**
   * It validates a required email field
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static emailCheck() {
    return Joi.string().email().required().messages({
      'any.required': 'Email is a required field',
      'string.email': 'Email is not valid',
      'string.empty': 'Email cannot be an empty field'
    });
  }

  /**
   * It checks for valid file extension in url.
   * @static
   * @private
   * @memberof ValidationHelper
   * @returns {string | error} - Returns the url or an error
   */
  static fileExtensionCheck(value, helpers) {
    const extension = value.split('..')[1];
    return FILE_EXTENSIONS.includes(extension)
      ? value
      : helpers.error('any.invalid');
  }

  /**
   * It validates a required file field
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static fileCheck(param) {
    return Joi.string().required()
      .custom(ValidationHelper.fileExtensionCheck, 'file url validation')
      .messages({
        'any.required': `${param} is a required field`,
        'string.empty': `${param} cannot be an empty field`,
        'any.invalid': `${param} must have a valid extension type`
      });
  }
}
export default ValidationHelper;
