/* eslint-disable no-unused-vars */
import promise from 'bluebird';
import pg from 'pg-promise';
import monitor from 'pg-monitor';
import config from '../../../config/env';

const camelizeColumns = (data) => {
  const template = data[0] || {};
  Object.keys(template).forEach((prop) => {
    const camel = pg.utils.camelize(prop);
    if (!(camel in template)) {
      data.forEach((el) => {
        const d = el;
        d[camel] = d[prop];
        delete d[prop];
      });
    }
  });
};

const options = {
  promiseLib: promise,
  receive: (data, result, e) => camelizeColumns(data)
};

monitor.setTheme('dimmed');
monitor.attach(options);

const pgp = pg(options);
const db = pgp(config.DATABASE_URL);

export default db;
