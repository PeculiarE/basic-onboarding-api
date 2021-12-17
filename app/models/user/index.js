import db from '../../db';
import { userQueries } from '../../db/queries';
import { helpers } from '../../utils';

const { saveUser } = userQueries;
const { GenericHelper: { generateId } } = helpers;

/**
 * @class UserModel
 */
class UserModel {
  /**
     * This is a constructor for creating an instance of a User.
     * @param { Object } options - contains the required properties for creating
     * the user.
     * @returns { UserModel } - An instance of the user profile.
     * @constructor UserModel
     */
  constructor(options) {
    this.id = generateId();
    this.firstName = options.firstName;
    this.lastName = options.lastName;
    this.email = options.email;
    this.password = options.password;
    this.salt = options.salt;
  }

  /**
     * Persists a new user to the DB.
     * @memberof UserModel
     * @returns { Promise<Object | Error> } A promise that resolves or rejects
     * with an user object or a DB Error.
     */
  async save() {
    return db.one(saveUser, this);
  }
}

export default UserModel;
