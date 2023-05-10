import { nanoid } from "nanoid";
import { publicProcedure, router } from "../server";

async function createNewMeeting() {
  return nanoid(5);
}

export const meetings = router({
  createNewMeeting: publicProcedure.query(createNewMeeting),
});
