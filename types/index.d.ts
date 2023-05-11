interface Participant {
  name: string;
  id: string;
}

interface ParticipantUpdate {
  participants: Participant[];
}

interface ServerToClientEvents {
  meetingTimeUpdate: (time: number) => void;
  meetingParticipantsUpdate: () => ParticipantUpdate;
}

interface ClientToServerEvents {
  joinMeeting: (name: string) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}
