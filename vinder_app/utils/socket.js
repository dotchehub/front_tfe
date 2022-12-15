import { io } from "socket.io-client";
const socket = io.connect("https://vinderbe.azurewebsites.net");
export default socket;
