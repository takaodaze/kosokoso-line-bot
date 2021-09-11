import { handleRequest } from "./handleRequest.ts";

// deno-lint-ignore no-explicit-any
addEventListener("fetch", async (event: any) => {
  await event.respondWith(await handleRequest(event.request));
});
