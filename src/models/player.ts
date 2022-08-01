import sequelize from '../database';
import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

class Player extends Model<InferAttributes<Player>, InferCreationAttributes<Player>> {
  declare playerId: number;
  declare username: string;
  declare victories: number | null;
  declare roomId: ForeignKey<number>;
};

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
