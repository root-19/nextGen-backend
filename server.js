const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const MessageRoutes = require("./routes/message")

//tangina node modules yan lagi nlang nasasama 
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {cors: {origin: "https://next-gen-solution.vercel.app",
    methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}});

global.io = io;

app.use(cors());
app.use(express.json());

//use api routes
app.use("/api", MessageRoutes);

//socket.io
io.on("connection", (socket) => {
    console.log("new user connected");
    socket.on("disconnected", () => console.log("user disconnected"));
});

server.listen(5000, () => console.log("server is ruuning on a port 5000"));