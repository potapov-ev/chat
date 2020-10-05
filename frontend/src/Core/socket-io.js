import io from 'socket.io-client';
const BASE_URL = "http://localhost:8989";

const socket = io(BASE_URL);

socket.emit("CLIENT:LOG_IN", localStorage.getItem("uid"));

export default socket; 