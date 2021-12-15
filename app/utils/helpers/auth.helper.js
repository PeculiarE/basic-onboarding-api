import jwt from 'jsonwebtoken';
import { sha256 } from 'js-sha256';
import bcrypt from 'bcrypt';
import config from '../../../config/env';

const { SECRET } = config;

/**
 *Contains AuthHelper methods
 * @class AuthHelper
 */
class AuthHelper {
  /**
     * This generates a hash.
     * @static
     * @param {String} salt - A random string.
     * @param {String} plain - A plain string or some sensitive data to be hashed.
     * @memberof AuthHelper
     * @returns {String} - A hexadecimal string which is the hash value of
     *  the plain text passed as the second positional argument.
     */
  static generateHash(salt, plain) {
    const hash = sha256.hmac.create(salt);
    hash.update(plain);
    return hash.hex();
  }

  /**
   * This is used for generating a hash and a salt from a String.
   * @static
   * @param {string} plainString - String to be encrypted.
   * @memberof AuthHelper
   * @returns {Object} - An object containing the hash and salt of a String.
   */
  static hashString(plainString) {
    const salt = bcrypt.genSaltSync(10);
    return {
      salt,
      hash: AuthHelper.generateHash(salt, plainString)
    };
  }

  /**
   * This checks if a plain text matches a certain hash value by generating
   * a new hash with the salt used to create that hash.
   * @static
   * @param {string} plain - plain text to be used in the comparison.
   * @param {string} hash - hashed value created with the salt.
   * @param {string} salt - original salt value.
   * @memberof AuthHelper
   * @returns {boolean} - returns a true or false, depending on the outcome of the comparison.
   */
  static compareHash(plain, hash, salt) {
    const hashMatch = AuthHelper.generateHash(salt, plain);
    return hash === hashMatch;
  }

  /**
   * This synchronously signs the given payload into a JSON Web Token (JWT) string.
   * @static
   * @param {string | number | Buffer | object} payload - payload to sign
   * @param {string | number} expiresIn - Expressed in seconds or a string describing a
   * time span. Eg: 60, "2 days", "10h", "7d". Default specified is 5 hours.
   * @memberof AuthHelper
   * @returns {string} - JWT Token
   */
  static generateToken(payload, expiresIn) {
    if (expiresIn) {
      return jwt.sign(payload, SECRET, { expiresIn: '5h' });
    }
    return jwt.sign(payload, SECRET);
  }

  /**
   * This verifies the JWT token with the secret with which the token was issued
   * @static
   * @param {string} token - JWT Token
   * @memberof AuthHelper
   * @returns {string | number | Buffer | object } - Decoded JWT payload if
   * token is valid or an error message if otherwise.
   */
  static verifyToken(token) {
    return jwt.verify(token, SECRET);
  }
}

export default AuthHelper;
