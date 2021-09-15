import { DataTypes } from 'sequelize';

import PostgreSql from '../services/PostgreSql';
import { RoomModel } from './RoomModel';

export const UserModel = PostgreSql.connection.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

setTimeout(() => {
  UserModel.hasOne(RoomModel, { foreignKey: 'ownerId', as: 'owner' });
  UserModel.belongsTo(RoomModel, { foreignKey: 'roomId', as: 'room' });
}, 100);
