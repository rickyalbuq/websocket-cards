import sequelize from '../database';
import { DataTypes, Model } from 'sequelize';

class Message extends Model {};

Message.init(
  {
    messageId: {
      type: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
      unique:true
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
