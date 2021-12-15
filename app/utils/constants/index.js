import apiMessage from './api.messages';
import dbConstraints from './db.constraints';

export default {
  ...apiMessage,
  ...dbConstraints
};
