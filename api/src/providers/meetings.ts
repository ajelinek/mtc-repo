import { nanoid } from 'nanoid'
import { startTimer } from '../server-state/timers'
import { io } from '../server'

export async function removeUserFromMeeting(meetingId: string) {
  //Remove the user from the meeting in the db
  //if no more users are left, update the meeting status to complete
  //return the meeting participants
}

export async function joinMeeting(meetingId: string, participant: Participant) {
  //if the status of the meeting is not started, than update the status
  //Add the user to the meeting in the db
  //return the meeting participants

  return
}

export async function createNewMeeting() {
  //create meeting in mongodb
  return nanoid(5)
}

export async function startMyTimer(meetingId: string, seconds: number) {
  startTimer(meetingId, seconds, (seconds) => {
    io.to(meetingId).emit('meetingTimeUpdate', seconds)
    console.log(seconds)
  })
}
