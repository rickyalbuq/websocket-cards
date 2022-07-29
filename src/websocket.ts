import { io } from "./http";
import * as I from "./interfaces";
import {
  connectPlayers,
  createRoom,
  deleteRoom,
  disconnectPlayer,
  getPublicRooms,
  sendMessage
} from "./handlers";

io.on("connection", socket => {
  // Player Connect
  socket.on("connectPlayer", (data: I.ConnectData) => {
    connectPlayers(data, socket)
  });
  // Player Disconnect
  socket.on("disconnectPlayer", (data: I.DisconnectionData) => {
    disconnectPlayer(data, socket)
  });

  // Create Room and Connect
  socket.on("createRoom", (data: string) => {
    const payload: I.CreateRoomData = JSON.parse(data);
    return createRoom(payload, socket);
  });
  // Get All Public Rooms
  socket.on("getRooms", () => {
    getPublicRooms(socket)
  });
  // Delete Room and Disconnect
  socket.on("deleteRoom", (data: string) => {
    const payload: I.DeleteRoomData = JSON.parse(data);
    return deleteRoom(payload, socket);
  });

  // Send Message
  socket.on("message", (data: string) => {
    const payload: I.MessageData = JSON.parse(data);
    return sendMessage(payload, socket);
  });
});
