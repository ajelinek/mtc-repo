import { nanoid } from "nanoid";

export async function createNewMeeting() {
  return nanoid(5);
}

export async function startMeeting(meetingId: string) {
  console.log("start meeting", meetingId);
}
