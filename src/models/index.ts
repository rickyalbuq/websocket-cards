import Message from "./message";
import Player from "./player";
import Room from "./room";

Room.hasMany(Player, {
  foreignKey: 'roomId',
  onDelete: 'CASCADE'
});

Player.hasMany(Message, {
  foreignKey: 'playerId',
  onDelete: 'CASCADE'
});

export { Message, Player, Room };