interface ServerToClientEvents {
  timerUpdate: (time: number) => void;
}

interface ClientToServerEvents {
  timerStart: (seconds: number) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}
