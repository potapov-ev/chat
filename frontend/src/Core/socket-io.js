import io from 'socket.io-client';

const socket = io('ws://localhost:8989', /* {
  query: 'name=' + userName + '&uid=' + uid
} */);

export default socket;