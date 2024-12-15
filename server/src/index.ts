import { JoiningCreds } from "./constants";

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const { Server } = require("socket.io");

const emailToSocketIdMap = new Map();
const socketIdToEmailMap = new Map();

const io = new Server(PORT, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: any) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join-room", (data: JoiningCreds) => {
    // socket.join(roomId);
    // socket.to(roomId).emit("user-connected", userId);

    emailToSocketIdMap.set(data.email, socket.id);
    socketIdToEmailMap.set(socket.id, data.email);

    socket.emit("user-connected", data);
  });
});
