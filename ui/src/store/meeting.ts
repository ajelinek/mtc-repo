import socket from '../api/socket'

export function joinMeeting(name: string) {
  socket.emit('joinMeeting', name, (participant: Participant) => {
    console.log('participant', participant)
  })
}

export function startMeeting() {}
