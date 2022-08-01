import { io } from "./http";
import * as I from "./interfaces";
import {
  connectPlayers,
  createRoom,
  deleteRoom,
  disconnectPlayer,
  getPublicRooms,
  getRoomById,
  sendMessage
} from "./handlers";

io.on("connection", (socket) => {
  socket.on("connectPlayer", (data: string) => {
    const payload: I.ConnectData = JSON.parse(data);
    return connectPlayers(payload, socket);
  });
  socket.on("disconnectPlayer", (data: string) => {
    const payload: I.DisconnectionData = JSON.parse(data);
    return disconnectPlayer(payload, socket);
  });

  socket.on("createRoom", (data: string) => {
    const payload: I.CreateRoomData = JSON.parse(data);
    return createRoom(payload, socket);
  });
  socket.on("getRoomById", (data: string) => {
    const payload: I.GetRoomById = JSON.parse(data);
    return getRoomById(payload, socket);
  });
  socket.on("getRooms", () => {
    return getPublicRooms(socket);
  });
  socket.on("deleteRoom", (data: string) => {
    const payload: I.DeleteRoomData = JSON.parse(data);
    return deleteRoom(payload, socket);
  });

  socket.on("message", (data: string) => {
    const payload: I.MessageData = JSON.parse(data);
    return sendMessage(payload, socket);
  });
});
