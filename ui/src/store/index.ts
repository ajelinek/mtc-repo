import { createSignal } from 'solid-js'
import socket from '../api/socket'
export * as meeting from './meeting'

socket.on('meetingTimeUpdate', (time) => {
  console.log('timer', time)
  timerSignal.setTimer(time)
})

export function startTimer(seconds: number = 60 * 5) {
  // socket.emit('timerStart', seconds)
}

const [timer, setTimer] = createSignal<number>(-1)

export const timerSignal = {
  value: timer,
  setTimer
}
