import { Socket } from "socket.io";
import * as I from "../interfaces";

let players: I.Player[] = [];

function connectPlayers(
    data: I.ConnectData,
    socket: Socket
  ) {

  const isPlayerInRoom = players.find(
    (player: I.Player) => {
      if (player.room === data.room) {
        if (player.username === data.username) {
          return player;
        }
      }
      return undefined;
    }
  );

  if(isPlayerInRoom) {
    socket.emit("connectPlayer", JSON.stringify(
      {
        "payload": {
          "message": "Username already exists"
        }
      })
    );
  } else {
    players.push({
      "playerId": socket.id,
      "username": data.username,
      "victories": 0,
      "room": data.room
    });

    let messages: I.Message[] = [];

    socket.emit("connectPlayer", JSON.stringify(
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

    socket.broadcast.emit("playerConnected", JSON.stringify(
      {
        "payload": {
          "username": data.username,
          "victories": 0
        }
      }
    ));
  }
};

function disconnectPlayer(data: I.DisconnectionData, socket: Socket) {
  players = players.filter(
    (player) => player.playerId !== data.playerId
  );

  socket.broadcast.emit("playerDisconnected", JSON.stringify(
    {
      "payload": {
        "username": data.username
      }
    }
  ));

  socket.emit("disconnection", JSON.stringify(
    {
      "payload": {
        "message": "Diconnected successfully"
      }
    })
  );
}

export { connectPlayers, disconnectPlayer };
