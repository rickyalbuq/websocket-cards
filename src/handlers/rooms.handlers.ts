import { Room } from "../models";
import { Socket } from "socket.io";
import * as I from "../interfaces";

let rooms: I.Room[] = [];
let players: I.Player[] = [];

function createRoom(data: I.CreateRoomData, socket: Socket) {
  //(room) => item.room === data.room

  Room.findOne()
    .then((room) => {
      if(room) {
        socket.emit("createRoom", JSON.stringify(
          {
            "payload": {
              "message": "Room already exists"
            }
          })
        );
      } else {
        const createdAt = String(new Date().getTime());

        const newRoom = {
          room: data.room,
          createdAt: createdAt,
          isPrivate: data.isPrivate,
          maxMatches: data.maxMatches,
          currentMatch: 1
        };

        Room.create(newRoom)
          .then(() => {
            socket.emit("createRoom", JSON.stringify(
              {
                "payload": {
                  "room": data.room,
                  "createdAt": createdAt,
                  "isPrivate": data.isPrivate,
                  "maxMatches": data.maxMatches,
                  "currentMatch": 1,
                  "playerId": socket.id,
                  "nickyname": data.username,
                  "victories": 0,
                  "message": "Room created successfully"
                }
              })
            );
          })
          .catch((err) => console.log(err));
        }
      }
    )
    .finally(() => socket.join(`${data.room}`));
}

function deleteRoom(data: I.DeleteRoomData, socket: Socket) {
  const roomHasPlayers = players.filter(
    (player) => player.room === data.room
  );

  if(roomHasPlayers.length > 1) {
    socket.emit("deleteRoom", () => JSON.stringify(
      {
        "payload": {
          "message": "Room is not empty"
        }
      })
    );
  } else {
    rooms = rooms.filter(
      (room) => room.room !== data.room
    );
    players = players.filter(
      (player) => player.room !== data.room
    );
  }
}

function getPublicRooms(socket: Socket) {
  const bla: I.Room[] = [];

  if(rooms.length > 0) {
    const publicRooms = bla.filter((room) => room.isPrivate === false);
    const payload: I.GetRoomsData[] = [];

    publicRooms.map((room) => {
      const numberOfPlayers = players.filter(
        (player) => player.room === room.room
      );

      payload.push({
        ...room,
        "messages": [],
        "players": numberOfPlayers.length
      });
    });

    socket.emit("getRooms", 
      JSON.stringify({
        "payload": {
          "rooms": payload,
          "playerId": socket.id,
          "message": "Got rooms successfully"
        }
      })
    );
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

export { createRoom, deleteRoom, getPublicRooms };
