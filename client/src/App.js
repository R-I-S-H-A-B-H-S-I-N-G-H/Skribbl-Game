import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Canvas from "./Canvas";
const socket = io.connect("http://localhost:3100");
function App() {
	const msgRef = useRef();
	const [testState, setTestState] = useState();
	useEffect(() => {
		socket.on("receieve_message", (data) => {
			msgRef.current = data;
			setTestState(msgRef.current);
		});
	}, [socket]);

	useEffect(() => {
		// if (canvasRef.current) {
		// 	// console.log(canvasRef.current);
		// 	// const canvas = new Canvas(500, 500, canvasRef.current);
		// 	// canvas.background(0, 0, 0);
		// 	// canvas.stroke(0, 100, 100);
		// 	// canvas.fill(255, 100, 100);
		// 	// canvas.rect(0, 0, 100, 100);
		// }
	}, []);

	const inpRef = useRef();
	const roomRef = useRef();

	function sendMessage(data, room) {
		socket.emit("send_message", data, room);
	}

	function joinRoom(room) {
		console.log("JOIN ROOM");
		socket.emit("join-room", room);
	}

	function onUpdate(e) {
		sendMessage(e, roomRef.current.value);
	}

	return (
		<div>
			<input ref={inpRef} placeholder="Message"></input>
			<button onClick={() => sendMessage(inpRef.current.value, roomRef.current.value)}>SEND MESAGE</button>

			<input ref={roomRef} placeholder="input room"></input>
			<button onClick={() => joinRoom(roomRef.current.value)}>connect to room</button>
			<Canvas backgroundcolor={{ r: 100, g: 200, b: 300 }} strokecolor={{ r: 100, g: 100, b: 100 }} conndata={msgRef.current} onupdate={onUpdate} canvasheight={500} canvaswidth={500} />
		</div>
	);
}

export default App;
