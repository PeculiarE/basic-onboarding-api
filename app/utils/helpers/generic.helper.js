import { nanoid } from 'nanoid';

/**
 * Contains GenericHelper methods
 * @class GenericHelper
 */
class GenericHelper {
  /**
   * It generates a unique ID.
   * @static
   * @memberof GenericHelper
   * @returns {String} - A unique string.
   */
  static generateId(length) {
    return nanoid(length);
  }

  /**
   * validates an input based on a schema
   * @static
   * @param { Joi } schema - The validation schema.
   * @param { Object } object - The input data to be validated
   * @memberof GenericHelper
   * @returns { boolean }
   */
  static async validate(schema, object) {
    return schema.validateAsync(object);
  }
}

export default GenericHelper;
