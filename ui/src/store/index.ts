import { createSignal } from 'solid-js'
import socket from '../api/socket'
import trpc from '../api/trpc'
export * as meeting from './meeting'

socket.on('meetingTimeUpdate', (time) => {
  console.log('timer', time)
  timerSignal.setTimer(time)
})

export function startTimer(meetingId: string, seconds: number = 60 * 5) {
  trpc.meetings.startTimer.mutate({ meetingId, seconds })
}

const [timer, setTimer] = createSignal<number>(-1)

export const timerSignal = {
  value: timer,
  setTimer
}
