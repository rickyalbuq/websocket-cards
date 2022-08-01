import * as I from "../interfaces";
import { Socket } from "socket.io";
import { Player } from "../models";

async function connectPlayers(data: I.ConnectData, socket: Socket) {
  const isPlayerInRoom = await Player.findOne({
    where: {
      "roomId": data.roomId,
      "username": data.username
    }
  });
  
  if(isPlayerInRoom) {
    socket.emit("connectPlayer", JSON.stringify(
      {
        "payload": {
          "message": "Username already exists"
        }
      })
    );
  } else {
    try {
      const newPlayer = await Player.create({
        "playerId": socket.id,
        "username": data.username,
        "roomId": data.roomId
      });

      if(newPlayer) {
        socket.emit("connectPlayer", JSON.stringify(
          {
            "payload": {
              ...newPlayer,
              "message": "Connected successfully"
            }
          })
        );
    
        socket.join(`${data.roomId}`);
    
        socket.broadcast.emit("playerConnected", JSON.stringify(
          {
            "payload": {
              "username": data.username,
              "victories": 0
            }
          }
        ));
      }
    } catch(err) {
      console.log(err);
    }
  }
};

async function disconnectPlayer(data: I.DisconnectionData, socket: Socket) {
  const player = await Player.destroy({where: {"playerId": data.playerId}});

  if(player) {
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
  } else {
    socket.emit("disconnection", JSON.stringify(
      {
        "payload": {
          "message": "Player not exists"
        }
      })
    );
  }
}

export { connectPlayers, disconnectPlayer };
