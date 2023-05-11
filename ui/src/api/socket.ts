import io, { Socket } from 'socket.io-client'

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:2021')

export default socket
