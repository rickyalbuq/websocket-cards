import sequelize from '../database';
import * as I from "../interfaces";
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

class Room extends Model<InferAttributes<Room>, InferCreationAttributes<Room>> {
  declare roomId: number;
  declare isPrivate: boolean;
  declare maxMatches: number | null;
  declare currentMatch: number | null;
  declare createdAt: Date | null;
};

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
    },
    createdAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Room',
    updatedAt: false
  }
);

export default Room;
