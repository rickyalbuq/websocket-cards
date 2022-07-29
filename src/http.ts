import http from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

export { io, serverHttp };
