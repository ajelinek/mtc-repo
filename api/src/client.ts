import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouterDefinition } from "./index";

const trpc = createTRPCProxyClient<AppRouterDefinition>({
  links: [
    httpBatchLink({
      url: "http://localhost:2021",
    }),
  ],
});

async function main() {
  const data = await trpc.meetings.createNewMeeting.query();
  console.log(data);
}

void main();
