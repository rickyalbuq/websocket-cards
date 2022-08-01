import * as I from "../interfaces";
import { Socket } from "socket.io";
import { Message } from "../models";

async function sendMessage(data: I.MessageData, socket: Socket) {
  const message = await Message.create({
    "username": data.username,
    "text": data.text,
    "roomId": data.roomId
  });

  if(message) {
    socket.to(`${data.roomId}`).emit("message", JSON.stringify(
      {
        "payload": {
          "text": data.text,
          "username": data.username
        }
      }
    ));
  } else {
    socket.emit("message", JSON.stringify(
      {
        "payload": {
          "message": "Message not sended"
        }
      }
    ));
  }
}

export { sendMessage };
