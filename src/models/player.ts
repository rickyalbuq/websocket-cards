import sequelize from '../database';
import { DataTypes, Model } from 'sequelize';

class Player extends Model {};

Player.init(
  {
    playerId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique:true
    },
    username: {
      type: DataTypes.STRING
    },
    victories: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Player',
    timestamps: false
  }
);

export default Player;
