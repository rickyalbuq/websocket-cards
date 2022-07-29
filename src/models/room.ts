import sequelize from '../database';
import { DataTypes, Model } from 'sequelize';

class Room extends Model {};

Room.init(
  {
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    maxMatches: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    currentMatch: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Room',
    updatedAt: false
  }
);

export default Room;
