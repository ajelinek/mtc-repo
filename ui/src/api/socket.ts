import io, { Socket } from 'socket.io-client'

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  `${window.location.hostname}:2021`
)

export default socket
