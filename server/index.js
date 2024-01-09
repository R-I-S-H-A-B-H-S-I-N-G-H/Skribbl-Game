const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { log } = require("console");
const PORT = process.env.PORT || 3100;

const server = http.createServer(app);
app.use(cors());
const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

io.on("connection", (socket) => {
	log(`USER CONNECTED WITH ID :: ${socket.id}`);

	socket.on("send_message", (data, room) => {
		if (!room || room == "") {
			socket.broadcast.emit("receieve_message", data);
		} else socket.to(room).emit("receieve_message", data);
	});

	socket.on("join-room", (room) => {
		socket.join(room);
	});
});

server.listen(PORT, () => {
	console.log(`SERVER IS RUNNING ${PORT}`);
});
