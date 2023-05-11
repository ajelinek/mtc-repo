import { joinMeeting } from '../providers/meetings'
import { createParticipant } from '../providers/participants'
import { myServer } from '../types'

export function mountSockets(io: myServer) {
  io.on('connection', (socket) => {
    console.log('A user connected', socket.id)
    socket.data = {
      meetingId: '',
      participant: createParticipant()
    }

    socket.on('joinMeeting', (meetingId, cb) => {
      socket.join(meetingId)
      socket.data.meetingId = meetingId
      joinMeeting(meetingId, socket.data.participant!)
      cb(socket.data.participant!)
      io.to(meetingId).emit('meetingParticipantsUpdate')
    })

    socket.on('disconnect', () => {
      console.log('A user disconnected')
    })
  })
}
