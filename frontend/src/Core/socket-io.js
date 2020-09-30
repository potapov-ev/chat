import io from 'socket.io-client';

const socket = io('ws://localhost:8989', {
  query: "uid=" + localStorage.getItem("uid")
});

export default socket;