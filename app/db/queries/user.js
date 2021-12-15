export default {
  saveUser: `
    INSERT INTO user_info (
      id, first_name, last_name, email, password, salt
    ) VALUES (
      $/id/, $/firstName/, $/lastName/, $/email/, $/password/, $/salt/
    );
  `,
  findUserByEmail: `
    SELECT id, first_name, password, salt 
    FROM user_info
    WHERE email = LOWER($/email/)
  `
};
