import { createSignal } from 'solid-js'

import socket from '../api/socket'

socket.on('timerUpdate', (time: number) => {
  console.log('timer', time)
  timerSignal.setTimer(time)
})

export function startTimer(seconds: number = 60 * 5) {
  socket.emit('timerStart', seconds)
}

const [timer, setTimer] = createSignal<number>(-1)

export const timerSignal = {
  value: timer,
  setTimer
}
