import { io } from "./http";
import * as I from "./interfaces";

let rooms: I.Room[] = [];
let players: I.Player[] = [];

io.on("connection", socket => {

  // Player Connect
  socket.on("connect", (data: I.ConnectData) => {
    const isPlayerInRoom = players.find(
      (player: I.Player) => player.username === data.username && player.room === data.room
    );

    if(isPlayerInRoom) {
      socket.emit("connect", () => JSON.stringify(
        {
          "payload": {
            "message": "Username already exists"
          }
        })
      );
    } else {
      players.push({
        playerId: socket.id,
        username: data.username,
        victories: 0,
        room: data.room
      });

      let messages: I.Message[] = [];

      const roomAlreadyExists = rooms.find(
        (item: I.Room) => item.room === data.room
      );

      if(roomAlreadyExists) {
        const index = rooms.indexOf(roomAlreadyExists);
        messages = rooms[index].messages;
      }

      socket.emit("connect", () => JSON.stringify(
        {
          "payload": {
            "playerId": socket.id,
            "username": data.username,
            "victories": 0,
            "room": data.room,
            "messages": messages,
            "message": "Connected successfully"
          }
        })
      );

      socket.join(`${data.room}`);

      socket.broadcast.emit("playerConnected", () => JSON.stringify(
        {
          "payload": {
            "username": data.username,
            "victories": 0
          }
        }
      ));
    }
  });

  //Player Disconnect
  socket.on("disconnection", (data: I.DisconnectionData) => {
    players = players.filter(
      (player: I.Player) => player.playerId !== data.playerId
    );

    socket.broadcast.emit("playerDisconnected", () => JSON.stringify(
      {
        "payload": {
          "username": data.username
        }
      }
    ));

    socket.emit("disconnection", () => JSON.stringify(
      {
        "payload": {
          "message": "Diconnected successfully"
        }
      })
    );
  });

  //Create Room and Connect
  socket.on("createRoom", (data: I.CreateRoomData) => {
    const roomAlreadyExists = rooms.find(
      (item: I.Room) => item.room === data.room
    );

    if (roomAlreadyExists) {
      socket.emit("createRoom", () => JSON.stringify(
        {
          "payload": {
            "message": "Room already exists"
          }
        })
      );
    } else {
      const createdAt = new Date();

      rooms.push({
        room: data.room,
        createdAt: createdAt,
        isPrivate: data.isPrivate,
        maxMatches: data.maxMatches,
        currentMatch: 1,
        messages: [],
      });

      players.push({
        playerId: socket.id,
        username: data.username,
        victories: 0,
        room: data.room
      });
  
      socket.emit("createRoom", () => JSON.stringify(
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

      socket.join(`${data.room}`);
    }
  });

  //Delete Room and Disconnect
  socket.on("deleteRoom", (data: I.DeleteRoomData) => {
    const roomHasPlayers = players.filter(
      (player: I.Player) => player.room === data.room
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
        (room: I.Room) => room.room !== data.room
      );
      players = players.filter(
        (player: I.Player) => player.room !== data.room
      );
    }
  });

  //Send Message
  socket.on("message", (data: I.MessageData) => {
    const message: I.Message = {
      text: data.text,
      username: data.username
    }

    const roomAlreadyExists = rooms.find(
      (item: I.Room) => item.room === data.room
    );

    if(roomAlreadyExists) {
      const i = rooms.indexOf(roomAlreadyExists);
      rooms[i].messages.push(message);

      socket.to(`${data.room}`).emit("message", () => JSON.stringify(
        {
          "payload": {
            "text": data.text,
            "username": data.username
          }
        }
      ));

      socket.emit("message", () => JSON.stringify(
        {
          "payload": {
            "message": "Message sended successfully"
          }
        })
      );
    } else {
      socket.emit("message", () => JSON.stringify(
        {
          "payload": {
            "message": "Room does not exists"
          }
        })
      );
    }
  });

  //
  
});