import { nanoid } from 'nanoid'
import { generateUsername } from 'unique-username-generator'

export function createParticipant(): Participant {
  return {
    participantId: nanoid(),
    funnyName: generateUsername('-', 0, 15)
  }
}
