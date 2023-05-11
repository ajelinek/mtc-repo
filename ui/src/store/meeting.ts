import socket from '../api/socket'

export function joinMeeting(name: string) {
  socket.emit('joinMeeting', name)
}

export function startMeeting() {}
