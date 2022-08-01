import sequelize from '../database';
import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
  declare messageId: string;
  declare username: string;
  declare text: string;
  declare roomId: ForeignKey<number>;
};

Message.init(
  {
    messageId: {
      type: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
      unique:true
    },
    username: {
      type: DataTypes.STRING
    },
    text: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Message',
    timestamps: false
  }
);

export default Message;
