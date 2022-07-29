import { Socket } from "socket.io";
import * as I from "../interfaces";

let rooms: I.Room[] = [];

function sendMessage(data: I.MessageData, socket: Socket) {
  const roomAlreadyExists = rooms.find(
    (item) => item.room === data.room
  );

  if(roomAlreadyExists) {
    const i = rooms.indexOf(roomAlreadyExists);

    socket.to(`${data.room}`).emit("message", JSON.stringify(
      {
        "payload": {
          "text": data.text,
          "username": data.username
        }
      }
    ));

    socket.emit("message", JSON.stringify(
      {
        "payload": {
          "message": "Message sended successfully"
        }
      })
    );
  } else {
    socket.emit("message", JSON.stringify(
      {
        "payload": {
          "message": "Room does not exists"
        }
      })
    );
  }
}

export { sendMessage };
