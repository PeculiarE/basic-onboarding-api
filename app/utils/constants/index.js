import apiMessage from './api.messages';
import dbUnique from './unique.constraints';

export default {
  ...apiMessage,
  ...dbUnique
};
