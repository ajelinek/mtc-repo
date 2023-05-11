import { Timers } from '../types'

const timers: Timers = {}

export function startTimer(
  meetingId: string,
  seconds: number,
  callback: (seconds: number) => void
) {
  if (timers[meetingId]) return

  timers[meetingId] = setInterval(() => {
    seconds--
    if (seconds === 0) {
      clearInterval(timers[meetingId]!)
      delete timers[meetingId]
    } else {
      callback(seconds)
    }
  }, 1000)
}
