import Message from "./message";
import Player from "./player";
import Room from "./room";

Room.hasMany(Player, {
  foreignKey: 'roomId',
  onDelete: 'CASCADE'
});

Room.hasMany(Message, {
  foreignKey: 'roomId',
  onDelete: 'CASCADE'
});

export { Message, Player, Room };