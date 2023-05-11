import io from 'socket.io-client';

const socket = io('http://localhost:2021');

export default socket;