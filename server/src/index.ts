require("dotenv").config();

const PORT = process.env.PORT || 3000;
const { Server } = require("socket.io");

const io = new Server(PORT, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: any) => {
  console.log(`User Connected: ${socket.id}`);
});

