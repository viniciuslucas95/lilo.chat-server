import { DataTypes } from 'sequelize';

import PostgreSql from '../services/PostgreSql';

export const TagModel = PostgreSql.connection.define('Tag', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
