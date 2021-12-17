import db from '../../db';
import { userQueries, onboardingQueries } from '../../db/queries';

const { findUserByEmail, updateUserOnboardingStatus } = userQueries;

const { saveOnboardingData } = onboardingQueries;

/**
 * Contains a collection of service methods for managing the User resource.
 * @class UserService
 *
 */
class UserService {
  /**
   * Fetches a user by email
   * @memberof UserService
   * @param emailObj  - an object containing the user's email
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the User resource or a DB Error.
   */
  static async fetchUserByEmail(emailObj) {
    return db.one(findUserByEmail, emailObj);
  }

  /**
   * Onboards a user data and updates user onboarding status
   * @memberof UserService
   * @param onboardingObj - an object containing the user's onboarding data
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the User resource or a DB Error.
   */
  static async onboardUserData(onboardingObj) {
    return db.tx(async (t) => {
      const queries = [];
      queries.push(t.none(saveOnboardingData, onboardingObj));
      queries.push(t.one(updateUserOnboardingStatus, onboardingObj));
      return t.batch(queries);
    });
  }
}

export default UserService;
