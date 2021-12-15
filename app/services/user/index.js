import db from '../../db';
import { userQueries } from '../../db/queries';

const { findUserByEmail } = userQueries;

/**
 * Contains a collection of service methods for managing the User resource.
 * @class UserService
 *
 */
class UserService {
  /**
   * Fetches a User by email
   * @memberof UserService
   * @param emailObj  - an object containing the user's email
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the User resource or a DB Error.
   */
  static async fetchUserByEmail(emailObj) {
    return db.one(findUserByEmail, emailObj);
  }
}

export default UserService;
