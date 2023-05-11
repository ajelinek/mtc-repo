import * as z from 'zod'
import { publicProcedure, router } from '../server'
import { createNewMeeting, startMyTimer } from '../providers/meetings'

export const meetings = router({
  // joinMeeting is a function in the sockets
  createNewMeeting: publicProcedure.query(createNewMeeting),
  startTimer: publicProcedure
    .input(
      z.object({
        meetingId: z.string().nonempty(),
        seconds: z
          .number()
          .gt(0)
          .lte(60 * 60)
      })
    )
    .mutation(({ input }) => startMyTimer(input.meetingId, input.seconds))
})
