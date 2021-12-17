export default {
  saveUser: `
    INSERT INTO user_info (
      id, first_name, last_name, email, password, salt
    ) VALUES (
      $/id/, $/firstName/, $/lastName/, $/email/, $/password/, $/salt/
    ) RETURNING id, email, onboarding_status;
  `,
  findUserByEmail: `
    SELECT id, first_name, password, salt, onboarding_status 
    FROM user_info
    WHERE email = LOWER($/email/)
  `,
  updateUserOnboardingStatus: `
    UPDATE user_info
    SET
      onboarding_status = true,
      updated_at = NOW()
    WHERE id = $/userId/
    RETURNING id, onboarding_status;
  `
};
