import * as z from "zod";
import { publicProcedure, router } from "../server";
import { createNewMeeting, startMeeting } from "../providers/meetings";

export const meetings = router({
  createNewMeeting: publicProcedure.query(createNewMeeting),
  startMeeting: publicProcedure
    .input(z.object({ meetingId: z.string().nonempty() }))
    .mutation(({ input }) => startMeeting(input.meetingId)),
});
