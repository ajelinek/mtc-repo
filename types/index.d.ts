interface Participant {
  participantId: string
  funnyName: string
}

interface ParticipantUpdate {
  participants: Participant[]
}

interface ServerToClientEvents {
  meetingTimeUpdate: (time: number) => void
  meetingParticipantsUpdate: () => ParticipantUpdate
}

interface ClientToServerEvents {
  joinMeeting: (name: string, cb: (participant: Participant) => void) => void
}

interface InterServerEvents {
  ping: () => void
}

interface SocketData {
  participant: Participant
  meetingId: string
}
