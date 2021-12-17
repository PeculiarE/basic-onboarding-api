import apiMessages from './api.messages';
import dbConstraints from './db.constraints';
import fileRequirements from './file.requirements';

export default {
  ...apiMessages,
  ...dbConstraints,
  ...fileRequirements
};
