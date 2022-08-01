import * as I from "../interfaces";
import { Socket } from "socket.io";
import { Player, Room } from "../models";

async function createRoom(data: I.CreateRoomData, socket: Socket) {
  const room = await Room.findOne({where: {"roomId": data.roomId}, raw: true});

  if(room) {
    socket.emit("createRoom", JSON.stringify(
      {
        "payload": {
          "message": "Room already exists"
        }
      })
    );
  } else {
    const newRoom = await Room.create({
      roomId: data.roomId,
      isPrivate: data.isPrivate,
      minMatches: data.minMatches
    });

    socket.emit("createRoom", JSON.stringify(
      {
        "payload": {
          "createdAt": newRoom?.createdAt,
          "playerId": socket.id,
          "message": "Room created successfully"
        }
      })
    );

    socket.join(`${data.roomId}`);
  }
}

async function deleteRoom(data: I.DeleteRoomData, socket: Socket) {
  const roomHasPlayers = await Player.findAll({where: {roomId: data.roomId}});

  if(roomHasPlayers.length > 1) {
    socket.emit("deleteRoom", JSON.stringify(
      {
        "payload": {
          "message": "Room is not empty"
        }
      })
    );
  } else {
    Room.destroy({where: {roomId: data.roomId}});

    socket.emit("deleteRoom", JSON.stringify(
      {
        "payload": {
          "message": "Room deleted successfully"
        }
      })
    );
  }
}

async function getRoomById(data: I.GetRoomById, socket: Socket) {
  const room = await Room.findOne({where: {roomId: data.roomId}});

  if(room) {
    socket.emit("getRoomById", 
      JSON.stringify({
        "payload": {
          "roomId": room.roomId,
          "isPrivate": room.isPrivate,
          "minMatches": room.minMatches ||  10,
          "currentMatch": room.currentMatch || 1,
          "createdAt": room.createdAt,
          "playerId": socket.id,
          "message": "Got room successfully"
        }
      })
    );

    socket.join(`${data.roomId}`);
  } else {
    socket.emit("getRoomById", JSON.stringify(
      {
        "payload": {
          "message": "Room not exists"
        }
      })
    );
  }
}

async function getPublicRooms(socket: Socket) {
  let payload: I.GetRoomsData[] = [];
  const rooms = await Room.findAll({where: {isPrivate: false}, raw: true});

  if(rooms.length > 0) {
    rooms.map((room) => {
      Player.findAll({where: {roomId: room.roomId}}).then(
        (players) => {
          payload.push({
            "roomId": room.roomId,
            "isPrivate": room.isPrivate,
            "minMatches": room.minMatches ||  10,
            "currentMatch": room.currentMatch || 1,
            "createdAt": room.createdAt,
            "players": players.length
          });
        }
      )
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        socket.emit("getRooms", 
          JSON.stringify({
            "payload": {
              "rooms": payload,
              "playerId": socket.id,
              "message": "Got rooms successfully"
            }
          })
        )
      });
    });
  } else {
    socket.emit("getRooms", 
      JSON.stringify({
        "payload": {
          "message": "No rooms available"
        }
      })
    );
  }
}

export { createRoom, deleteRoom, getRoomById, getPublicRooms };
