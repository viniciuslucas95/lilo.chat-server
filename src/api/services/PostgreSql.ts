import { Sequelize } from 'sequelize';

// Import doesn't work here because the file is exported with module.exports
// It had to be done like this because of the .sequelizerc
const config = require('../../config/constants/postgresql');

export default class PostgreSql {
  static connection = new Sequelize(config);
}
