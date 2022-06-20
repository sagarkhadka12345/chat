import express, { Request, Response } from "express";
import { config } from "./config/config";
import { userRoutes } from "./Routes/user.routes";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";


const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "*",
  })
);

const PORT = config.server.port as string;

server.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
app.use("/ping", (req: Request, res: Response) => {
  res.send("OK").status(200);
});
app.use("/user", userRoutes);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id}`);


 socket.on("send_message",(data)=>{
   socket.broadcast.emit("receive_message", data)
   
 }) 
});
