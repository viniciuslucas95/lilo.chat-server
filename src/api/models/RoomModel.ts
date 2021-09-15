import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

import PostgreSql from '../services/PostgreSql';
import { UserModel } from './UserModel';

export const RoomModel = PostgreSql.connection.define('Room', {
  password: {
    type: DataTypes.STRING,
    allowNull: true,
    set(value: any) {
      this.setDataValue('password', bcrypt.hashSync(value.toString(), 10));
    },
  },
});

setTimeout(() => {
  RoomModel.belongsTo(UserModel, { foreignKey: 'ownerId', as: 'owner' });
  RoomModel.hasMany(UserModel, { foreignKey: 'roomId', as: 'users' });
}, 100);
